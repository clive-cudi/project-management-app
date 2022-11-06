const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "./.env.local")});
const PORT = process.env.PORT;
const MONGO_URI = process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI;
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');

app.use(cors());

app.use(express.json());

app.get("/",(req, res) => {
    return res.status(200).send("Hello World!!");
});

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
}).then(()=>{
    console.log("MongoDB connected!")
}).catch((e)=> {
    console.log("Error Connecting to MongoDB")
    console.log(e);
});

// app.post("/login", (req, res) => {
//     return res.json({body: req})
// })

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.listen(PORT, () => {
    console.log(`Server up at PORT: ${PORT}`);
});
