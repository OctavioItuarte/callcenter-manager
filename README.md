# Proyecto Fullstack - Sistema de Gestión de Call Center

Este proyecto es una aplicación **web fullstack** desarrollada para mejorar el control, administración y análisis de llamadas en un **Call Center**.
---

## Funcionalidades principales

- Autenticación con inicio de sesión y **tokens JWT**
- Roles de usuario:  
  - 👨‍💼 **Administrador**: crea/elimina usuarios, asigna permisos, sube archivos `.csv` con datos de llamadas  
  - 👥 **Usuario de gestión**: ve todas las llamadas  
  - 👤 **Usuario limitado**: solo ve llamadas de su dominio
- Visualización de **llamadas telefónicas** con:
  - Filtros dinámicos por columnas
  - Ordenamiento
  - Límite de filas por vista
  - Cálculo de duración total por filtros aplicados
- Subida de archivos CSV para cargar nuevas llamadas
- Vista de usuarios para administración
- Gestión por dominio de origen/destino de llamadas
- Visualización de:
  - Origen y destino
  - Fecha y hora
  - Duración de conversación
  - Duración total de llamada
  - Internas vs externas

---

## Tecnologías utilizadas

### Backend
- **Java**
- **Spring Boot** (REST API, seguridad, servicios)
- **Spring Security + JWT** (autenticación)
- **Maven** (gestión de dependencias)
- **Tomcat** (servidor embebido)
- **PostgreSQL** (base de datos relacional)
- Arquitectura en capas:  
  `Controller → Service → Repository → Domain`

### Frontend
- **JavaScript**
- **HTML5 + CSS3**
- **Bootstrap** (estilos responsivos)
- Tabla dinámica con:
  - Búsqueda por filtros
  - Ordenamiento
  - Paginación
  - Cálculo de duración

---

## Seguridad

- **Autenticación basada en tokens JWT**
- Middleware en el backend para validar tokens
- Acceso restringido por roles
- Protección de endpoints con filtros

