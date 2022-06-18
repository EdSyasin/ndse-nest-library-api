import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { ValidationPipe } from "../pipes";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('api/users')
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Post('signup')
	@UsePipes(new ValidationPipe())
	signup (@Body() user: CreateUserDto) {
		return this.usersService.registration(user);
	}

	@Post('signin')
	@UsePipes(new ValidationPipe())
	signIn (@Body() user: UserDto) {
		return this.usersService.login(user);
	}

}
