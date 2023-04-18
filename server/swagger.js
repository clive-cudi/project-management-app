const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_output.json';

const endpointsFiles = [
    './routes/auth.js',
    './routes/task.js',
    './routes/project.js',
    './routes/teams.js',
    './routes/client.js',
    './routes/user.js'
];

const doc = {
    info: {
        version: "1.0.0",
        title: "Anchor API",
        description: "Anchor API Documentation"
    },
    host: "localhost:4767",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Auth",
            "description": "Authentication"
        },
        {
            "name": "Task",
            "description": "Task"
        },
        {
            "name": "Project",
            "description": "Project"
        },
        {
            "name": "Teams",
            "description": "Teams"
        },
        {
            "name": "Client",
            "description": "Client"
        },
        {
            "name": "User",
            "description": "User"
        }
    ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);