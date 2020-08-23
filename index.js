const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

const app = express();
connectDB();

const corsConfig = {
  origin: process.env.FRONTEND_URL
}
app.use(cors(corsConfig));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/linksCreator', require('./routes/linksCreator'));
app.use('/api/files', require('./routes/files'));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});
