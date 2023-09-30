const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const authRoutes = require('./route/authRoutes');
const userRoutes = require('./route/userRoutes');


app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded

// Rute pendaftaran
app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to rey application." });
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});