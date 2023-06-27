const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

dotenv.config({path: '.env'});

const app = express();

app.use(cors({origin: true}));
app.use(express.json());    // Converting form data into json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    return res.json("Hi there....")
});

// user authentication route
const userRoute = require('./routes/auth');
app.use("/api/users/", userRoute); //send the user to auth.js if the path is /api/users

// Artist Routes
const artistRoutes = require('./routes/artists');
app.use('/api/artists/', artistRoutes)

// Albums Routes
const albumRoutes = require('./routes/albums');
app.use('/api/albums/', albumRoutes);

// Songs Routes
const songRoutes = require('./routes/songs');
app.use('/api/songs/', songRoutes);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.connection
.once("open", () => console.log("Connected"))
.on("error", (error) => console.log(`ERROR : ${error}`));

app.listen(process.env.PORT, () => console.log(`Listening to port: ${process.env.PORT}`));
