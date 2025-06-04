# Call Center Management System

This is a **fullstack web application** developed to enhance control, administration, and analysis of phone calls in a Call Center environment.

## Main Features

### ✅ Authentication
- Secure login using JWT (JSON Web Tokens)
- Middleware to validate tokens on backend
- Role-based access control

### 👤 User Roles
- **Administrator** 👨‍💼: Can create/delete users, assign permissions, upload `.csv` files with call data
- **Management User** 👥: Can view all call records
- **Limited User** 👤: Can only view call records from their domain

### 📞 Call Records Visualization
- Dynamic filters by column
- Sorting by any column
- Row limit per view
- Total duration calculated for filtered results
- Origin and destination domain filtering
- Internal vs external call classification

### 📁 CSV Upload
- Upload `.csv` files to import new call data

### 👥 User Management View
- Admins can manage users and permissions from the frontend

## Technologies Used

### Backend
- **Java**
- **Spring Boot** (REST API, security, services)
- **Spring Security** + **JWT** (authentication and authorization)
- **Maven** (dependency management)
- **Tomcat** (embedded server)
- **PostgreSQL** (relational database)
- Layered architecture:  
  `Controller → Service → Repository → Domain`

### Frontend
- **JavaScript**
- **HTML5 + CSS3**
- **Bootstrap** (responsive design)
- **Dynamic Table** with:
  - Filtering and searching
  - Column sorting
  - Pagination
  - Total call duration calculation

## Security
- Token-based authentication using JWT
- Role-restricted endpoints
- Token validation middleware in backend
- Frontend access based on roles

---

## 👥 Contributors

We thank the following developers for contributing to this project:

| Name           | GitHub Profile                    |
|----------------|-----------------------------------|
| Agustin        | https://github.com/LordKrymer     |
| Lucas Quiroga  | https://github.com/lmq94          |
| OctavioItuarte | https://github.com/OctavioItuarte |


