import app from "./app";
import { PORT } from "./config/constants";
import logger from "./config/logger";

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
