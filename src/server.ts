import dotenv from "dotenv";
import app from "./app";

dotenv.config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server runs on port ${port}`);
});
