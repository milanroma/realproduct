# Email Setup - Nodemailer Configuration

## Instalacija

Pokreni sledeću komandu da instaliraš potrebne pakete:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Konfiguracija .env.local

Dodaj sledeće varijable u svoj `.env.local` fajl:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=RealProduct <info@realproduct.dev>

# Contact Email (gde će se slati poruke)
CONTACT_EMAIL=info@realproduct.dev
```

## Primeri za različite email provajdere

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Napomena za Gmail:** 
- Moraš koristiti "App Password" umesto obične lozinke
- Omogući "Less secure app access" ili koristi App Password
- Kako kreirati App Password: https://support.google.com/accounts/answer/185833

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-username
SMTP_PASS=your-mailgun-password
```

### Custom SMTP Server
```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Testiranje

1. Dodaj sve potrebne varijable u `.env.local`
2. Restartuj development server (`npm run dev`)
3. Otvori kontakt formu i pošalji test poruku
4. Proveri da li je email stigao na `CONTACT_EMAIL` adresu

## Troubleshooting

### Error: Invalid login
- Proveri da li su `SMTP_USER` i `SMTP_PASS` tačni
- Za Gmail, koristi App Password umesto obične lozinke

### Error: Connection timeout
- Proveri `SMTP_HOST` i `SMTP_PORT`
- Proveri firewall/postavke mreže

### Error: SSL/TLS wrong version number
- **Port 465**: Koristi `SMTP_PORT=465` i `SMTP_SECURE=true`
- **Port 587**: Koristi `SMTP_PORT=587` i `SMTP_SECURE=false`
- Proveri da li port i secure opcija odgovaraju (465 = secure, 587 = STARTTLS)
- Ako i dalje ne radi, probaj da promeniš port (587 ↔ 465)

### Error: Self-signed certificate
- Ako koristiš lokalni SMTP server, dodaј `SMTP_TLS_REJECT_UNAUTHORIZED=false` u `.env.local` (samo za development!)

## Security Notes

- **NIKADA** ne commit-uj `.env.local` fajl u git
- Koristi App Passwords umesto običnih lozinki kada je moguće
- Za produkciju, koristi environment variables na hosting platformi (Vercel, Netlify, itd.)

