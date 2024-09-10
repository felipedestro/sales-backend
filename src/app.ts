import express from "express";
import { PORT } from "@/config/config";
import router from "./routes/index.route";

const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listing in port: ${PORT}`);
});
