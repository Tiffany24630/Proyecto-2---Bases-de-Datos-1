CREATE ROLE admin_r;
CREATE ROLE vendedor_r;
CREATE ROLE inventario_r;
CREATE ROLE auditor_r;
CREATE ROLE cliente_r;

GRANT * ON ALL TABLES IN SCHEMA public TO admin_r;
GRANT SELECT, INSERT ON venta, detalle_venta TO vendedor_r;
GRANT SELECT, INSERT ON detalle_venta TO vendedor_r;
GRANT SELECT ON producto TO cliente_r;
GRANT SELECT ON venta TO auditor_r;
GRANT SELECT ON detalle_venta TO auditor_r;

CREATE TABLE usuarios(
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

INSERT INTO usuarios(username, password, rol) VALUES
('admin1', 'admin2', 'admin3'),
('vendedor1', 'vendedor2', 'vendedor3'),
('inventario1', 'inventario2', 'inventario3'),
('auditor1', 'auditor2', 'auditor3'),
('cliente1', 'cliente2', 'cliente3');