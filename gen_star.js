const s = 10;
const d = s * Math.sqrt(2);
const offset = 100;

function getDiamondPath(cx, cy, s) {
    const halfDiag = s * Math.sqrt(2) / 2;
    const p1 = [cx, cy - halfDiag];
    const p2 = [cx + halfDiag, cy];
    const p3 = [cx, cy + halfDiag];
    const p4 = [cx - halfDiag, cy];
    return `M ${p1[0].toFixed(2)},${p1[1].toFixed(2)} L ${p2[0].toFixed(2)},${p2[1].toFixed(2)} L ${p3[0].toFixed(2)},${p3[1].toFixed(2)} L ${p4[0].toFixed(2)},${p4[1].toFixed(2)} Z`;
}

const grid = {
    4: [0],
    3: [0],
    2: [-1, 0, 1],
    1: [-2, -1, 0, 1, 2],
    0: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    "-1": [-2, -1, 0, 1, 2],
    "-2": [-1, 0, 1],
    "-3": [0],
    "-4": [0]
};

const paths = [];
for (const [y, xs] of Object.entries(grid)) {
    xs.forEach(x => {
        paths.push(getDiamondPath(offset + x * d, offset - parseInt(y) * d, s));
    });
}

const fullPath = paths.join(" ");
const svg = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="${fullPath}" fill="black"/></svg>`;
console.log(svg);
