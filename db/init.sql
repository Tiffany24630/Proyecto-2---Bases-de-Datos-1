--DDL

CREATE TABLE proveedor (
    id_prov SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE categoria (
    id_cat SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE producto (
    id_prod SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    id_prov INT,
    id_cat INT,
    FOREIGN KEY (id_prov) REFERENCES proveedor(id_prov),
    FOREIGN KEY (id_cat) REFERENCES categoria(id_cat)
);

CREATE TABLE cliente (
    id_clien SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE empleado (
    id_emp SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL
);

CREATE TABLE venta (
    id_ven SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    id_clien INT,
    id_emp INT,
    FOREIGN KEY (id_clien) REFERENCES cliente(id_clien),
    FOREIGN KEY (id_emp) REFERENCES empleado(id_emp)
);

CREATE TABLE detalle_venta (
    id_det SERIAL PRIMARY KEY,
    cantidad INT NOT NULL,
    precio_unit DECIMAL(10, 2) NOT NULL,
    id_ven INT,
    id_prod INT,
    FOREIGN KEY (id_ven) REFERENCES venta(id_ven),
    FOREIGN KEY (id_prod) REFERENCES producto(id_prod)
);

--Índices de venta y producto para encontrar rápidamente los productos por nombre y las ventas por fecha
CREATE INDEX idx_producto_nombre ON producto(nombre);
CREATE INDEX idx_venta_fecha ON venta(fecha);

--Vista de ventas
CREATE VIEW vista_ventas AS
SELECT v.id_ven, c.nombre AS cliente
FROM venta v
JOIN cliente c ON v.id_clien = c.id_clien;