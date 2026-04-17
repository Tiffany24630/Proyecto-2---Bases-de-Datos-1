--DDL

CREATE TABLE proveedor (
    id_prov SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
)

CREATE TABLE producto (
    id_prod SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (id_prov) REFERENCES proveedor(id_prov),
    FOREIGN KEY (id_cat) REFERENCES categoria(id_cat)
)

CREATE TABLE categoria (
    id_cat SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
)

CREATE TABLE cliente (
    id_clien SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL
)

CREATE TABLE empleado (
    id_emp SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL
)

CREATE TABLE venta (
    id_ven SERIAL PRIMARY KEY,
    fecha TIMESTAMP NOT NULL,
    FOREIGN KEY (id_clien) REFERENCES cliente(id_clien),
    FOREIGN KEY (id_emp) REFERENCES empleado(id_emp)
)

CREATE TABLE detalle_venta (
    id_det SERIAL PRIMARY KEY,
    cantidad INT NOT NULL,
    precio_unit DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_ven) REFERENCES venta(id_ven),
    FOREIGN KEY (id_prod) REFERENCES producto(id_prod)
)

--DML
INSERT INTO Categoria (nombre) VALUES
('Electrónica'), ('Ropa'), ('Hogar'), ('Deportes'), ('Juguetes'),
('Libros'), ('Belleza'), ('Automotriz'), ('Tecnología'), ('Accesorios'),
('Música'), ('Videojuegos'), ('Oficina'), ('Mascotas'), ('Salud'),
('Jardín'), ('Herramientas'), ('Calzado'), ('Muebles'), ('Iluminación'),
('Cocina'), ('Arte'), ('Educación'), ('Viajes'), ('Fitness');

INSERT INTO Proveedor (nombre, telefono) VALUES
('Proveedor 1','10000001'), ('Proveedor 2','10000002'),
('Proveedor 3','10000003'), ('Proveedor 4','10000004'),
('Proveedor 5','10000005'), ('Proveedor 6','10000006'),
('Proveedor 7','10000007'), ('Proveedor 8','10000008'),
('Proveedor 9','10000009'), ('Proveedor 10','10000010'),
('Proveedor 11','10000011'), ('Proveedor 12','10000012'),
('Proveedor 13','10000013'), ('Proveedor 14','10000014'),
('Proveedor 15','10000015'), ('Proveedor 16','10000016'),
('Proveedor 17','10000017'), ('Proveedor 18','10000018'),
('Proveedor 19','10000019'), ('Proveedor 20','10000020'),
('Proveedor 21','10000021'), ('Proveedor 22','10000022'),
('Proveedor 23','10000023'), ('Proveedor 24','10000024'),
('Proveedor 25','10000025');

INSERT INTO Producto (nombre, precio, stock, id_categoria, id_proveedor) VALUES
('Mouse',15,50,1,1), ('Teclado',25,40,1,2), ('Monitor',120,20,1,3),
('Camisa',20,60,2,4), ('Pantalón',30,50,2,5),
('Sofá',200,10,3,6), ('Mesa',150,15,3,7),
('Balón',18,70,4,8), ('Bicicleta',300,5,4,9),
('Muñeca',25,30,5,10), ('Rompecabezas',15,40,5,11),
('Libro A',10,80,6,12), ('Libro B',12,70,6,13),
('Perfume',50,25,7,14), ('Shampoo',8,90,7,15),
('Aceite',20,60,8,16), ('GPS',100,10,8,17),
('Laptop',800,8,9,18), ('Tablet',300,12,9,19),
('Audífonos',40,35,10,20), ('Guitarra',150,7,11,21),
('Consola',500,6,12,22), ('Silla',60,20,13,23),
('Comida perro',25,45,14,24), ('Vitaminas',15,55,15,25);

INSERT INTO Cliente (nombre, email, telefono) VALUES
('Cliente 1','c1@mail.com','20000001'), ('Cliente 2','c2@mail.com','20000002'),
('Cliente 3','c3@mail.com','20000003'), ('Cliente 4','c4@mail.com','20000004'),
('Cliente 5','c5@mail.com','20000005'), ('Cliente 6','c6@mail.com','20000006'),
('Cliente 7','c7@mail.com','20000007'), ('Cliente 8','c8@mail.com','20000008'),
('Cliente 9','c9@mail.com','20000009'), ('Cliente 10','c10@mail.com','20000010'),
('Cliente 11','c11@mail.com','20000011'), ('Cliente 12','c12@mail.com','20000012'),
('Cliente 13','c13@mail.com','20000013'), ('Cliente 14','c14@mail.com','20000014'),
('Cliente 15','c15@mail.com','20000015'), ('Cliente 16','c16@mail.com','20000016'),
('Cliente 17','c17@mail.com','20000017'), ('Cliente 18','c18@mail.com','20000018'),
('Cliente 19','c19@mail.com','20000019'), ('Cliente 20','c20@mail.com','20000020'),
('Cliente 21','c21@mail.com','20000021'), ('Cliente 22','c22@mail.com','20000022'),
('Cliente 23','c23@mail.com','20000023'), ('Cliente 24','c24@mail.com','20000024'),
('Cliente 25','c25@mail.com','20000025');

INSERT INTO Empleado (nombre, cargo) VALUES
('Empleado 1','Vendedor'), ('Empleado 2','Cajero'),
('Empleado 3','Gerente'), ('Empleado 4','Soporte'),
('Empleado 5','Vendedor'), ('Empleado 6','Cajero'),
('Empleado 7','Gerente'), ('Empleado 8','Soporte'),
('Empleado 9','Vendedor'), ('Empleado 10','Cajero'),
('Empleado 11','Gerente'), ('Empleado 12','Soporte'),
('Empleado 13','Vendedor'), ('Empleado 14','Cajero'),
('Empleado 15','Gerente'), ('Empleado 16','Soporte'),
('Empleado 17','Vendedor'), ('Empleado 18','Cajero'),
('Empleado 19','Gerente'), ('Empleado 20','Soporte'),
('Empleado 21','Vendedor'), ('Empleado 22','Cajero'),
('Empleado 23','Gerente'), ('Empleado 24','Soporte'),
('Empleado 25','Vendedor');

INSERT INTO Venta (fecha, id_cliente, id_empleado) VALUES
('2024-01-01',1,1), ('2024-01-02',2,2), ('2024-01-03',3,3),
('2024-01-04',4,4), ('2024-01-05',5,5),
('2024-01-06',6,6), ('2024-01-07',7,7),
('2024-01-08',8,8), ('2024-01-09',9,9),
('2024-01-10',10,10), ('2024-01-11',11,11),
('2024-01-12',12,12), ('2024-01-13',13,13),
('2024-01-14',14,14), ('2024-01-15',15,15),
('2024-01-16',16,16), ('2024-01-17',17,17),
('2024-01-18',18,18), ('2024-01-19',19,19),
('2024-01-20',20,20), ('2024-01-21',21,21),
('2024-01-22',22,22), ('2024-01-23',23,23),
('2024-01-24',24,24), ('2024-01-25',25,25);

INSERT INTO DetalleVenta (id_venta, id_producto, cantidad, precio_unitario) VALUES
(1,1,2,15),(2,2,1,25),(3,3,1,120),(4,4,2,20),(5,5,1,30),
(6,6,1,200),(7,7,2,150),(8,8,3,18),(9,9,1,300),(10,10,2,25),
(11,11,1,15),(12,12,2,10),(13,13,1,12),(14,14,1,50),(15,15,2,8),
(16,16,1,20),(17,17,1,100),(18,18,1,800),(19,19,1,300),(20,20,2,40),
(21,21,1,150),(22,22,1,500),(23,23,2,60),(24,24,3,25),(25,25,2,15);

--Índices de venta y producto para encontrar rápidamente los productos por nombre y las ventas por fecha
CREATE INDEX idx_producto_nombre ON producto(nombre);
CREATE INDEX idx_venta_fecha ON venta(fecha);