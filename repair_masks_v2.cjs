const fs = require('fs');
const path = require('path');

const maskPath = path.join(process.cwd(), 'clean_mask.txt');
let mask = '';

try {
    // Try reading as utf16le first since we suspect it's utf16
    const content = fs.readFileSync(maskPath, 'utf16le');
    if (content.includes('data:image/svg')) {
        mask = content.trim();
        console.log('Read mask as utf16le');
    } else {
        // Fallback to utf8
        mask = fs.readFileSync(maskPath, 'utf8').trim();
        console.log('Read mask as utf8');
    }
} catch (e) {
    console.error('Error reading mask file:', e);
    process.exit(1);
}

// Clean up any potential artifacts from bad reading if it was utf8 but actually utf16
// If it was utf16 read as utf8, it would have null bytes.
if (mask.indexOf('\0') !== -1) {
    console.log('Detected null bytes in mask, attempting to clean...');
    mask = mask.replace(/\0/g, '');
}

console.log('Mask length:', mask.length);
console.log('Mask start:', mask.substring(0, 30));

const files = [
    'src/pages/HomePage.tsx',
    'src/components/HaloLogo.tsx'
];

files.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
        console.log(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // 1. Repair image mask - target the specific image prop used in LiquidMetal
    // We use a regex that captures image="..." where content inside quotes can be anything (including newlines/garbage)
    // We target `image="` followed by non-quotes until `"`
    // But since the messed up file might have weird chars, we will be aggressive.
    // We look for `image="` and then the next quote `"`
    
    // Note: The previous invalid update might have left `image="d a t a ..."`
    // We want to replace `image="<anything>"` with `image="${mask}"`
    // However, we must ensure we don't accidentally match too much if there are other props.
    // LiquidMetal usage:
    // <LiquidMetal ... image="..." ... />
    // We can look for `image="` and match until the next `"`. 
    // Since `"` is the delimiter, `[^"]*` should work unless the corrupted string contains `"` which is unlikely for base64 (even corrupted).
    
    const newContent = content.replace(/image="[^"]*"/g, `image="${mask}"`);
    
    if (content !== newContent) {
        console.log(`Fixed mask in ${file}`);
    } else {
        console.log(`No mask change needed or pattern not found in ${file}`);
    }

    // 2. Fix rotation (ensure 0)
    let finalContent = newContent.replace(/rotation=\{\d+\}/g, 'rotation={0}');
    
    // 3. Ensure scale is 0.235
    finalContent = finalContent.replace(/\* 0\.168/g, '* 0.235');
    finalContent = finalContent.replace(/\* 0\.12/g, '* 0.235');

    fs.writeFileSync(fullPath, finalContent, 'utf8');
});

// Update hook as well
const hookPath = path.join(process.cwd(), 'src/hooks/useLiquidMetalScale.ts');
if (fs.existsSync(hookPath)) {
    let hookContent = fs.readFileSync(hookPath, 'utf8');
    let newHookContent = hookContent;
    newHookContent = newHookContent.replace(/\* 0\.168/g, '* 0.235');
    newHookContent = newHookContent.replace(/\* 0\.12/g, '* 0.235');
    
    if (hookContent !== newHookContent) {
        fs.writeFileSync(hookPath, newHookContent, 'utf8');
        console.log('Fixed hook scaling');
    } else {
         console.log('Hook scaling already correct');
    }
}

console.log('Repair complete');
