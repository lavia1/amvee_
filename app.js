const express = require('express');
const cors = require('cors');
const parts = require('./routes/parts');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', parts);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});