const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API EklesiaKonecta',
      version: '1.0.0',
      description: 'Documentação automática da API EklesiaKonecta'
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Ajuste para onde estão seus arquivos de rotas/controllers
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;