# Proyecto-2---Bases-de-Datos-1

## Requisitos
- Docker
- Docker Compose

## Ejecución

1. Clonar repositorio:
    git clone https://github.com/Tiffany24630/Proyecto-2---Bases-de-Datos-1.git 
    cd Proyecto-2---Bases-de-Datos-1

2. Crear archivo .env basado en .env.example:
    PORT=3000
    DB_HOST=db
    DB_PORT=5432
    DB_USER=proy3
    DB_PASSWORD=secret
    DB_NAME=tienda
    JWT_SECRET=super_secret_key

3. Ejecutar:
    docker compose up --build

4. Backend disponible en:
    - Frontend: http://localhost:5173  
    - Backend: http://localhost:3000

## Funcionalidades
Clientes (CRUD):
- Crear cliente
- Listar clientes
- Editar cliente
- Eliminar cliente

Productos:
- Crear producto
- Listar productos

## Endpoints
- GET /reporte-ventas (JOIN + GROUP BY)
- GET /clientes-activos (SUBQUERY)
- GET /vista-ventas (VIEW)
- GET /reporte-cte (CTE WITH)
- POST /venta (TRANSACCIÓN con BEGIN, COMMIT y ROLLBACK en caso de error)

## Roles y permisos

| Rol | Permisos | Usuario actual | Contraseña |
|------|----------|----------|----------|
| admin_r | Acceso completo | admin1 | 1234 |
| vendedor_r | Crear ventas y detalle_venta | vendedor1 | 1234 |
| inventario_r | CRUD productos | inventario1 | 1234 |
| auditor_r | Consultar reportes | auditor1 | 1234 |
| cliente_r | Consultar productos | cliente1 | 1234 |

## Docker
El proyecto está completamente containerizado:

- Base de datos: PostgreSQL
- Backend: Node.js
- Frontend: Vite

Se levanta con: docker compose up