import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { app } from "./app.js";

(async () => {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`🚀 InterviewForge API on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
})();
