<div align="center">
<img src='./screenshots/logo.png' alt="Shortly Logo"/>
</div>

# Shortly: A URL Shortening Service 🚀🔗

<img src="https://img.shields.io/badge/Maintained-Yes-%23eb568e?style=for-the-badge" alt="Maintained" />
<img src="https://img.shields.io/badge/Version-1.0-%23144ee3?style=for-the-badge" alt="Version" />

<img src="https://img.shields.io/badge/Tests-Passing-%2300d1b2?style=for-the-badge" alt="Tests" />
<img src="https://img.shields.io/badge/Vue.js-%2335495e?style=for-the-badge&logo=vue.js&logoColor=%234FC08D" alt="Vue.js" />

<img src="https://img.shields.io/badge/Vite-%230646D1?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
<img src="https://img.shields.io/badge/Express.js-%23000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/PostgreSQL-%23316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/Drizzle ORM-%230D1117?style=for-the-badge&logo=drizzle" alt="Drizzle ORM" />
<img src="https://img.shields.io/badge/TypeScript-%23007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />

<img src="https://img.shields.io/badge/Bun.js-%23F5A623?style=for-the-badge&logo=bun&logoColor=white" alt="Bun.js" />

Shortly is an efficient and easy-to-use URL shortening service that streamlines your online experience. ✂️

✨ Leverage our amazing features to shorten your URLs, track their performance, and manage them with ease.

---

## Features 🎯

- **Shorten URLs**: Quickly shorten URLs with a single click.
- **Customize Links**: Personalize your shortened URLs to make them more memorable.
- **Track Performance**: Monitor the performance of your shortened URLs with detailed analytics.
- **QR Codes**: Generate QR codes for your shortened URLs for easy sharing.

---

## Tech Stack 🛠️

### **Frontend**:
- 🌟 Vue.js
- 🎨 CSS
- 📦 Pinia
- ⚡ Vite
- 🛡️ TypeScript
- 🌐 Vue Router

### **Backend**:
- 🗄️ PostgreSQL
- ⚡ Bun.js
- 🛡️ TypeScript
- 🔌 Express.js
- 🛠️ Drizzle ORM
- 🔐 Custom Session Management

---

## Screenshots 📸

<div align="center">
<img src='./screenshots/home.png' alt="Home Page" width="500"/>
<img src='./screenshots/dash.png' alt="Dashboard Page" width="500"/>
<img src='./screenshots/details.png' alt="Shorten Page" width="500"/>
<img src='./screenshots/history.png' alt="History Page" width="500"/>
</div>

---

## Installation for Frontend 🖥️

1. Clone the repository:
   ```bash
   git clone
   ```
2. Install dependencies:
   ```bash
   cd shortly/shortly-client
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` in your browser 🌐.

---

## Installation for Backend 🛠️

1. Clone the repository:
   ```bash
   git clone
   ```
2. Install dependencies:
   ```bash
   cd shortly/server
   bun install
   ```
3. Add your database URL to the `.env` file:
   ```bash
   DATABASE_URL=postgres://username:password@localhost:5432/shortly
   ```
4. Start the development server:
   ```bash
   bun run dev
   ```
5. Visit `http://localhost:7071` in your browser 🌐.

**Note**: Ensure PostgreSQL is installed on your machine.

**Note**: The backend is proxied by the frontend to `/api`, so ensure the backend runs on port `7071` or update the proxy settings in `shortly-client/vite.config.ts`.

---

## Contributing 🙌

Please leave a ⭐ if you like the project! Contributions, bug reports, and pull requests are highly appreciated. 💡

---

## License 📄

This project is licensed under the [MIT License](LICENSE).
