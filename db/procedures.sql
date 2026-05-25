CREATE ROLE admin_r; --Rol para el administrador con todos los privilegios 
CREATE ROLE vendedor_r; --Rol para el vendedor con privilegios de lectura y escritura en ventas y detalles de venta 
CREATE ROLE inventario_r; --Rol para el encargado de inventario con privilegios de lectura y escritura en productos 
CREATE ROLE auditor_r; --Rol para el auditor con privilegios de lectura en productos, ventas y detalles de venta 
CREATE ROLE cliente_r; --Rol para el cliente con privilegios de lectura en productos

--Permisos
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin_r; 
GRANT SELECT, INSERT ON venta TO vendedor_r;
GRANT SELECT, INSERT ON detalle_venta TO vendedor_r;
GRANT SELECT ON producto TO cliente_r;
GRANT SELECT ON venta TO auditor_r;
GRANT SELECT ON detalle_venta TO auditor_r;
GRANT SELECT ON producto TO auditor_r;
REVOKE DELETE ON venta FROM vendedor_r;
REVOKE UPDATE ON producto FROM cliente_r;
GRANT SELECT, INSERT, UPDATE, DELETE ON producto TO inventario_r;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO inventario_r;

--Procedimientos almacenados para operaciones comunes 
CREATE OR REPLACE PROCEDURE crear_producto(
    p_nombre VARCHAR,
    p_precio NUMERIC,
    p_stock INT,
    p_prov INT,
    p_cat INT
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO producto(nombre, precio, stock, id_prov, id_cat)
    VALUES(p_nombre, p_precio, p_stock, p_prov, p_cat);
END;
$$;

--Procedimiento para actualizar el stock de un producto 
CREATE OR REPLACE PROCEDURE actualizar_stock(
    p_id INT,
    p_stock INT
)
LANGUAGE plpgsql AS $$
BEGIN
    UPDATE producto
    SET stock = p_stock
    WHERE id_prod = p_id;
END;
$$;

--Procedimiento para eliminar un producto
CREATE OR REPLACE PROCEDURE eliminar_producto(
    p_id INT
)
LANGUAGE plpgsql AS $$
BEGIN
    DELETE FROM detalle_venta
    WHERE id_prod = p_id;

    DELETE FROM producto
    WHERE id_prod = p_id;
END;
$$;

--Procedimiento para registrar un nuevo cliente
CREATE OR REPLACE PROCEDURE registrar_cliente(
    p_nombre VARCHAR,
    p_telefono VARCHAR,
    p_email VARCHAR
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO cliente(nombre, telefono, email)
    VALUES(p_nombre, p_telefono, p_email);
END;
$$;

--Procedimiento para crear una nueva venta
CREATE OR REPLACE PROCEDURE crear_venta(
    IN p_id_clien INT,
    IN p_id_prod INT,
    IN p_cantidad INT,
    IN p_precio NUMERIC
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_stock INT;
    v_id_venta INT;
BEGIN
    SELECT stock
    INTO v_stock
    FROM producto
    WHERE id_prod = p_id_prod;

    IF v_stock IS NULL THEN
        RAISE EXCEPTION
        'Producto no existe';
    END IF;

    IF v_stock < p_cantidad THEN
        RAISE EXCEPTION
        'Stock insuficiente para producto %',
        p_id_prod;
    END IF;

    INSERT INTO venta(
        fecha,
        id_clien,
        id_emp
    )
    VALUES (
        NOW(),
        p_id_clien,
        1
    )

    RETURNING id_ven
    INTO v_id_venta;

    INSERT INTO detalle_venta(
        cantidad,
        precio_unit,
        id_ven,
        id_prod
    )
    VALUES (
        p_cantidad,
        p_precio,
        v_id_venta,
        p_id_prod
    );

    UPDATE producto
    SET stock = stock - p_cantidad
    WHERE id_prod = p_id_prod;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE
        'ROLLBACK ejecutado: %',
        SQLERRM;
        RAISE;
END;
$$;

GRANT EXECUTE ON PROCEDURE crear_producto(
    VARCHAR,
    NUMERIC,
    INT,
    INT,
    INT
) TO admin_r;

GRANT EXECUTE ON PROCEDURE actualizar_stock(
    INT,
    INT
) TO admin_r;

GRANT EXECUTE ON PROCEDURE eliminar_producto(
    INT
) TO admin_r;

GRANT EXECUTE ON PROCEDURE registrar_cliente(
    VARCHAR,
    VARCHAR,
    VARCHAR
) TO admin_r;

GRANT EXECUTE ON PROCEDURE crear_venta(
    INT,
    INT,
    INT,
    NUMERIC
) TO admin_r;