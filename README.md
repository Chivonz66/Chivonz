# CHIVONZ — Digital Development Studio

Web development, Minecraft sistemleri, Discord çözümleri ve özel dijital altyapılar
üzerine hazırlanmış, çok sayfalı premium stüdyo sitesi.

Canlı: https://chivonz66.github.io/Chivonz/

## Özellikler

- **Çok sayfalı mimari:** Her hizmet kendi sayfasına sahip (Home, Services, Minecraft,
  Web, Discord, Projects, About, Contact) + proje detay sayfaları + 404
- **Tasarım sistemi:** Koyu premium tema, CSS değişkenli token'lar, elektrik moru +
  elektrik mavisi aksan gradyanı, `clamp()` ile duyarlı tipografi
- **Etkileşim:** Sayfa geçişleri, kayar (glass) nav, tam ekran mobil menü, reveal
  animasyonları (prefers-reduced-motion destekli), buton/imaç etkileri
- **Etkileşimsiz düşüş:** JS kapanıkken tüm içerik normal HTML olarak erişilebilir
  (progressive enhancement)
- **SEO:** Her sayfada title/description/canonical/OG/Twitter meta etiketleri
- **Sıfır bağımlılık:** Framework ya da build katmanı yok — HTML + CSS + saf JavaScript

## Proje Yapısı

```
index.html              → Home
services.html           → Hizmetler (accordion)
minecraft.html          → Minecraft Development (+ CSS-only tab showcase)
web.html                → Web Development
discord.html            → Discord & Automation (+ entegrasyon diyagramı)
projects.html           → Projeler (kategori filtreli)
projects/luminacraft.html   → Proje detayı (Minecraft sistemleri)
projects/chivonz.html       → Proje detayı (bu site)
projects/discord-bots.html  → Proje detayı (Discord bot sistemleri)
about.html              → Hakkında
contact.html            → İletişim kanalları
404.html                → Bulunamadı sayfası

css/global.css          → Token'lar, tipografi, utility'ler
css/components.css      → Butonlar, nav, footer, mockup'lar, diyagramlar
css/pages.css           → Sayfa kompozisyonları
css/responsive.css      → 320–1920px breakpoint'ler

js/main.js              → Nav, mobil menü, sayfa geçişleri, reveal, efektler
js/projects.js          → Proje filtreleri
```

## Yerelde Çalıştırma

```bash
python -m http.server 8080
# → http://localhost:8080
```

veya VS Code → **Live Server** uzantısı.

## GÜVENLİK NOTU (önemli)

Bu site **public** bir GitHub reposundan yayınlanır: https://github.com/chivonz66/Chivonz

- Kodun içine **asla** gerçek şifre, API anahtarı veya gizli bilgi koymayın.
- Discord/e-posta adresleri yayına alınmadığı için iletişim sayfasında **sahte adres
  kullanılmaz**; kanallar hazır olunca `contact.html` üzerinden güncellenir.

## Placeholder İçerik

`projects.html` grid'i artık tamamen gerçek çalışmaları gösterir: CHIVONZ Studio (web),
Luminacraft (Minecraft), Discord Bot Sistemleri (Discord) ve Web Projects.

- `contact.html` üzerindeki Discord ve e-posta kanalları **"Yakında"** olarak işaretlidir;
  kanallar hazır olunca gerçek bilgilerle güncellenir. Uydurma adres kullanılmaz.
- Minecraft mockup'ları gerçek ekran görüntüsü değil, "temsili önizleme"dir.
- Yeni bir çalışma eklemek için: `projects.html` içindeki `#projectsGrid` bölümüne
  `data-cat` değeri verilmiş bir `<article class="project-card">` ekle, ardından
  `projects/<isim>.html` detay sayfasını `projects/luminacraft.html` yapısına göre kopyala.

## GitHub'a Gönderme

```bash
cd "C:\Users\Admin1\Desktop\kişisel website"
git add -A
git commit -m "Multi-page premium studio site"
git push origin main
```

Push sonrası site otomatik yenilenir. Tüm bağlantılar göreli olduğu için `projects/`
alt dizini GitHub Pages üzerinde sorunsuz çalışır.

## Lisans

Kişisel kullanım. İçerik ve tasarım CHIVONZ'a aittir.