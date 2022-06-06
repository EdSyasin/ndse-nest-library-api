import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	public async transform(value: any, { metatype }: ArgumentMetadata) {
		if(!metatype || !ValidationPipe.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value); console.log(object)
		const errors = await validate(object);

		console.log(this.validationErrorsToObject(errors))

		if(errors.length > 0) {
			throw new BadRequestException({errors: this.validationErrorsToObject(errors)})
		}

		return value
	}

	private static toValidate(metatype: Function){
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

	private validationErrorsToObject (errors: ValidationError[]) {
		const result: {[field: string]: string[]} = {};
		errors.forEach(error => {
			result[error.property] = Object.values(error.constraints)
		})

		return result;
	}
}
