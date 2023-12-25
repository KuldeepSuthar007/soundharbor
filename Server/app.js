const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products')
dotenv.config()


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send("All Good!");
})

app.get('/health', (req, res) => {
    res.status(200).json("Server is up and running");
})


app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)

app.listen(process.env.PORT || 4000,
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log(`Server running on http://localhost:${process.env.PORT} and aslo connect to MongoDB`);
        })
        .catch((err) => {
            console.log("Failed to connect to MongoDB", err);
        }));
