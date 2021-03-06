const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.log(`Hubo un error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
