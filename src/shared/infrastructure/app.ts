import "dotenv/config";
import express from "express";
import config from "config";
import log from "../utils/logger";

import { v1Router } from "./http/api/v1";

const app = express();

app.use(express.json({}));

app.use(v1Router);

const port = config.get<string>("port");

app.listen(port || 4000, () => {
  log.info(`App started at http://localhost:${port}`);
});
