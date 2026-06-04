//nest imports
import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

//package imports
import { Request, Response, NextFunction } from "express";

//local imports
import { LogConfig, LogItem } from "./interface";
import { REQUEST_LOGGER_CONFIG_KEY } from "./constants";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
   constructor(private readonly configService: ConfigService) {}
   private logger = new Logger(RequestLoggerMiddleware.name);

   use(request: Request, response: Response, next: NextFunction): void {
      const { method, originalUrl, headers } = request;
      const userAgent = request.get("user-agent") || "";
      const ip = request.get("x-forwarded-for") || "";
      const rid = request.get("x-request-id") || "";
      response.on("close", () => {
         const { serviceName, enabled, prettify } =
            this.configService.get<LogConfig>(REQUEST_LOGGER_CONFIG_KEY);
         /**
          * if config is not enabled; proceed to the next middleware
          */
         if (!enabled) {
            return next();
         }
         const { statusCode, statusMessage } = response;
         const logItem: LogItem = {
            req: {
               t: new Date(),
               m: method,
               r: originalUrl,
               ua: userAgent,
               ip: ip,
               tid: request?.tenant?.id,
               tsub: request?.tenant?.subdomain,
               svc: serviceName,
               rid: rid,
            },
            res: {
               s: statusCode,
               m: statusMessage,
            },
         };

         this.logger.log(prettify ? logItem : JSON.stringify(logItem));
         /**
          * TODO
          * send logs to elasticsearch cluster
          */
      });

      next();
   }
}
