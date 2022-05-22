import { IsNotEmpty } from "class-validator";

export default class CreateBookDto {
	@IsNotEmpty()
	readonly title: string

	readonly description?: string

	@IsNotEmpty()
	readonly author: string
}
