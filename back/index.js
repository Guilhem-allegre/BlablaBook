import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { router } from "./src/router/router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { xss } from "express-xss-sanitizer";

// Reconstruction de __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Run Application
const app = express();

app.use(express.json());
app.use(cors());

// Prevent XSS attacks
app.use(xss());

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

//Middleware error
app.use(errorHandler);

//route for the robot who keep back server live
app.get('/', (req, res) => {
  res.status(200).send('API is running');
});

// Start
app.listen(process.env.PORT, () => {
  console.log(`Listening on API running ${process.env.BASE_URL}:${process.env.PORT}`);
});
