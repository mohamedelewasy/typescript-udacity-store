import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/.";

const app = express();
const corsOptions = {
  origin: "http://myDomain.com",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
if (process.env.ENV == "dev") app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);

export default app;
