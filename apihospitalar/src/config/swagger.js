import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Hospitalar",
    version: "1.0.0",
    description: "Documentação da API Hospitalar com JWT e gerenciamento de pacientes e acompanhantes.",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes.js", "./src/app/controllers/*.js", "./src/docs/*.js"], // Caminhos para suas rotas ou controllers
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
