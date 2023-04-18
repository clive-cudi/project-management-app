// swagger options
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Anchor API",
            version: "1.0.0",
            description: "Anchor API Documentation",
            contact: {
                name: "Anchor",
                url: "https://anchor.cudi.me",
                email: "clivemaina41@gmail.com"
            },
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/"
            }
        },
        servers: [
            {
                url: "http://localhost:4767"
            }
        ]
    },
    apis: [`${__dirname}/routes/*.js`]
}

// console.log(`${__dirname}/routes/*.js`);

module.exports = {
    swaggerOptions
}