// Code for mongoose config in backend
// Filename - backend/index.js

// To connect with your MongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://JaturaputJongsubcharoen:mac0840747314@comp229.evxxr.mongodb.net/', {
    dbName: 'history_group_assignment', // Replace 'yourDB-name' with your actual database name
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to MongoDB database'));

// Schema for users of the app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

console.log("App is listening at port 5000");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("App is Working");
    // You can check backend is working or not by 
    // entering http://localhost:5000
    
    // If you see "App is Working", it means
    // backend is functioning properly
});

app.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            res.send(req.body);
            console.log(result);
        } else {
            console.log("User already registered");
        }
    } catch (e) {
        console.error(e);
        res.status(500).send("Something Went Wrong");
    }
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});