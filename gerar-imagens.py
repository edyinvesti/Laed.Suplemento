"""
LAED SUPLEMENTOS — Gerador das 15 imagens restantes
"""

import requests
import os
import time
from urllib.parse import quote

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

API_KEY    = os.getenv("POLLINATIONS_API_KEY", "")
OUTPUT_DIR = "public/produtos"
os.makedirs(OUTPUT_DIR, exist_ok=True)

STYLE = (
    "professional supplement product photo, "
    "pure white background, studio lighting, "
    "label reads LAED, bold modern label design, "
    "high quality 4k render, isolated product"
)

# As 15 que ainda faltam
PRODUTOS = [
    ("whey-blend-cookies.png",
     f"whey protein blend tub 1.8kg, dark black container gold accents, cookies and cream flavor, gym supplement, {STYLE}"),
    ("whey-isolado-biopure.png",
     f"whey protein isolate tub 1kg, white and purple container, vanilla flavor, premium gym supplement, {STYLE}"),
    ("whey-hidrolisado.png",
     f"hydrolyzed whey protein tub 1kg, black and gold premium container, chocolate flavor, luxury gym, {STYLE}"),
    ("creatina-hcl-frutas.png",
     f"creatine HCL jar 300g, red and black container, fruit punch flavor, gym supplement, {STYLE}"),
    ("supreme-creatina.png",
     f"creatine jar 300g, gold and black premium container, powder supplement, luxury gym, {STYLE}"),
    ("creatina-alcalina.png",
     f"kre-alkalyn creatine bottle 120 capsules, dark blue and silver container, gym supplement, {STYLE}"),
    ("bcaa-411-recovery.png",
     f"BCAA 4:1:1 amino acids pouch 300g, purple and black container, recovery supplement, {STYLE}"),
    ("vitaflow-multivitaminico.png",
     f"multivitamin bottle 90 capsules, teal and white modern container, health supplement, {STYLE}"),
    ("pinus-pinaster.png",
     f"antioxidant capsule bottle 120 caps, brown and green natural container, health supplement, {STYLE}"),
    ("beleza-mulher.png",
     f"beauty collagen bottle 60 capsules, pink and rose gold feminine container, supplement, {STYLE}"),
    ("vitamina-d3-k2.png",
     f"vitamin D3 K2 bottle 60 capsules, yellow and white clean container, health supplement, {STYLE}"),
    ("l-carnitina-liquida.png",
     f"L-carnitine liquid bottle 480ml, orange and white container, fat burning supplement, {STYLE}"),
    ("pretreino-dark-energy.png",
     f"pre-workout jar 250g, dark black and red extreme container, extreme energy supplement, {STYLE}"),
    ("kit-definicao.png",
     f"supplement kit bundle thermogenic and L-carnitine bottles together, orange and black design, {STYLE}"),
    ("kit-iniciante.png",
     f"supplement starter kit whey protein and multivitamin together, blue and white design, {STYLE}"),
]

def gerar(nome, prompt, tentativa=1):
    caminho = os.path.join(OUTPUT_DIR, nome)
    if os.path.exists(caminho) and os.path.getsize(caminho) > 20000:
        print(f"  ⏭  Já existe: {nome}")
        return True

    url = (
        f"https://gen.pollinations.ai/image/{quote(prompt)}"
        f"?model=flux&width=800&height=800"
        f"&nologo=true&enhance=true&key={API_KEY}"
    )

    try:
        resp = requests.get(url, timeout=120)
        if resp.status_code == 200 and len(resp.content) > 10000:
            with open(caminho, "wb") as f:
                f.write(resp.content)
            print(f"  ✅ {nome} ({len(resp.content)//1024}KB)")
            return True
        elif resp.status_code == 402:
            print(f"  ❌ Saldo acabou! Troca a key no .env e rode novamente.")
            exit(1)
        elif resp.status_code == 429:
            print(f"  ⏳ Rate limit — aguardando 15s...")
            time.sleep(15)
            return False
        else:
            print(f"  ⚠️  Status {resp.status_code} — tentativa {tentativa}/3")
            return False
    except requests.Timeout:
        print(f"  ⏱  Timeout — tentativa {tentativa}/3")
        return False
    except Exception as e:
        print(f"  ❌ {e}")
        return False

def main():
    print("=" * 50)
    print("  LAED SUPLEMENTOS — 15 imagens restantes")
    print(f"  Saída: public/produtos/")
    print("=" * 50)

    sucesso = 0
    falha   = []

    for i, (nome, prompt) in enumerate(PRODUTOS, 1):
        print(f"\n[{i:02d}/{len(PRODUTOS)}] {nome}")
        ok = False
        for t in range(1, 4):
            ok = gerar(nome, prompt, t)
            if ok:
                break
            if t < 3:
                time.sleep(5)
        if ok:
            sucesso += 1
        else:
            falha.append(nome)
        if i < len(PRODUTOS):
            time.sleep(3)

    print("\n" + "=" * 50)
    print(f"  ✅ Geradas: {sucesso}/{len(PRODUTOS)}")
    if falha:
        print(f"  ❌ Falharam: {len(falha)}")
        for f in falha:
            print(f"     - {f}")
        print("  👉 Troca a key no .env e rode novamente.")
    else:
        print("  🎉 Todas as imagens geradas! 25/25 completo!")
    print("=" * 50)

if __name__ == "__main__":
    main()
