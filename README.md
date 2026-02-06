# 🏢 Apartment Predictor Engine (Full-Stack)

**Author:** Alex Picanyol  
**Version:** 2.0.0  
**Status:** Completed / Academic Project

## 📝 Overview

This is a comprehensive Full-Stack web application designed for real estate management and property price analysis. The system allows users to manage a complex database of apartments with 13 different technical attributes, providing a professional dashboard for CRUD operations, advanced filtering, and automated data testing.

## 🚀 Key Features

* **Full CRUD Management:** Create, Read, Update, and Delete apartments with real-time UI synchronization.
* **Advanced Multi-Criteria Filtering:** Segment properties by bedrooms, bathrooms, parking slots, and amenities (AC, Heating).
* **H2 Database Population:** Built-in tool to generate mock data for testing and UI demonstration.
* **Responsive Dashboard:** A component-based interface built with Material UI (MUI).
* **Dynamic Visuals:** Automatic image generation for property cards based on unique IDs.

---

## 🛠️ Technical Stack

### **Frontend**

* **React 18 (Vite):** Core framework for a fast, reactive UI.
* **Material UI (MUI):** Professional component library for layout and styling.
* **Fetch API:** Native browser interface for RESTful communication (chosen over Axios for zero-dependency native integration).
* **State Management:** React Hooks (`useState`, `useEffect`) for localized and lifted state.

### **Backend (Not included in this repo)**

* **Java Spring Boot:** REST API provider.
* **Spring Data JPA:** For database abstraction.
* **H2 Database:** In-memory relational database.

---

## 📈 Development Roadmap & Versioning

Based on the project's Git history, the development followed these major milestones:

1. **Phase 1: Foundation (v1.0.0 - v1.2.0)**
   * Project Init and basic state management.
   * Integration of Material UI and custom theme implementation.

2. **Phase 2: Feature Expansion (v1.3.0 - v1.5.0)**
   * Implementation of Update/Edit functionality.
   * **Architecture Refactor:** Decoupled the monolithic `App.jsx` into modular components (`ApartmentForm`, `ApartmentList`, etc.).

3. **Phase 3: Logic & Polish (v1.6.0 - v2.0.0)**
   * Added automated DB Population.
   * Developed the Advanced Filtering Panel.
   * Enhanced UI with dynamic images and real-time property counters.

---

## 📂 Component Structure

```text
src/
 ├── components/
 │    ├── ApartmentForm.jsx   # Data entry & Validation
 │    ├── ApartmentList.jsx   # Grid orchestration
 │    ├── ApartmentCard.jsx   # Visual data & Image rendering
 │    └── FilterPanel.jsx     # Multi-criteria filtering logic
 ├── App.jsx                  # Main orchestrator & API logic
 └── main.jsx                 # Entry point
```

---

## 📡 Data Fetching Strategy

This project utilizes the native **Fetch API** for all network operations.

* **Headers:** All requests include `Content-Type: application/json` to ensure compatibility with the Spring Boot `@RequestBody`.
* **Async/Await Logic:** Implemented using `.then()` promise chains for clean state updates following successful API responses.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/AlexPicanyol/frontend-predictor.git
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Note:** Ensure your Spring Boot backend is running on `http://127.0.0.1:8080` for the API calls to work correctly.

---

## 📜 License

This project was developed by **Alex Picanyol** as part of a technical academic exercise in 2026.

