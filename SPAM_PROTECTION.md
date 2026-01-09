# Spam Protection Setup

## Pregled

Kontakt forma koristi kombinaciju **besplatnih anti-spam mera** koje ne zahtevaju registraciju na bilo kom spoljnom servisu:

1. **Honeypot polje** - skriveno polje koje samo botovi popunjavaju
2. **Rate limiting** - ograničava broj zahteva po IP adresi
3. **Time-based validacija** - proverava da li je korisnik proveo dovoljno vremena na formi

## Kako radi

### 1. Honeypot Polje

- Skriveno polje koje je nevidljivo korisnicima (CSS sakriveno)
- Pravi korisnici ga ne vide i ne popunjavaju
- Botovi automatski popunjavaju sva polja, uključujući honeypot
- Ako je honeypot popunjen, zahtev se tiho odbija (bot ne zna da je uhvaćen)

### 2. Rate Limiting

- Ograničava broj zahteva na **3 po minuti** po IP adresi
- IP adrese se hash-uju za bolju privatnost
- Ako limit bude prekoračen, vraća se greška 429 (Too Many Requests)

### 3. Time-based Validacija

- Praćenje vremena koje korisnik provede na formi
- Minimum: **2 sekunde** (normalni korisnici trebaju vreme da popune formu)
- Maksimum: **30 minuta** (razumna granica)
- Botovi obično šalju zahteve instant, što se detektuje

## Konfiguracija

### Rate Limiting (opciono)

Možeš prilagoditi rate limiting u `src/app/api/contact/route.ts`:

```typescript
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minut (u milisekundama)
const MAX_REQUESTS = 3; // Maksimalan broj zahteva po prozoru
```

Za dodatnu sigurnost, možeš dodati salt u `.env.local`:

```env
RATE_LIMIT_SALT=your-random-salt-here
```

### Time-based Validacija (opciono)

Možeš prilagoditi vremenske granice u `src/app/api/contact/route.ts`:

```typescript
const MIN_TIME = 2000; // Minimum 2 sekunde
const MAX_TIME = 30 * 60 * 1000; // Maksimum 30 minuta
```

## Prednosti

✅ **Potpuno besplatno** - nema troškova  
✅ **Bez registracije** - ne zahteva Google, Cloudflare ili bilo koji drugi servis  
✅ **Privatnost** - sve se dešava na tvom serveru  
✅ **Jednostavno** - lako za održavanje  
✅ **Efektivno** - hvata većinu osnovnih botova  

## Ograničenja

⚠️ **Manje efektivno protiv naprednih botova** - napredni botovi mogu zaobići ove mere  
⚠️ **Rate limiting u memoriji** - za distribuirane sisteme, razmotri Redis  
⚠️ **IP-based rate limiting** - može blokirati korisnike koji dele IP (npr. korporativna mreža)  

## Poboljšanja (opciono)

Ako ti treba jača zaštita, možeš dodati:

1. **Math Challenge** - jednostavno matematičko pitanje (kao u realimpeks projektu)
2. **Redis za rate limiting** - za distribuirane sisteme
3. **Email domain blacklist** - blokiranje poznatih spam domena
4. **Content filtering** - provera sadržaja poruke za spam reči

## Testiranje

1. Otvori kontakt formu
2. Popuni formu normalno (ne popunjavaj "website" polje - nećeš ga ni videti)
3. Pošalji poruku - trebalo bi da radi bez problema

### Testiranje honeypot-a

Ako želiš da testiraš honeypot (samo za testiranje):
1. Otvori browser developer tools
2. Pronađi `<input id="website">` element
3. Promeni `display: none` na `display: block` (privremeno)
4. Popuni to polje i pošalji formu
5. Forma će se "uspešno" poslati, ali email neće biti poslat

## Troubleshooting

### "Too many requests" greška
- Sačekaj 1 minut i probaj ponovo
- Ako se dešava često, povećaj `MAX_REQUESTS` ili `RATE_LIMIT_WINDOW`

### Forma se ne šalje
- Proveri da li si proveo najmanje 2 sekunde na formi pre slanja
- Proveri browser konzolu za greške
- Proveri server logove

### I dalje dobijaš spam
- Razmotri dodavanje math challenge-a (kao u realimpeks projektu)
- Razmotri Cloudflare Turnstile (besplatno, ali zahteva Cloudflare account)
- Razmotri Google reCAPTCHA (besplatno, ali zahteva Google account)

## Alternativna rešenja

Ako ti treba jača zaštita:

1. **Cloudflare Turnstile** - besplatno, privacy-friendly, ali zahteva Cloudflare account
2. **Google reCAPTCHA v3** - besplatno, ali zahteva Google account
3. **hCaptcha** - besplatno, plaća za rešavanje CAPTCHA
4. **Math Challenge** - potpuno besplatno, ali vidljivo korisnicima

## Security Notes

- **NIKADA** ne commit-uj `.env.local` fajl u git
- Rate limiting salt treba biti slučajan i siguran
- Za produkciju, razmotri Redis za rate limiting ako imaš više servera
- Redovno proveravaj server logove za sumnjive aktivnosti

