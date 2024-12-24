import express, { Express } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import swaggerUi from "swagger-ui-express";

import AppDataSource from "@/infrastructure/db/dataSourceLocal";
import router from "@/interfaces/api";
import errorHandler from "@/middlewares/error.middleware";
import swaggerSpec from "@/config/swagger";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 1000,
  limit: 5,
  message: "Too Many Request",
});

app.use(limiter);
app.use(express.json({ limit: "500kb" }));
app.use(express.urlencoded({ limit: "500kb", extended: true }));
app.use(errorHandler);

app.use("/api/v1", router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("TypeORM connection error: ", error);
  });
