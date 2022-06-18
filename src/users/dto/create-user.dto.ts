import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

	@IsNotEmpty()
	@IsEmail()
	email: string

	@IsNotEmpty()
	username: string

	@IsNotEmpty()
	password: string
}
