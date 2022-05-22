import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable, catchError } from "rxjs";
import { ResponseStatuses } from "../enums";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next
			.handle()
			.pipe(map(data => {
				return {
					status: ResponseStatuses.Success,
					data
				}
			}),
				catchError(data => {
					throw new BadRequestException({
						status: ResponseStatuses.Fail,
						data: data.message
					})
				}))
	}
}
