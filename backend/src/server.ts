import "dotenv/config";
import { app } from "./app.js";

const port = Number(process.env.PORT) || 5001;

app.listen(port, () => {
  console.log(`Interview Question Tracker API running on http://localhost:${port}`);
});

