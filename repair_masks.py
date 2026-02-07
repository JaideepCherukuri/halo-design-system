import os
import re

mask = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQzLjQzLDkyLjkzTDUwLjUwLDEwMC4wMEw0My40MywxMDcuMDdMMzYuMzYsMTAwLjAwWk01Ny41Nyw5Mi45M0w2NC42NCwxMDAuMDBMNTcuNTcsMTA3LjA3TDUwLjUwLDEwMC4wMFpNNzEuNzIsOTIuOTNMNzguNzksMTAwLjAwTDcxLjcyLDEwNy4wN0w2NC42NCwxMDAuMDBaTTg1Ljg2LDkyLjkzTDkyLjkzLDEwMC4wMEw4NS44NiwxMDcuMDdMNzguNzksMTAwLjAwWk0xMDAuMDAsOTIuOTNMMTA3LjA3LDEwMC4wMEwxMDAuMDAsMTA3LjA3TDkyLjkzLDEwMC4wMFpNMTE0LjE0LDkyLjkzTDEyMS4yMSwxMDAuMDBMMTE0LjE0LDEwNy4wN0wxMDcuMDcsMTAwLjAwWk0xMjguMjgsOTIuOTNMMTM1LjM2LDEwMC4wMEwxMjguMjgsMTA3LjA3TDEyMS4yMSwxMDAuMDBaTTE0Mi40Myw5Mi45M0wxNDkuNTAsMTAwLjAwTDE0Mi40MywxMDcuMDdMMTM1LjM2LDEwMC4wMFpNMTU2LjU3LDkyLjkzTDE2My42NCwxMDAuMDBMMTU2LjU3LDEwNy4wN0wxNDkuNTAsMTAwLjAwWk03MS43Miw3OC43OUw3OC43OSw4NS44Nkw3MS43Miw5Mi45M0w2NC42NCw4NS44NlpNODUuODYsNzguNzlMOTIuOTMsODUuODZMODUuODYsOTIuOTNMNzguNzksODUuODZaTTEwMC4wMCw3OC43OUwxMDcuMDcsODUuODZMMTAwLjAwLDkyLjkzTDkyLjkzLDg1Ljg2Wk0xMTQuMTQsNzguNzlMMTIxLjIxLDg1Ljg2TDExNC4xNCw5Mi44OUwxMDcuMDcsODUuODZaTTEyOC4yOCw3OC43OUwxMzUuMzYsODUuODZMMTI4LjI4LDkyLjkzTDEyMS4yMSw4NS44NlpNODUuODYsNjQuNjRMOTIuOTMsNzEuNzJMODUuODYsNzguNzlMNzguNzksNzEuNzJaTTEwMC4wMCw2NC42NEwxMDcuMDcsNzEuNzJMMTAwLjAwLDbackTDkyLjkzLDcxLjcyWk0xMTQuMTQsNjQuNjRMMTIxLjIxLDcxLjcyTDExNC4xNCw3OC43OUwxMDcuMDcsNzEuNzJaTTEwMC4wMCw1MC41MEwxMDcuMDcsNTcuNTdMMTAwLjAwLDY0LjY0TDkyLjkzLDU3LjU3Wk0xMDAuMDAsNDMuNDNMMTA3LjA3LDUwLjUwTDEwMC4wMCw1Ny41N1w5Mi45Myw1MC41MFpNNzEuNzIsMTA3LjA3TDc4Ljc5LDExNC4xNEw3MS43MiwxMjEuMjFMNjQuNjQsMTE0LjE0Wk04NS44NiwxMDcuMDdMOTIuOTMsMTE0LjE0TDg1Ljg2LDEyMS4yMUw3OC43OSwxMTQuMTRaTTEwMC4wMCwxMDcuMDdMMTA3LjA3LDExNC4xNEwxMDAuMDAsMTIxLjIxTDkyLjkzLDExNC4xNFpNMTE0LjE0LDEwNy4wN0wxMjEuMjEsMTE0LjE0TDExNC4xNCwxMjEuMjFMxMDcuMDcsMTE0LjE0Wk0xMjguMjgsMTA3LjA3TDEzNS4zNiwxMTQuMTRMMTI4LjI4LDEyMS4yMUwxMjEuMjEsMTE0LjE0Wk08ODUuODYsMTIxLjIxTDkyLjkzLDEyOC4yOEw4NS44NiwxMzUuMzNMNzguNzksMTI4LjI4Wk0xMDAuMDAsMTIxLjIxTDEwNy4wNywxMjguMjhMMTAwLjAwLDEzNS4zNkw5Mi45MywxMjguMjhaTTExNC4xNCwxMjEuMjFMMTIxLjIxLDEyOC4yOEwxMTQuMTQsMTM1LjM2TDEwNy4wNywxMjguMjhaTTEwMC4wMCwxMzUuMzZMMTA3LjA3LDE0Mi40M0wxMTAtMDAsMTQ5LjUwTDkyLjkzLDE0Mi40M1pNMTAwLjAwLDE0OS41MEwxMDcuMDcsMTU2LjU3TDEwMC4wMCwxNjMuNjRMOTIuOTMsMTU2LjU3WiIgZmlsbD0iYmxhY2siLz48L3N2Zz4='

files = [
    'src/pages/HomePage.tsx',
    'src/components/HaloLogo.tsx'
]

for file_path in files:
    if not os.path.exists(file_path):
        print(f'File not found: {file_path}')
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Fix the image mask
    new_content = re.sub(r'image="data:image/svg\+xml;base64,[^"]+"', f'image="{mask}"', content)
    
    # 2. Ensure rotation is 0
    new_content = re.sub(r'rotation=\{\d+\}', 'rotation={0}', new_content)
    
    # 3. Ensure the scaling factor is 0.235 (in HomePage.tsx and hook)
    new_content = re.sub(r'\* 0\.168', '* 0.235', new_content)
    new_content = re.sub(r'\* 0\.12', '* 0.235', new_content)
    
    with open(file_path, 'w', encoding='utf-8', newline='') as f:
        f.write(new_content)

# Also update the hook
hook_path = 'src/hooks/useLiquidMetalScale.ts'
if os.path.exists(hook_path):
    with open(hook_path, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = re.sub(r'\* 0\.168', '* 0.235', content)
    new_content = re.sub(r'\* 0\.12', '* 0.235', new_content)
    with open(hook_path, 'w', encoding='utf-8', newline='') as f:
        f.write(new_content)

print("Done")
