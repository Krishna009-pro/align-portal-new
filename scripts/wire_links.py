import os
import re

directory = 'src/app'

# We'll map link text to routes.
routes = {
    'Dashboard': '/',
    'My Goals': '/goals',
    'Check-ins': '/check-in',
    'My Progress': '#',
    'Sign Out': '/login',
    'Log Out': '/login',
    'My Team Goals': '/team/review-goals',
    'Check-in Reviews': '/team/review-checkin',
    'My Team': '/team'
}

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find all <a ... href="...">...<span>Text</span>...</a> or similar
            # Since HTML structure varies (sometimes text is in span, sometimes direct), let's use a simpler regex or manual edit.
            # Next.js <Link> requires href. We can just replace `<a ` with `<Link ` and `</a>` with `</Link>` and dynamically update href.

            # Simple heuristic: find `<a ... </a>` block
            def replacer(match):
                block = match.group(0)
                
                # Check what text it contains
                for text, route in routes.items():
                    # Look for the exact text, possibly surrounded by tags or whitespace
                    if re.search(r'>\s*' + re.escape(text) + r'\s*<', block) or \
                       re.search(r'>\s*' + re.escape(text) + r'\s*$', block):
                        
                        # Replace href
                        block = re.sub(r'href="[^"]*"', f'href="{route}"', block)
                        break

                # Replace a with Link
                block = re.sub(r'^<a\b', '<Link', block)
                block = re.sub(r'</a>$', '</Link>', block)
                return block

            new_content = re.sub(r'<a\b.*?</a>', replacer, content, flags=re.DOTALL)

            # Special case for "Create Goal" button in sidebar of step1.tsx: it's a button, let's wrap or change onClick
            if 'Create Goal' in new_content:
                new_content = re.sub(r'<button([^>]+)>([^<]*)<span[^>]*>add</span>([^<]*)<span>Create Goal</span>([^<]*)</button>', r'<Link href="/goals/new"><button\1>\2<span className="material-symbols-outlined" data-icon="add">add</span>\3<span>Create Goal</span>\4</button></Link>', new_content)

            if new_content != content:
                # Add import if Link is used
                if '<Link ' in new_content and 'import Link from "next/link"' not in new_content and 'import Link from \'next/link\'' not in new_content:
                    # insert after last import
                    imports = [m for m in re.finditer(r'^import .*$', new_content, re.MULTILINE)]
                    if imports:
                        last_import = imports[-1]
                        new_content = new_content[:last_import.end()] + '\nimport Link from "next/link";' + new_content[last_import.end():]
                    else:
                        new_content = 'import Link from "next/link";\n' + new_content

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Updated links in {filepath}')
