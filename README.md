# 🏢 Apartment Predictor Engine (Full-Stack)

**Author:** Alex Picanyol  
**Version:** 2.0.0  
**Status:** Completed / Academic Project  
**Date:** February 6, 2026

---

## 📝 Table of Contents

1. [Overview](#1--overview)
2. [Key Features](#2--key-features)
3. [Technical Stack](#3--technical-stack)
4. [Architecture](#4--architecture)
5. [Development History](#5--development-history)
6. [Installation & Setup](#6--installation--setup)
7. [Data Fetching Strategy](#7--data-fetching-strategy)
8. [Backend Architecture](#8--backend-architecture)
9. [Reviews System Implementation](#9--reviews-system-implementation)
10. [Key Technical Achievements](#10--key-technical-achievements)
11. [Technical Challenges & Solutions](#11--technical-challenges--solutions)
12. [License](#12--license)
13. [Resources](#13--resources)

---

## 1. 📝 Overview

This is a comprehensive Full-Stack web application designed for real estate management and property price analysis. The system allows users to manage a complex database of apartments with 13 different technical attributes, providing a professional dashboard for CRUD operations, advanced filtering, and automated data testing.

---

## 2. 🚀 Key Features

* **Full CRUD Management:** Create, Read, Update, and Delete apartments with real-time UI synchronization
* **Advanced Multi-Criteria Filtering:** Segment properties by bedrooms, bathrooms, parking slots, and amenities (AC, Heating)
* **Nested Reviews System:** Expandable accordion displaying user ratings and comments for each property through @OneToMany relationships
* **H2 Database Population:** Built-in tool to generate mock data for testing and UI demonstration
* **Responsive Dashboard:** Component-based interface built with Material UI (MUI)
* **Dynamic Visuals:** Automatic image generation for property cards based on unique IDs

---

## 3. 🛠️ Technical Stack

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

## 4. 📂 Architecture

### 4.1 Component Structure

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

### 4.2 Data Model

The system manages apartments with **13 technical attributes**:
- Area, Price, Bedrooms, Bathrooms, Stories
- Parking Slots, Furnishing Status
- Boolean Features: Main Road, Guest Room, Basement, Hot Water Heating, Air Conditioning, Preferred Area

#### 4.2.1 Relational Data Structure

**One-to-Many Relationship:** Each Apartment can have multiple Reviews
- **Fetch Strategy:** EAGER loading ensures reviews are automatically included in apartment objects
- **Frontend Rendering:** Expandable accordion component using MUI Collapse
- **Data Integrity:** Bidirectional synchronization between Apartment and Review entities

---

## 5. 📈 Development History

### 5.1 Phase 1: Foundation & Styling (Feb 4 - Feb 5 early)

| Version | Description |
|---------|-------------|
| v1.0.0 | Project initialization and repository setup |
| v1.1.0 | Refactored main component with basic apartment state management |
| v1.2.0 | **UI Overhaul** - Integration of Material UI (MUI) with themed components |

### 5.2 Phase 2: Feature Expansion & Refactoring (Feb 5)

| Version | Description |
|---------|-------------|
| v1.3.0 | Implementation of full CRUD capabilities with Edit functionality |
| v1.4.0 | **Data Integrity** - Updated schema to match Java Backend entity (13 attributes) |
| v1.5.0 | **Architecture Refactor** - Decoupled monolithic structure into modular components |

### 5.3 Phase 3: Advanced Logic & Final Polish (Feb 6)

| Version | Description |
|---------|-------------|
| v1.6.0 | Added Database Population feature for mass generation of mock properties |
| v1.7.0 | **Advanced Filtering** - FilterPanel with multi-criteria logic |
| v1.8.0 | **Enhanced UX** - Expanded filters + real-time property counter |
| v2.0.0 | **Visual Final** - Dynamic image rendering, ID formatting, MUI Chip labels |
| v2.1.0 | **Reviews Integration** - Implemented expandable review section with MUI Collapse for nested @OneToMany relationship |

---

## 6. ⚙️ Installation & Setup

### 6.1 Prerequisites
- Node.js (v18+)
- Java 17+
- Maven

### 6.2 Frontend Setup

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

### 6.3 Backend Setup

Ensure the Spring Boot backend is running on `http://localhost:8080`

---

## 7. 📡 Data Fetching Strategy

### 7.1 Fetch API vs. Axios

The project utilizes the native **Fetch API** for the following reasons:

#### 7.1.1 Technical Rationale

1. **Native Integration:** Built directly into modern browsers, zero external dependencies
2. **Promise-Based Architecture:** Aligns with React's `useEffect` and `useState` hooks
3. **Streamlined Logic:** Sufficient for standard JSON communication with Java backend

#### 7.1.2 Implementation Details

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

## 8. 🧩 Backend Architecture

### 8.1 Domain Model and Persistence

The core **Apartment** entity implements:
- **Manual UUID Generation** within the constructor
- **JPA/Hibernate** automated mapping of 13 property attributes
- **EAGER Relationships** for immediate loading of associated `Review` entities
- **Rich Domain Model** with business logic via `calculatePrice()`

### 8.2 Service Layer

The **ApartmentService** orchestrates:
- **Partial Updates** via `updateApartmentById` with individual field validation
- **Relational Integrity** through manual synchronization of nested Review entities

### 8.3 REST Controller

The **ApartmentRestController** provides:
- **CORS Configuration** for `localhost:5173`
- **ResponseEntity** with custom metadata in HTTP headers
- **HTTP Verbs** consistency (GET, POST, PUT, DELETE)

### 8.4 Data Population Engine

**PopulateDB** `@Component` features:
- `ThreadLocalRandom` for realistic test data generation
- Automated property profile creation with randomized attributes

---

## 9. 📝 Reviews System Implementation

### 9.1 Frontend Integration Strategy

The Reviews feature leverages the existing `@OneToMany` relationship defined in the Java backend with `FetchType.EAGER`, ensuring that review arrays are automatically included in apartment objects.

### 9.2 UI Component Design

**ApartmentCard.jsx Enhancement:**
- **Expandable Accordion:** Uses Material UI's `Collapse` component with `ExpandMoreIcon` for smooth transitions
- **Review Counter Badge:** Displays total number of reviews in the collapsed state
- **Rating Display:** Visual representation with `StarIcon` and numeric rating (X/5 format)
- **Conditional Rendering:** Handles empty state gracefully with "Sin reseñas aún" message

**Key Implementation Features:**
```javascript
const [expandido, setExpandido] = useState(false);

<Button 
  startIcon={<ExpandMoreIcon sx={{ transform: expandido ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
  onClick={() => setExpandido(!expandido)}
>
  Reseñas ({apt.reviews ? apt.reviews.length : 0})
</Button>

<Collapse in={expandido}>
  <List dense>
    {apt.reviews && apt.reviews.map((rev, index) => (
      <ListItem key={index}>
        <ListItemText 
          primary={<StarIcon /> {rev.rating}/5}
          secondary={rev.comment} 
        />
      </ListItem>
    ))}
  </List>
</Collapse>
```

### 9.3 State Management Considerations

**Automatic Synchronization:**
- No additional state required beyond the existing `apartamentos` array
- React's reconciliation algorithm automatically detects changes in nested `reviews` arrays
- When the backend returns updated apartment objects with new reviews, `setApartamentos` triggers a re-render

**Performance Optimization:**
- `unmountOnExit` prop on Collapse component prevents unnecessary DOM rendering
- Reviews are only rendered when the accordion is expanded
- Dense list variant reduces vertical space usage

### 9.4 Backend Relationship Handling

The system relies on the pre-configured JPA relationship:
```java
@OneToMany(mappedBy = "apartment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
private List<Review> reviews;
```

**Benefits:**
- Single API call retrieves complete apartment data including all reviews
- No N+1 query problem due to EAGER fetching
- Bidirectional relationship ensures data consistency

### 9.5 Future Enhancement: Review Creation

A "Añadir Reseña" button is included in the UI for future implementation, which will require:
- A modal or inline form component for rating and comment input
- POST endpoint: `/api/reviews/create?apartmentId={id}`
- State refresh after successful submission

---

## 10. 🎯 Key Technical Achievements

### 10.1 Model Synchronization
Strict alignment between frontend state and Java `Apartment.java` entity, ensuring all 13 attributes are correctly mapped

### 10.2 Architectural Decoupling
Modular component structure for maintainability:
- Independent management of Form, List, Card, and Filter components

### 10.3 Automated Data Population
"Populate" feature invokes backend `/populate` endpoint for instant mock data generation

### 10.4 Dynamic Multi-Criteria Filtering
Real-time filtering using React state with strict type comparison (numeric vs. boolean strings)

### 10.5 Relational Data Handling
The frontend successfully renders complex nested objects through the @OneToMany relationship between Apartments and Reviews:
- **Expandable UI:** Material UI's Collapse component manages the display of an unlimited number of user reviews without cluttering the dashboard
- **EAGER Fetching:** Backend automatically includes review arrays in apartment objects, eliminating the need for separate API calls
- **State Management:** React automatically detects and re-renders when review data changes, maintaining UI synchronization

---

## 11. 🔧 Technical Challenges & Solutions

### 11.1 Challenge: Data Synchronization
**Problem:** Syncing 13 different fields without data loss  
**Solution:** Centralized `estadoInicial` object ensures complete JSON payload to Spring Boot

### 11.2 Challenge: UI Complexity
**Problem:** UI clutter with many data points  
**Solution:** MUI Chips and CardMedia for visual hierarchy and digestible data presentation

### 11.3 Challenge: Partial Updates
**Problem:** Preventing null overwrites during updates  
**Solution:** Service layer validates each field individually before persistence

### 11.4 Challenge: Nested Object Rendering
**Problem:** Displaying variable-length review arrays without compromising card layout  
**Solution:** Collapsible accordion pattern with `unmountOnExit` optimization and dense list variant

---

## 12. 📜 License

Developed by **Alex Picanyol** as an academic technical project (2026).

---

## 13. 🔗 Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Material UI](https://mui.com)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
