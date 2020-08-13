const express = require('express');

const app = express()

const PORT = process.env.PORT || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
})