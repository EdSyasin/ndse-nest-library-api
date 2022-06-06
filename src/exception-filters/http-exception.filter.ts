import {ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus} from "@nestjs/common";
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		response
			.status(status || HttpStatus.I_AM_A_TEAPOT)
			.json({
				status: 'fail',
				code: status || HttpStatus.I_AM_A_TEAPOT,
				timestamp: new Date().toISOString(),
				data: exception.getResponse()
			})
	}
}
