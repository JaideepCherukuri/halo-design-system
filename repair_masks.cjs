const fs = require('fs');
const path = require('path');

const mask = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQzLjQzLDkyLjkzTDUwLjUwLDEwMC4wMEw0My40MywxMDcuMDdMMzYuMzYsMTAwLjAwWk01Ny41Nyw5Mi45M0w2NC42NCwxMDAuMDBMNTcuNTcsMTA3LjA3TDUwLjUwLDEwMC4wMFpNNzEuNzIsOTIuOTNMNzguNzksMTAwLjAwTDcxLjcyLDEwNy4wN0w2NC42NCwxMDAuMDBaTTg1Ljg2LDkyLjkzTDkyLjkzLDEwMC4wMEw4NS44NiwxMDcuMDdMNzguNzksMTAwLjAwWk0xMDAuMDAsOTIuOTNMMTA3LjA3LDEwMC4wMEwxMDAuMDAsMTA3LjA3TDkyLjkzLDEwMC4wMFpNMTE0LjE0LDkyLjkzTDEyMS4yMSwxMDAuMDBMMTE0LjE0LDEwNy4wN0wxMDcuMDcsMTAwLjAwWk0xMjguMjgsOTIuOTNMMTM1LjM2LDEwMC4wMEwxMjguMjgsMTA3LjA3TDEyMS4yMSwxMDAuMDBaTTE0Mi40Myw5Mi45M0wxNDkuNTAsMTAwLjAwTDE0Mi40MywxMDcuMDdMMTM1LjM2LDEwMC4wMFpNMTU2LjU3LDkyLjkzTDE2My42NCwxMDAuMDBMMTU2LjU3LDEwNy4wN0wxNDkuNTAsMTAwLjAwWk03MS43Miw3OC43OUw3OC43OSw4NS44Nkw3MS43Miw5Mi45M0w2NC42NCw4NS44NlpNODUuODYsNzguNzlMOTIuOTMsODUuODZMODUuODYsOTIuOTNMNzguNzksODUuODZaTTEwMC4wMCw3OC43OUwxMDcuMDcsODUuODZMMTAwLjAwLDkyLjkzTDkyLjkzLDg1Ljg2Wk0xMTQuMTQsNzguNzlMMTIxLjIxLDg1Ljg2TDExNC4xNCw5Mi44OUwxMDcuMDcsODUuODZaTTEyOC4yOCw3OC43OUwxMzUuMzYsODUuODZMMTI4LjI4LDkyLjkzTDEyMS4yMSw4NS44NlpNODUuODYsNjQuNjRMOTIuOTMsNzEuNzJMODUuODYsNzguNzlMNzguNzksNzEuNzJaTTEwMC4wMCw2NC42NEwxMDcuMDcsNzEuNzJMMDAuMDAsNzguNzlMOTIuOTMsNzEuNzJaTTExNC4xNCw2NC42NEwxMjEuMjEsNzEuNzJMMTE0LjE0LDbackOUwxMDcuMDcsNzEuNzJaTTEwMC4wMCw1MC41MEwxMDcuMDcsNTcuNTdMMTAwLjAwLDY0LjY0TDkyLjkzLDU3LjU3Wk0xMDAuMDAsNDMuNDNMMTA3LjA3LDUwLjUwTDEwMC4wMCw1Ny41N0w5Mi45Myw1MC41MFpNNzEuNzIsMTA3LjA3TDc4Ljc5LDExNC4xNEw3MS43MiwxMjEuMjFMNjQuNjQsMTE0LjE0Wk04NS44NiwxMDcuMDdMOTIuOTMsMTE0LjE0TDg1Ljg2LDEyMS4yMUw3OC43OSwxMTQuMTRaTTEwMC4wMCwxMDcuMDdMMTA3LjA3LDExNC4xNEwxMDAuMDAsMTIxLjIxTDkyLjkzLDExNC4xNFpNMTE0LjE0LDEwNy4wN0wxMjEuMjEsMTE0LjE0TDExNC4xNCwxMjEuMjFMxMDcuMDcsMTE0LjE0Wk0xMjguMjgsMTA3LjA3TDEzNS4zNiwxMTQuMTRMMTI4LjI4LDEyMS4yMUwxMjEuMjEsMTE0LjE0Wk04NS44NiwxMjEuMjFMOTIuOTMsMTI4LjI4TDg1Ljg2LDEzNS4zNkw3OC43OSwxMjguMjhaTTEwMC4wMCwxMjEuMjFMMTA3LjA3LDEyOC4yOEwxMDAuMDAsMTM1LjM2TDkyLjkzLDEyOC4yOFpNMTE0LjE0LDEyMS4yMUwxMjEuMjEsMTI4LjI4TDExNC4xNCwxMzUuMzZMMTA3LjA3LDEyOC4yOFpNMTAwLjAwLDEzNS4zNkwxMDcuMDcsMTQyLjQzTDExMC4wMCwxNDkuNTBMOTIuOTMsMTQyLjQzWk0xMDAuMDAsMTQ5LjUwTDEwNy4wNywxNTYuNTdMMTAwLjAwLDE2My42NEw5Mi45MywxNTYuNTdaIiBmaWxsPSJibGFjayIvPjwvc3ZnPg==';

const files = [
    'src/pages/HomePage.tsx',
    'src/components/HaloLogo.tsx',
    'src/hooks/useLiquidMetalScale.ts'
];

files.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) {
        console.log(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // 1. Repair image mask
    content = content.replace(/image="data:image\/svg\+xml;base64,[^"]+"/g, `image="${mask}"`);
    
    // 2. Fix rotation
    content = content.replace(/rotation=\{\d+\}/g, 'rotation={0}');
    
    // 3. Fix scale multipliers
    content = content.replace(/\* 0\.168/g, '* 0.235');
    content = content.replace(/\* 0\.12/g, '* 0.235');
    
    fs.writeFileSync(fullPath, content, 'utf8');
});

console.log('Repair complete');
