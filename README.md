# Lifecordz - Stem Cell Banking Platform

Lifecordz is a full-stack web application for managing stem cell banking operations. It supports multiple user roles (Admin, Doctor, Technician, Donor, Courier, Support) and provides secure authentication, payment integration, and role-based dashboards.

## Features

- User registration & login with JWT authentication
- Role-based access (Admin, Doctor, Technician, Donor, Courier, Support)
- Email verification for new users
- Payment gateway integration (Razorpay)
- Admin dashboard for user & payment management
- Doctor dashboard for donor management
- Technician & Courier modules
- MongoDB for data storage
- Automated email notifications
- Secure password encryption (BCrypt)
- RESTful APIs (Spring Boot)
- Modern React frontend (Material UI)

## Homepage
  <img width="1451" alt="home" src="https://github.com/user-attachments/assets/53b5dd50-030f-4712-a225-fb35c552c5b4" />

## Admin-Dashboard
 <img width="1452" alt="admindash" src="https://github.com/user-attachments/assets/00ef240f-a0d9-4689-aa59-08eace9ea3ba" />



## Tech Stack

- **Backend:** Java, Spring Boot, Spring Security, MongoDB, JWT, Razorpay
- **Frontend:** React.js, Material UI, Axios
- **Other:** Lombok, Maven, Email (Spring Mail), Docker (optional)

## Getting Started

### Prerequisites

- Java 21+
- Node.js & npm
- MongoDB (local or Atlas)
- Maven

### Backend Setup

```sh
cd backend
cp src/main/resources/application-example.properties src/main/resources/application.properties
# Update MongoDB URI, email, and Razorpay keys in application.properties
mvn clean package
java -jar target/stem-cell-banking-1.0.0.jar
```

### Frontend Setup

```sh
cd frontend
npm install
npm start
```

### Build for Production

```sh
cd frontend
npm run build
# Deploy the build/ folder to your preferred static hosting
```

## Environment Variables

- Configure MongoDB URI, JWT secret, email credentials, and Razorpay keys in `backend/src/main/resources/application.properties`.

## Folder Structure

```
backend/   # Spring Boot API
frontend/  # React app
```

## Contribution

1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and open a Pull Request

<<<<<<< HEAD

=======
>>>>>>> f16831f1d94af969c607c1ecc696f370da2e1b43

---

**Made with ❤️ by Divyansh Saxena**
