import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import loggerConfig from "./config/logger.config";
import { RequestLoggerMiddleware } from "./request-logger.middleware";

require("dotenv").config();
@Module({})
export class RequestLoggerModule {
   static forRoot(): DynamicModule {
      return {
         module: RequestLoggerModule,
         imports: [
            ConfigModule.forRoot({
               load: [loggerConfig],
            }),
         ],
         providers: [RequestLoggerMiddleware],
         exports: [RequestLoggerMiddleware],
         global: true,
      };
   }
}
