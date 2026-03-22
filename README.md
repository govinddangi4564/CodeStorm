# 🌍 ClimateAct - Gamified Eco Platform

Welcome to **ClimateAct**, a premium, highly interactive full-stack web application dedicated to climate awareness, gamified carbon footprint tracking, and community eco-challenges.

## 🚀 Features
*   **Interactive Gamification**: Earn XP by completing climate challenges and logging your footprints.
*   **Eco-Rewards Marketplace**: Spend your earned XP on simulated climate impact (planting trees, removing plastic).
*   **Real-time Footprint Calculator**: Visually chart your footprint against national averages using interactive sliders.
*   **1.5°C Climate Clock**: A live, ticking countdown alerting users to the scientific threshold for irreversible global warming.
*   **Live Earth Vitals Dashboard**: Hooks into public APIs to pull real-time planetary metrics (Global Temp Anomaly, Arctic Ice extent, atmospheric CO2).
*   **Ethereal Aesthetics**: Built with TailwindCSS and Framer Motion for buttery-smooth micro-interactions and glassmorphism UI.

## 🛠️ Tech Stack
*   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts.
*   **Backend**: Node.js, Express.js.
*   **Database**: MySQL, Sequelize ORM.
*   **Authentication**: JWT, bcrypt.

---

## 💻 How to Run Locally

If you cloned this repository, follow these precise steps to set up the database and run the code on your own machine.

### Prerequisites
1.  **Node.js** (v18+)
2.  **MySQL Server** (You can install MySQL Workbench, XAMPP, or WAMP).

### 1. Database Setup
1.  Open your MySQL command line or GUI (like MySQL Workbench).
2.  Create a completely blank database named exactly `climate_db`:
    ```sql
    CREATE DATABASE climate_db;
    ```
3.  **Note:** You do NOT need to create any tables! The application's ORM (Sequelize) will automatically generate all tables and relationships the first time you run the backend server.

### 2. Backend Setup
1.  Open a terminal and navigate to the backend folder:
    ```bash
    cd backend
    npm install
    ```
2.  Create a `.env` file in the `backend` folder and add the following lines:
    ```env
    PORT=5000
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
    DB_NAME=climate_db
    JWT_SECRET=super_secret_key
    CLIENT_URL=http://localhost:5173
    ```
3.  *CRITICAL:* Replace `YOUR_MYSQL_PASSWORD_HERE` with the password you set when you installed MySQL on your computer. If you have no password, leave it blank (`DB_PASSWORD=`).
4.  Start the backend server:
    ```bash
    npm start
    ```
5.  Wait for the logs: `MySQL Connected via Sequelize` and `Sequelize Models synced`. This confirms your database is fully built!

### 3. Frontend Setup
1.  Open a *second* terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
2.  Open your browser to `http://localhost:5173` and the application will be running perfectly!
