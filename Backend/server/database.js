//Modulos internos
const mongoose = require("mongoose");
//Conexión a base de datos
mongoose
  .connect("mongodb://127.0.0.1:27017/pruebaTecnica", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Base de datos funcionando");
  })
  .catch((err) => {
    console.log("Hubo un problema: ", err);
  });
module.exports = mongoose;
