const express = require('express');
// const cors = require("cors");
const userRoutes = require('./src/presentation/routes/userRoutes');
const questionRoutes = require('./src/presentation/routes/questionRouter');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// app.use(cors());
app.use(express.json());

// เชื่อมต่อกับ routes
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});