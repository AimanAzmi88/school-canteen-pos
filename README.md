# 🍽️ School Canteen POS System

A modern Point of Sale (POS) system designed for school canteens. This application helps canteen staff manage food orders, generate PDF receipts, and automatically send consolidated bills to teachers via WhatsApp.

---

## ✨ Features

### 👨‍🏫 Teacher Management
- Add, edit and delete teachers
- Search teachers
- Store phone numbers for WhatsApp billing

### 🍛 Menu Management
- Food & Drink categories
- CRUD menu items
- Daily menu ready (planned)

### 🛒 Order Management
- Create orders
- Multiple orders per teacher
- Automatic total calculation
- Receipt number generation

### 🧾 Pending Bill
- Group multiple orders into one bill
- Preview bill before sending
- Send consolidated receipt via WhatsApp

### 📄 PDF Receipt
- Professional A4 PDF
- Company branding
- Itemized receipt
- Auto-generated totals

### 📱 WhatsApp Integration
- Send PDF receipts automatically
- Powered by Baileys

### 📜 Order History
- View all orders
- Search by teacher
- Search by date
- View order details

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- Headless UI
- Heroicons

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- PDFKit
- Baileys (WhatsApp API)

---

# 📂 Project Structure

```
school-canteen-pos/

├── frontend/
│
├── backend/
│
└── README.md
```

---

# 🚀 Getting Started

## Clone repository

```bash
git clone https://github.com/AimanAzmi88/school-canteen-pos.git
```

---

## Backend

```bash
cd backend
npm install
```

Create `.env`

```env
DATABASE_URL=

PORT=3000
```

Run server

```bash
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install

npm run dev
```

---

# 📸 Screenshots

Coming Soon

---

# 🗺 Roadmap

- Dashboard
- Bill History
- Daily Menu
- Sales Analytics
- Authentication
- Export Excel
- Export PDF Report

---

# 👨‍💻 Author

**Mohd Nabil Aiman**

GitHub

https://github.com/AimanAzmi88