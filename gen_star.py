import math

def get_diamond_path(cx, cy, s):
    half_diag = s * math.sqrt(2) / 2
    p1 = (cx, cy - half_diag)
    p2 = (cx + half_diag, cy)
    p3 = (cx, cy + half_diag)
    p4 = (cx - half_diag, cy)
    return f"M {p1[0]:.2f},{p1[1]:.2f} L {p2[0]:.2f},{p2[1]:.2f} L {p3[0]:.2f},{p3[1]:.2f} L {p4[0]:.2f},{p4[1]:.2f} Z"

s = 10
d = s * math.sqrt(2)
offset = 100 # Center in a larger area to avoid clipping
grid = {
    4: [0],
    3: [0],
    2: [-1, 0, 1],
    1: [-2, -1, 0, 1, 2],
    0: [-4, -3, -2, -1, 0, 1, 2, 3, 4],
    -1: [-2, -1, 0, 1, 2],
    -2: [-1, 0, 1],
    -3: [0],
    -4: [0]
}

paths = []
for y, xs in grid.items():
    for x in xs:
        paths.append(get_diamond_path(offset + x*d, offset - y*d, s))

full_path = " ".join(paths)
svg = f'<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path d="{full_path}" fill="black"/></svg>'
print(svg)
