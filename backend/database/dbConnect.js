const mongoose = require("mongoose");

module.exports = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(`${process.env.DB_URL}/ecommerce`)
    .then((e) => {
      console.log(`Database connected with ${e.connection.host}`);
    })
};
