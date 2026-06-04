//nest imports
import { registerAs } from "@nestjs/config";
import { InternalServerErrorException } from "@nestjs/common";

//local imports
import { REQUEST_LOGGER_CONFIG_KEY } from "../constants";
import { LogConfig } from "../interface";

require("dotenv").config();
//--- ENV Config Checking && validation
const redisHost = process.env.TL_LOG_REQUEST_SERVICE_NAME;
if (!redisHost) {
   throw new InternalServerErrorException(
      "Missing environment variable: TL_LOG_REQUEST_SERVICE_NAME",
   );
}
export default registerAs(REQUEST_LOGGER_CONFIG_KEY, () => {
   const conf: LogConfig = {
      enabled: process.env.TL_LOG_REQUEST_ENABLED === "true",
      prettify: process.env.TL_LOG_REQUEST_PRETTIFY === "true",
      serviceName: process.env.TL_LOG_REQUEST_SERVICE_NAME,
   };
   return conf;
});
