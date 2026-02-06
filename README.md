# 🏢 Apartment Predictor Engine (Full-Stack)

**Author:** Alex Picanyol  
**Version:** 2.0.0  
**Status:** Completed / Academic Project  
**Date:** February 6, 2026

---

## 📝 Table of Contents

1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Technical Stack](#-technical-stack)
4. [Architecture](#-architecture)
5. [Development History](#-development-history)
6. [Installation & Setup](#-installation--setup)
7. [Backend Architecture](#-backend-architecture)
8. [Technical Challenges](#-technical-challenges)
9. [License](#-license)

---

## 📝 Overview

This is a comprehensive Full-Stack web application designed for real estate management and property price analysis. The system allows users to manage a complex database of apartments with 13 different technical attributes, providing a professional dashboard for CRUD operations, advanced filtering, and automated data testing.

---

## 🚀 Key Features

* **Full CRUD Management:** Create, Read, Update, and Delete apartments with real-time UI synchronization
* **Advanced Multi-Criteria Filtering:** Segment properties by bedrooms, bathrooms, parking slots, and amenities (AC, Heating)
* **H2 Database Population:** Built-in tool to generate mock data for testing and UI demonstration
* **Responsive Dashboard:** Component-based interface built with Material UI (MUI)
* **Dynamic Visuals:** Automatic image generation for property cards based on unique IDs

---

## 🛠️ Technical Stack

### **Frontend**

* **React 18 (Vite):** Core framework for a fast, reactive UI
* **Material UI (MUI):** Professional component library for layout and styling
* **Fetch API:** Native browser interface for RESTful communication (chosen over Axios for zero-dependency native integration)
* **State Management:** React Hooks (`useState`, `useEffect`) for localized and lifted state

### **Backend**

* **Java Spring Boot 3:** REST API provider
* **Spring Data JPA:** For database abstraction
* **H2 Database:** In-memory relational database
* **UUID Generation:** Manual UUID implementation for unique identifiers

---

## 📂 Architecture

### Component Structure

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

### Data Model

The system manages apartments with **13 technical attributes**:
- Area, Price, Bedrooms, Bathrooms, Stories
- Parking Slots, Furnishing Status
- Boolean Features: Main Road, Guest Room, Basement, Hot Water Heating, Air Conditioning, Preferred Area

---

## 📈 Development History

### **Phase 1: Foundation & Styling** (Feb 4 - Feb 5 early)

| Version | Description |
|---------|-------------|
| v1.0.0 | Project initialization and repository setup |
| v1.1.0 | Refactored main component with basic apartment state management |
| v1.2.0 | **UI Overhaul** - Integration of Material UI (MUI) with themed components |

### **Phase 2: Feature Expansion & Refactoring** (Feb 5)

| Version | Description |
|---------|-------------|
| v1.3.0 | Implementation of full CRUD capabilities with Edit functionality |
| v1.4.0 | **Data Integrity** - Updated schema to match Java Backend entity (13 attributes) |
| v1.5.0 | **Architecture Refactor** - Decoupled monolithic structure into modular components |

### **Phase 3: Advanced Logic & Final Polish** (Feb 6)

| Version | Description |
|---------|-------------|
| v1.6.0 | Added Database Population feature for mass generation of mock properties |
| v1.7.0 | **Advanced Filtering** - FilterPanel with multi-criteria logic |
| v1.8.0 | **Enhanced UX** - Expanded filters + real-time property counter |
| v2.0.0 | **Visual Final** - Dynamic image rendering, ID formatting, MUI Chip labels |

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Java 17+
- Maven

### Frontend Setup

1. **Clone the repository:**
```bash
git clone https://github.com/AlexPicanyol/frontend-predictor.git
cd frontend-predictor
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Backend Setup

Ensure the Spring Boot backend is running on `http://localhost:8080`

---

## 🧩 Backend Architecture

### 7.1 Domain Model and Persistence

The core **Apartment** entity implements:
- **Manual UUID Generation** within the constructor
- **JPA/Hibernate** automated mapping of 13 property attributes
- **EAGER Relationships** for immediate loading of associated `Review` entities
- **Rich Domain Model** with business logic via `calculatePrice()`

### 7.2 Service Layer

The **ApartmentService** orchestrates:
- **Partial Updates** via `updateApartmentById` with individual field validation
- **Relational Integrity** through manual synchronization of nested Review entities

### 7.3 REST Controller

The **ApartmentRestController** provides:
- **CORS Configuration** for `localhost:5173`
- **ResponseEntity** with custom metadata in HTTP headers
- **HTTP Verbs** consistency (GET, POST, PUT, DELETE)

### 7.4 Data Population Engine

**PopulateDB** `@Component` features:
- `ThreadLocalRandom` for realistic test data generation
- Automated property profile creation with randomized attributes

---

## 📡 Data Fetching Strategy

### Fetch API vs. Axios

The project utilizes the native **Fetch API** for the following reasons:

#### Technical Rationale

1. **Native Integration:** Built directly into modern browsers, zero external dependencies
2. **Promise-Based Architecture:** Aligns with React's `useEffect` and `useState` hooks
3. **Streamlined Logic:** Sufficient for standard JSON communication with Java backend

#### Implementation Details

```javascript
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(nuevoApto)
})
.then(res => res.json())
.then(data => setApartamentos([...apartamentos, data]));
```

**Key Features:**
- Header Configuration for Spring Boot `@RequestBody` deserialization
- State Synchronization for instant UI updates without page reloads

---

## 🎯 Key Technical Achievements

### Model Synchronization
Strict alignment between frontend state and Java `Apartment.java` entity, ensuring all 13 attributes are correctly mapped

### Architectural Decoupling
Modular component structure for maintainability:
- Independent management of Form, List, Card, and Filter components

### Automated Data Population
"Populate" feature invokes backend `/populate` endpoint for instant mock data generation

### Dynamic Multi-Criteria Filtering
Real-time filtering using React state with strict type comparison (numeric vs. boolean strings)

---

## 🔧 Technical Challenges & Solutions

### Challenge 1: Data Synchronization
**Problem:** Syncing 13 different fields without data loss  
**Solution:** Centralized `estadoInicial` object ensures complete JSON payload to Spring Boot

### Challenge 2: UI Complexity
**Problem:** UI clutter with many data points  
**Solution:** MUI Chips and CardMedia for visual hierarchy and digestible data presentation

### Challenge 3: Partial Updates
**Problem:** Preventing null overwrites during updates  
**Solution:** Service layer validates each field individually before persistence

---

## 📜 License

Developed by **Alex Picanyol** as an academic technical project (2026).

---

## 🔗 Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Material UI](https://mui.com)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
