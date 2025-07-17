#  Online Sweet Shop Management System

##  Objective

This project is a **Sweet Shop Management System** built with a strong emphasis on **Test-Driven Development (TDD)**. It provides a RESTful API to manage sweet inventory efficiently via:

*  Adding new sweets  
*  Viewing all sweets  
*  Searching and sorting  
*  Purchasing and restocking  
*  Deleting sweets  

> ⚙️ Designed using **SOLID principles** and a **modular architecture**, ensuring testability, scalability, and maintainability.

---

##  Tech Stack

| Layer    | Technology Used                      |
| -------- | ------------------------------------ |
| Backend  | **Node.js**, **Express.js**          |
| Database | **MongoDB Atlas** (with **Mongoose**) |
| Testing  | **Jest**, **Supertest**              |
| Language | **JavaScript (ES6)**                 |

> All required dependencies (including Babel and Jest) are listed in `package.json` and will be installed via `npm install`.

---

##  Test-Driven Development (TDD)

TDD is at the **core of this project**. Tests were written first, guiding the implementation across all core features.

###  Testing Tools

* **Jest**: For unit and integration testing  
* **Supertest**: For testing HTTP routes

###  TDD-Friendly Structure

* **Controllers**: Handle HTTP logic only  
* **Services**: Core business logic separated for testability  
* **Models**: Mongoose schemas with built-in validation  
* **Tests**: Comprehensive tests for all routes and services  

###  Test Coverage

**7 test suites covering 32 test cases**, including:

* Sweet creation, deletion, and retrieval  
* Searching and sorting  
* Purchasing and restocking  
* Validation and error handling  

📄 **[View Full Test Report](https://drive.google.com/your-link)**

Test Summary:

>  **32 tests passed**  
>  **7 test suites, 0 failures**  
>  Edge cases and error handling included

 

---

##  Folder Structure

```
sweet-shop-management/
│
├── backend/
│   ├── controllers/      # Handles API logic
│   ├── services/         # Business logic (SOLID)
│   ├── routes/           # Express routes
│   ├── models/           # Mongoose schemas
│   ├── tests/            # Jest & Supertest cases
│   ├── app.js            # Express app config
│   ├── server.js         # DB connection and app listener
│   └── .env              # Environment variables
│
├── frontend/             # UserInterface (HTML/CSS/JS)
│   ├── index.html        # Entry point UI
│   ├── customer.html     # Customer view
│   ├── owner.html        # Owner dashboard
│   ├── scripts/          # JS logic
│   └── styles/           # CSS files
│
├── README.md
```

---


##  Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pankaj72823/online-sweet-shop.git
cd online-sweet-shop
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Environment Variables

Create a `.env` file inside `/backend` with the following:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection
```

### 4. Run the Server

```bash
npm start
```

---

##  Running the Tests

```bash
npm test
```

Runs all test suites and outputs results for 30+ scenarios.

---

##  API Documentation

**Base URL**: `http://localhost:3000/api/sweets`

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | `/`                   | View all sweets              |
| POST   | `/`                   | Add a new sweet              |
| DELETE | `/:id`                | Delete a sweet by ID         |
| GET    | `/search?query=name`  | Search sweets                |
| GET    | `/sort?by=name,price` | Sort sweets by field         |
| POST   | `/:id/purchase`       | Purchase a sweet by ID       |
| POST   | `/:id/restock`        | Restock a sweet by ID        |

---

##  Frontend Demo 

A basic web UI is included:

| Panel    | Features                               |
|----------|----------------------------------------|
| Customer | View, search, and purchase sweets      |
| Owner    | Add, delete, restock, and manage items |

 **[Watch Frontend Demo Video](https://drive.google.com/file/d/1mnp1ol4G0mMOBMf5wLfmLL4U-Yv4R8pw/view?usp=sharing)**

---
