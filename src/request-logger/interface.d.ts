import { Request } from "express";
interface LogRequest {
   t: Date;
   m: string; // m = method
   ip: string; // ip = ip address
   r: string; // r = resource | complete request path
   a: T; // a = auth | custom type based on generic value passed
   ua: string; // ua - user agent
   cl: string | number; //cl = contentLength
   tid: number; //tenant id
   tsub: string; //tenant subdomain
   svc: string; //service name
   rid: string; //request / correlation id
}

interface LogResponse {
   s: string | number; //s = statuscode
   cl: string | number; //cl = contentLength
   m?: string; //m = message, attempt to log response message for non 2xx response status codes
}
interface LogItem {
   req: Partial<LogRequest>;
   res: Partial<LogResponse>;
}

interface LogConfig {
   enabled: boolean;
   prettify: boolean;
   serviceName: string;
}
export { LogItem, LogRequest, LogResponse, LogConfig };
