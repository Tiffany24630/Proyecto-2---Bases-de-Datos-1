import pool from "../db.js";

export const crearVenta = async (req, res) => {
  const client =
    await pool.connect();

  try {
    const {detalles, id_clien} = req.body;

    if (!detalles || detalles.length === 0) {
      return res.status(400).json({
        error:
          "Debe agregar productos"
      });
    }

    await client.query(
      "BEGIN"
    );

    const venta =
      await client.query(
        `
        INSERT INTO venta
        (
          fecha,
          id_clien,
          id_emp
        )
        VALUES (
          NOW(),
          $1,
          1
        )
        RETURNING id_ven
        `,
        [id_clien]
      );

    const idVenta = venta.rows[0].id_ven;

    for (const d of detalles) {
      const producto =
        await client.query(
          `
          SELECT stock
          FROM producto
          WHERE id_prod = $1
          `,
          [d.id_prod]
        );

      if (producto.rows.length === 0) {
        throw new Error(
          "Producto no encontrado"
        );
      }

      const stock = producto.rows[0].stock;

      if (stock < d.cantidad) {
        throw new Error(
          `Stock insuficiente para producto ${d.id_prod}`
        );
      }

      await client.query(
        `
        INSERT INTO detalle_venta
        (
          cantidad,
          precio_unit,
          id_ven,
          id_prod
        )
        VALUES (
          $1,
          $2,
          $3,
          $4
        )
        `,
        [d.cantidad, d.precio, idVenta, d.id_prod]
      );

      await client.query(
        `
        UPDATE producto
        SET stock = stock - $1
        WHERE id_prod = $2
        `,
        [d.cantidad, d.id_prod]
      );
    }

    await client.query(
      "COMMIT"
    );

    return res.json({
      mensaje:
        "Venta creada",
      idVenta
    });

  }catch (error){
    await client.query(
      "ROLLBACK"
    );

    console.error(error);

    return res.status(500).json({
      error:
        error.message
    });

  }finally{
    client.release();
  }
};

export const reporteVentas = async (req, res) => {
  try {
    const result = await pool.query(
        `
        SELECT
          v.id_ven,
          c.nombre AS cliente,
          SUM(
            dv.cantidad * dv.precio_unit
          ) AS total
        FROM venta v
        INNER JOIN cliente c
          ON v.id_clien = c.id_clien
        INNER JOIN detalle_venta dv
          ON v.id_ven = dv.id_ven
        GROUP BY
          v.id_ven,
          c.nombre
        ORDER BY v.id_ven
        `
      );

    return res.json(
      result.rows
    );

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error:
        "Error reporte ventas"
    });
  }
};

export const reporteSubquery = async (req, res) => {
  try {
    const result =
      await pool.query(
        `
        SELECT
          c.nombre,
          (
            SELECT COUNT(*)
            FROM venta v
            WHERE v.id_clien = c.id_clien
          ) AS total_ventas
        FROM cliente c
        `
      );

    return res.json(
      result.rows
    );

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error subquery"
    });
  }
};

export const reporteCTE = async (req, res) => {
  try {
    const result =
      await pool.query(
        `
        WITH total_ventas AS (
          SELECT
            id_clien,
            COUNT(*) AS total
          FROM venta
          GROUP BY id_clien
        )
        SELECT
          c.nombre,
          tv.total
        FROM total_ventas tv
        INNER JOIN cliente c
          ON c.id_clien = tv.id_clien
        `
      );

    return res.json(
      result.rows
    );

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error CTE"
    });
  }
};

export const vistaVentas = async (req, res) => {
  try {
    const result =
      await pool.query(
        `
        SELECT *
        FROM vista_ventas
        `
      );

    return res.json(
      result.rows
    );

  }catch (error){
    console.error(error);

    return res.status(500).json({
      error:
        "Error vista"
    });
  }
};