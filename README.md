# Proyecto-2---Bases-de-Datos-1
Sistema web de gestión de tienda desarrollado con PostgreSQL, Node.js, Express, React y Docker.


## Requisitos
- Docker
- Docker Compose

## Instalación y Ejecución

1. Clonar repositorio:
    ```bash
    git clone https://github.com/Tiffany24630/Proyecto-2---Bases-de-Datos-1.git 
    ```
    ```bash
    cd Proyecto-2---Bases-de-Datos-1
    ```
    ---

2. Crear archivo .env basado en .env.example:
    ```env
    PORT=3000
    DB_HOST=db
    DB_PORT=5432
    DB_USER=proy3
    DB_PASSWORD=secret
    DB_NAME=tienda
    JWT_SECRET=super_secret_key
    ```
    ---

3. Ejecutar contenedores:
    ```bash
    docker compose up --build
    ```
    ---

4. Backend disponible en:
    - Frontend: http://localhost:5173  
    - Backend: http://localhost:3000
    - Swagger: http://localhost:3000/api-docs
    ---

## Estructura general del proyecto
```
backend/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── db.js
├── index.js

frontend/
├── components/
├── pages/
├── router/
├── services/

db/
├── init.sql
├── procedures.sql
├── seed.sql
```
---
---

# Funcionalidades
## Autenticación
- Login con JWT
- Middleware de autenticación
- Middleware de roles
- Protección de rutas frontend y backend
---
## Clientes (CRUD Completo)
- Crear cliente
- Listar clientes
- Editar cliente
- Eliminar cliente
---
## Productos (CRUD Completo)
- Crear producto
- Listar productos
- Editar producto
- Actualizar stock
- Eliminar producto
---
## Ventas
- Carrito de compras
- Agregar productos
- Quitar productos
- Crear ventas
- Actualización automática de stock
- Cálculo automático de total
---
## ORM (Sequelize)
- Modelos para usuarios, clientes y productos
- findAll
- findByPk
- create
- update
- destroy
---
## Almacenamiento de procedimientos
- Productos: `crear_producto`, `actualizar_stock` y `eliminar_producto`
- Clientes: `registrar_cliente`
- Ventas: `crear_venta`
---
---
## Endpoints
- GET /reporte-ventas (JOIN + GROUP BY)
- GET /reporte-subquery (SUBQUERY)
- GET /vista-ventas (VIEW)
- GET /reporte-cte (CTE WITH)
- POST /venta (TRANSACCIÓN con BEGIN, COMMIT y ROLLBACK en caso de error)
---

## Roles y permisos

| Rol | Permisos | Usuario de prueba | Contraseña |
|------|----------|----------|----------|
| admin_r | Acceso completo | admin1 | 1234 |
| vendedor_r | Crear ventas y detalle_venta | vendedor1 | 1234 |
| inventario_r | CRUD productos | inventario1 | 1234 |
| auditor_r | Consultar reportes | auditor1 | 1234 |
| cliente_r | Consultar productos | cliente1 | 1234 |
---

## Docker
El proyecto está completamente containerizado:

- Base de datos: PostgreSQL, Procedures, Views, CTE, Subqueries, Índices
- Backend: Node.js, Express, PostgreSQL, Sequelize ORM, JWT y Swagger
- Frontend: Vite y React
- DevOps: Docker y Docker compose