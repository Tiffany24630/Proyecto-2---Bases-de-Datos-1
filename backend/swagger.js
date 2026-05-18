const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "API Proyecto BD1",
      version: "1.0.0",
      description:
        "Documentación del sistema de inventario"
    },

    servers: [
      {
        url: "http://localhost:3000"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: [
    "./routes/*.js"
  ]
};

export default swaggerOptions;