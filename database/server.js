const express = require('express');
const userRoutes = require('./src/presentation/routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.prot || 3000;

app.use(express.json());

// เชื่อมต่อกับ routes
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
