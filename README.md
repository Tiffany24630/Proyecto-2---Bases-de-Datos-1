# Proyecto-2---Bases-de-Datos-1

## Requisitos
- Docker
- Docker Compose

## Ejecución

1. Clonar repositorio:
    git clone <URL_DEL_REPO>
    cd Proyecto-2---Bases-de-Datos-1

2. Crear archivo .env basado en .env.example:
    DB_USER=proy2
    DB_PASSWORD=secret
    DB_NAME=proy2
    DB_HOST=db
    DB_PORT=5432

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

## Docker
El proyecto está completamente containerizado:

- Base de datos: PostgreSQL
- Backend: Node.js
- Frontend: Vite

Se levanta con: docker compose up