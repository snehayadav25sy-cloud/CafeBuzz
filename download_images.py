import urllib.request
import os

os.makedirs('assets', exist_ok=True)

# Only the 2 still-failing images — new working photo IDs
images = {
    'matcha.jpg': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop',
    'chai.jpg':   'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=400&auto=format&fit=crop',
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for name, url in images.items():
    filepath = os.path.join('assets', name)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as response:
            with open(filepath, 'wb') as f:
                f.write(response.read())
        print(f"✅ Downloaded: {name}")
    except Exception as e:
        print(f"❌ Failed: {name} → {e}")

print("\nDone!")
