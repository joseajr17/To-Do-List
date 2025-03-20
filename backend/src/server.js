const cors = require ('cors');
const express = require('express');

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

app.listen(5000, () => console.log("Server is running in http://localhost:5000"));