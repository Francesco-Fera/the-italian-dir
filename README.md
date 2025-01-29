# 🌍 Italian Startup Directory

📢 **Italian Startup Directory** è una piattaforma per scoprire, esplorare e promuovere le startup italiane. Gli utenti possono visualizzare informazioni dettagliate sulle startup, filtrare per categoria e regione, e aggiungere nuove startup in pochi click.

---

## 🚀 Funzionalità principali

- 🔎 **Esplora le startup** → Filtra per categoria, regione e nome.
- 📊 **Dettagli startup** → Visualizza descrizione, tagline, contatti e link ai social.
- 🏗 **Crea una nuova startup** → Inserisci l'URL del sito e ottieni automaticamente screenshot, nome e tagline.
- 🏷 **Categorie e regioni** → Organizzazione delle startup in base alla loro area di mercato e posizione geografica.
- 📸 **Caricamento immagini** → Screenshot automatico della homepage tramite Puppeteer e salvataggio su Supabase.
- 🌐 **Link social e sito web** → Accesso rapido ai profili social e sito ufficiale di ogni startup.

---

## 🛠️ Tecnologie utilizzate

| Tecnologia           | Scopo                                        |
| -------------------- | -------------------------------------------- |
| **Next.js 15**       | Framework React per SSR e ISR                |
| **React**            | Libreria per la UI interattiva               |
| **TypeScript**       | Tipizzazione statica per maggiore sicurezza  |
| **Prisma**           | ORM per la gestione del database             |
| **PostgreSQL**       | Database relazionale                         |
| **Puppeteer**        | Web scraping per screenshot e metadati       |
| **Supabase Storage** | Storage per immagini                         |
| **Lucide Icons**     | Icone leggere e moderne                      |
| **Shadcn/ui**        | Componenti UI accessibili e personalizzabili |
| **Kinde Auth**       | Autenticazione utente                        |

---

## 📦 Installazione e configurazione

### 1️⃣ Clona il repository

```sh
git clone https://github.com/Francesco-Fera/the-italian-dir.git
cd all-italian-startup-dir
```

### 2️⃣ Installa le dipendenze

```sh
npm install
```

> 🔥 **Nota:** Assicurati di avere **Node.js** e **npm** installati.

### 3️⃣ Configura le variabili d'ambiente

Crea un file `.env.local` nella root del progetto e aggiungi le seguenti variabili:

```ini
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_URL=
DATABASE_URL=
DIRECT_URL=
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=https://your-kinde-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/creation
```

> 📌 **Suggerimento:** Se usi Supabase, assicurati di aver creato un **bucket storage** per le immagini.

### 4️⃣ Esegui il progetto in locale

```sh
npm run dev
```

L'applicazione sarà disponibile su **http://localhost:3000** 🚀

---

## 📌 Contributi

💡 **Vuoi contribuire?** Sentiti libero di aprire una PR o segnalare problemi nella sezione Issues.

### 📢 Contatti

📩 **Email:** francescofera157@gmail.com  
🌍 **Sito Web:** [francescofera.com](https://francescofera.com)  
🐦 **Linkedin:** [@francescofera](https://www.linkedin.com/in/francescofera/)

---

## 📜 Licenza

Questo progetto è rilasciato sotto la licenza **MIT**. Vedi il file [LICENSE](LICENSE) per maggiori dettagli.
