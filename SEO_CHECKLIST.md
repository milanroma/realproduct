# SEO Checklist - RealProduct Website

## ✅ Implementirano

### 1. Manifest.json
- ✅ Kreiran `public/manifest.json`
- ✅ PWA konfiguracija sa theme colors
- ✅ Icons konfiguracija (dodaj ikone kada budu spremne)

### 2. Robots.txt
- ✅ Dinamički robots.txt (`src/app/robots.ts`)
- ✅ Statički robots.txt (`public/robots.txt`) kao fallback
- ✅ Disallow za `/api/` rute
- ✅ Sitemap reference

### 3. Sitemap.xml
- ✅ Automatski generisan sitemap (`src/app/sitemap.ts`)
- ✅ Sve stranice uključene sa prioritetima
- ✅ Change frequency i lastModified

### 4. Metadata (SEO)
- ✅ Title i description na svim stranicama
- ✅ Keywords na svim stranicama
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Canonical URLs
- ✅ Robots meta tags
- ✅ Author, Creator, Publisher info

### 5. Structured Data (JSON-LD)
- ✅ Organization schema
- ✅ Service schema
- ✅ ContactPoint schema
- ✅ Email uključen

### 6. Technical SEO
- ✅ Semantic HTML
- ✅ Proper heading hierarchy (h1, h2, h3)
- ✅ Alt text za slike (dodaj kada budu slike)
- ✅ Mobile responsive
- ✅ Fast loading (Next.js optimizacije)

## 📝 Za dodati (kada budu spremni)

### 1. Favicon i Icons
- [ ] Favicon.ico (16x16, 32x32)
- [ ] Apple touch icon (180x180)
- [ ] Icon 192x192 (za manifest)
- [ ] Icon 512x512 (za manifest)

### 2. Open Graph Image
- [ ] og-image.jpg (1200x630px)
- [ ] Optimizovana za social sharing

### 3. Logo
- [ ] logo.png za structured data

### 4. Verification Codes
- [ ] Google Search Console verification
- [ ] Bing Webmaster Tools verification
- [ ] Yandex verification (opciono)

### 5. Social Media Links
- [ ] LinkedIn company page
- [ ] Twitter/X profile
- [ ] Facebook page (opciono)
- [ ] Dodati u StructuredData sameAs

### 6. Analytics
- [ ] Google Analytics 4
- [ ] Google Tag Manager (opciono)

### 7. Performance
- [ ] Image optimization (Next.js Image component)
- [ ] Font optimization (već urađeno)
- [ ] Code splitting (Next.js automatski)

## 🔍 SEO Best Practices Implementirane

1. ✅ Unique titles i descriptions za svaku stranicu
2. ✅ Proper URL structure (/services, /about, /contact)
3. ✅ Internal linking između stranica
4. ✅ Mobile-first responsive design
5. ✅ Fast page load (Next.js optimizacije)
6. ✅ Clean, semantic HTML
7. ✅ Proper heading structure
8. ✅ Meta tags za sve stranice
9. ✅ Structured data za rich snippets
10. ✅ Sitemap za search engines
11. ✅ Robots.txt za crawler kontrolu

## 🚀 Sledeći koraci

1. Dodaj favicon i ikone
2. Kreiraj og-image.jpg (1200x630px)
3. Dodaj logo.png
4. Setup Google Search Console
5. Submit sitemap u Search Console
6. Dodaj social media linkove
7. Setup Google Analytics

## 📊 Monitoring

- Google Search Console - za monitoring performansi
- Google Analytics - za tracking poseta
- PageSpeed Insights - za performance monitoring
- Lighthouse - za SEO audit

