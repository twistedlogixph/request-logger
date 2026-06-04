# request-logger

Common Library for RetechPH Dev team to request logging

## ENV Config

| Name                        | Description                      | Type      | Required | Default Value | Example          |
| --------------------------- | -------------------------------- | --------- | -------- | ------------- | ---------------- |
| TL_LOG_REQUEST_ENABLED      | Enable / disables the logging    | `boolean` | no       | ''            | true             |
| TL_LOG_REQUEST_PRETTIFY     | Pretty print the json log item   | `boolean` | no       | false         | true             |
| TL_LOG_REQUEST_SERVICE_NAME | ttl of cached items (in seconds) | `string`  | yes      | ''            | employee-service |

## Usage

    @Module({
        imports: [
    	    RequestLoggerModule.forRoot()
        ],
    })
    export class AppModule implements NestModule {
        configure(consumer:  MiddlewareConsumer) {
    	    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
      }
    }

## Log format
