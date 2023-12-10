import app from "./app";
import { ENV, PORT } from "./lib/constants";
import logger from "./lib/logger";

app.listen(PORT, () => {
  logger.info(`Server running in ${ENV} on port ${PORT}`);
});
