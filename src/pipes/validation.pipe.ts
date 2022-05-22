import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	public async transform(value: any, { metatype }: ArgumentMetadata) {
		if(!metatype || !ValidationPipe.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object);

		if(errors.length > 0) {
			throw new BadRequestException('validation failed')
		}

		return value
	}

	private static toValidate(metatype: Function){
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
