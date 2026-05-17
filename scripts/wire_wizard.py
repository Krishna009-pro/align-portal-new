import os
import re

files = [
    'src/app/(employee)/goals/new/step1.tsx',
    'src/app/(employee)/goals/new/step2.tsx',
    'src/app/(employee)/goals/new/step3.tsx'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add import useWizardStore
    if 'useWizardStore' not in content:
        content = content.replace('export default function', 'import { useWizardStore } from \'@/store/wizardStore\';\n\nexport default function')

    # Add hook call
    if 'const { nextStep, prevStep } = useWizardStore()' not in content:
        content = re.sub(r'(export default function[^{]+{\n)', r'\1  const { nextStep, prevStep } = useWizardStore();\n', content)

    # In Step 1, find Next button
    if 'step1' in file:
        content = content.replace('<button className="bg-primary hover:bg-primary-container', '<button onClick={nextStep} className="bg-primary hover:bg-primary-container')
    
    # In Step 2, find Back and Next buttons
    if 'step2' in file:
        content = re.sub(r'<a[^>]*>[\s\n]*Back[\s\n]*</a>', '<button onClick={prevStep} className="text-secondary font-label-md text-label-md hover:text-error transition-colors px-4 py-2">Back</button>', content, flags=re.MULTILINE|re.IGNORECASE)
        content = content.replace('<button className="bg-primary hover:bg-primary-container text-on-primary px-8 py-3 rounded-lg font-label-md text-label-md shadow-md transition-all active:scale-95 flex items-center gap-2">', '<button onClick={nextStep} className="bg-primary hover:bg-primary-container text-on-primary px-8 py-3 rounded-lg font-label-md text-label-md shadow-md transition-all active:scale-95 flex items-center gap-2">')

    # In Step 3, find Back button
    if 'step3' in file:
        content = re.sub(r'<a[^>]*>[\s\n]*Back[\s\n]*</a>', '<button onClick={prevStep} className="text-secondary font-label-md text-label-md hover:text-error transition-colors px-4 py-2">Back</button>', content, flags=re.MULTILINE|re.IGNORECASE)
        # Assuming Submit is just navigating somewhere else or alerting. The user said:
        # "Test: walk through the full employee journey (login -> my goals -> create goal wizard -> check-in)"
        # So Submit -> /check-in or /goals
        content = content.replace('<button className="bg-primary hover:bg-primary-container', '<button onClick={() => window.location.href=\'/check-in\'} className="bg-primary hover:bg-primary-container')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
print('Wizard steps updated')
