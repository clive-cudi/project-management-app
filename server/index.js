const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4767;

app.use(cors());

app.get("/",(req, res) => {
    return res.status(200).send("Hello World!!");
});

app.listen(PORT, () => {
    console.log(`Server up at PORT: ${PORT}`);
});
