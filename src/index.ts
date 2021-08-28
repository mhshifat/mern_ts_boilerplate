import "dotenv/config";
import createServer from "./lib/express";
import createDbConnection from "./lib/mongoose";
import logger from "./lib/winston";

const server = createServer();
const { PORT, MONGODB_URI } = process.env;

createDbConnection(MONGODB_URI || "")
  .then(() => server.listen(PORT))
  .then(() => {
    logger.info("Database connected!");
    logger.info(`The server is running on http://localhost:${PORT}!`);
  })
  .catch((err) => logger.error(err?.message));
