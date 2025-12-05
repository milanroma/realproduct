# Rešavanje problema sa npm u PowerShell-u

## Problem
PowerShell blokira pokretanje npm komandi zbog execution policy.

## Rešenja (probaj redom):

### Rešenje 1: Promeni Execution Policy (Preporučeno)
Otvorite PowerShell **kao Administrator** i pokrenite:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Ovo će dozvoliti lokalne skripte i remote skripte koje su potpisane.

### Rešenje 2: Koristi npx direktno
Umesto `npm run dev`, koristi:

```powershell
npx next dev
```

### Rešenje 3: Koristi Command Prompt (cmd)
Otvorite Command Prompt (cmd) umesto PowerShell-a i pokrenite:

```cmd
npm run dev
```

### Rešenje 4: Bypass za trenutnu sesiju
U PowerShell-u pokrenite:

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
npm run dev
```

Ovo važi samo za trenutnu sesiju.

### Rešenje 5: Koristi Git Bash
Ako imate Git instaliran, koristite Git Bash terminal umesto PowerShell-a.

---

**Preporuka:** Koristi Rešenje 1 (promena execution policy) - trajno rešava problem.

