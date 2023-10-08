const express = require("express");
const cors = require("cors");

const inventoryRoutes = require("./Routes/routes");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");
dotenv.config();
//db conection
connectDB();

// Use the cors middleware with appropriate configuration if needed
app.use(cors());
app.use(express.json()); // to accept JSON data (check from Postman)
app.get("/", (req, res) => {
  res.send("API is running...");
});

//route to controller
app.use("/api/grocery", inventoryRoutes);

const PORT = process.env.PORT || 5000;
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);
//methode
//server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
