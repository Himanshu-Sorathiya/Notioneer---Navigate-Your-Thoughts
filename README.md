# 🧭 Notioneer – *Navigate Your Thoughts*
*A Modern Note-Taking Web App*

## 📌 Overview
Notioneer is a powerful yet minimal note-taking app designed to help users capture, organize, and explore their thoughts efficiently. It supports both plain text and Markdown notes, focusing on clarity, keyboard accessibility, and thoughtful UX. Built with React, TypeScript, Redux Toolkit, RTK Query, and TailwindCSS, Notioneer is designed to be scalable, fast, and distraction-free.

---

## 🎯 Features

### ✅ Completed (Core Engine)
- **⚡ Advanced Drafting System** – Decoupled Editor state (Redux) from Server state (RTK Query). Supports "Dirty State" detection and manual save/revert workflows.
- **🔄 Intelligent Sync** – Atomic "ID Handover" logic that transitions from client-side temporary IDs to permanent Database IDs without UI flickering.
- **📝 High-Performance Editor** – Custom `contentEditable` implementation using React Refs and Reset Keys to maintain cursor position while syncing with global state.
- **🧹 Smart Selection Logic** – Automated layout engine that handles selection transitions during initial boot, note creation, and deletion.

### 🚧 Future Roadmap (Conceptualized)
- **📦 Archive & Favorites** – Logic for moving notes between status states.
- **🏷️ Tag System** – Global tag extraction and sidebar filtering.
- **🔍 Markdown Support** – Real-time preview using Markdown parsers.
- **📊 Utilities** – Word count, character count, and advanced sorting.

---

## ⚙️ Tech Stack
- **Frontend**: React + TypeScript
- **State Management**: Redux Toolkit
- **Data Fetching & Caching**: RTK Query
- **UI & Styling**: TailwindCSS
- **Build Tool**: Vite + SWC

---

## 📂 Project Structure
Below is the folder structure of Notioneer:

```
Notioneer                     // Root directory
├─ public/                    // Static assets
├─ src/                       // Main source code
│  ├─ assets/                 // Images, icons, SVGs
│  ├─ components/             // UI components
│  ├─ hooks/                  // Custom hooks
│  ├─ layouts/                // Layout components
│  ├─ services/               // API calls and backend logic
│  ├─ store/                  // State management
│  ├─ styles/                 // Global styles
│  ├─ types/                  // TypeScript types/interfaces
│  ├─ utilities/              // Helper functions
│  ├─ vite-env.d.ts           // TypeScript environment definitions
│  ├─ main.tsx                // App entry point
│  └─ App.tsx                 // Root component
├─ README.md                  // Project documentation
├─ index.html                 // Main HTML file
├─ .prettierrc                // Prettier configuration
├─ eslint.config.js           // ESLint configuration
├─ tsconfig.json              // TypeScript configuration
├─ tsconfig.app.json          // TypeScript config for the app
├─ tsconfig.node.json         // TypeScript config for Node.js
├─ vite.config.ts             // Vite configuration
├─ package.json               // Project dependencies and scripts
└─ package-lock.json          // Dependency lock file

```

---

## 🛠 Contributing
🚧 *Currently, this project is under development and not open for contributions.*

---

## 📜 License
📄 MIT License – Free to use and modify!

---

## 📬 Contact
💡 *Have questions or suggestions?*
Feel free to reach out at **sorathiyahim7827@gmail.com** or create an issue!
