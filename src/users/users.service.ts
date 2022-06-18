import {BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserDto} from "./dto/user.dto";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./users.schema";
import {Connection, Document, Model} from "mongoose";
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

	constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
				@InjectConnection() private connection: Connection,
				private jwtService: JwtService
				) {}

	async registration(user: CreateUserDto) {
		const existedUser = await this.getUserByUsername(user.username)
		if (existedUser) {
			throw new BadRequestException({message: 'Пользователь существует'})
		}

		const hashedPassword = await bcrypt.hash(user.password, 5);
		const newUser = new this.UserModel({...user, password: hashedPassword})
		await newUser.save();
		return newUser
	}

	async login(user: UserDto) {
		const validatedUser = await this.validateUser(user);
		return this.generateToken(validatedUser);
	}

	async getUserByUsername(username: string) {
		return this.UserModel.findOne({username});
	}

	async validateUser(userDto: UserDto) {
		const user = await this.UserModel.findOne({ username: userDto.username });
		if (!user) {
			throw new HttpException({message: 'Пользователь не найден'}, HttpStatus.NOT_FOUND)
		}
		if (!(await bcrypt.compare(userDto.password, user.password))) {
			throw new HttpException({message: 'Неверный пароль'}, HttpStatus.UNAUTHORIZED)
		}
		return user
	}

	private generateToken(user: User & Document ) {
		const payload = {
			id: user.id,
			email: user.username
		}
		return {
			token: this.jwtService.sign(payload),
			refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' })
		}
	}

}
