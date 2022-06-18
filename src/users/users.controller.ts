import {Body, Controller, Get, Post, Req, UseGuards, UsePipes} from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserDto } from "./dto/user.dto";
import { ValidationPipe } from "../pipes";
import { CreateUserDto } from "./dto/create-user.dto";
import {JwtAuthGuard} from "../guards/jwt-auth.guard";
import {Request} from "express";

@Controller('api/users')
export class UsersController {

	constructor(private usersService: UsersService) {}

	@Get('user')
	@UseGuards(JwtAuthGuard)
	getUser(@Req() req: Request) {
		return req.user
	}

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
