import app from "./app";
import { ENV, PORT } from "./config/constants";
import logger from "./config/logger";

app.listen(PORT, () => {
  logger.info(`Server running in ${ENV} on port ${PORT}`);
});
