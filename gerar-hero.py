"""
Gera imagens de hero para o carousel do LAED Suplementos
"""
import requests, os, time
from urllib.parse import quote
try:
    from dotenv import load_dotenv
    load_dotenv()
except: pass

API_KEY    = os.getenv("POLLINATIONS_API_KEY", "")
OUTPUT_DIR = "public/hero"
os.makedirs(OUTPUT_DIR, exist_ok=True)

IMAGENS = [
    ("hero-arnold.jpg",
     "muscular male bodybuilder athlete posing in professional gym, dramatic lighting, dark background, fitness motivation, cinematic 4k, wide banner format 16:9"),
    ("hero-kit.jpg",
     "supplement products whey protein and creatine jars on dark gym background, dramatic studio lighting, fitness motivation, cinematic 4k, wide banner 16:9"),
    ("hero-gym-1.jpg",
     "modern professional gym interior, heavy weights barbells dumbbells, dramatic dark lighting, fitness motivation, cinematic 4k, wide banner 16:9"),
    ("hero-gym-2.jpg",
     "athlete doing intense barbell squat in dark gym, dramatic lighting, sweat and determination, fitness motivation, cinematic 4k, wide banner 16:9"),
    ("hero-gym-3.jpg",
     "muscular athlete doing deadlift in dark gym, dramatic side lighting, intense focus, fitness motivation, cinematic 4k, wide banner 16:9"),
    ("hero-gym-4.jpg",
     "two athletes training together in dark gym, dramatic lighting, teamwork fitness motivation, cinematic 4k, wide banner 16:9"),
]

def gerar(nome, prompt):
    caminho = os.path.join(OUTPUT_DIR, nome)
    if os.path.exists(caminho) and os.path.getsize(caminho) > 50000:
        print(f"  ⏭  Já existe: {nome}")
        return True
    url = f"https://gen.pollinations.ai/image/{quote(prompt)}?model=flux&width=1280&height=500&nologo=true&enhance=true&key={API_KEY}"
    try:
        resp = requests.get(url, timeout=120)
        if resp.status_code == 200 and len(resp.content) > 10000:
            with open(caminho, "wb") as f:
                f.write(resp.content)
            print(f"  ✅ {nome} ({len(resp.content)//1024}KB)")
            return True
        elif resp.status_code == 402:
            print(f"  ❌ Saldo acabou! Troca a key no .env")
            exit(1)
        else:
            print(f"  ⚠️  Status {resp.status_code}")
            return False
    except Exception as e:
        print(f"  ❌ {e}")
        return False

print("=" * 50)
print("  Gerando imagens Hero Carousel")
print("=" * 50)
for nome, prompt in IMAGENS:
    print(f"\n{nome}")
    ok = False
    for t in range(1, 4):
        ok = gerar(nome, prompt)
        if ok: break
        time.sleep(5)
    time.sleep(3)
print("\n✅ Concluído!")
