import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private userService: UsersService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> | undefined {
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization;
			const token = authHeader.split(' ')[1];
			const userData = this.jwtService.verify(token);
			req.user = await this.userService.getById(userData.id);
			return true;
		} catch (e) {
			throw new UnauthorizedException({ message: 'Неавторизован' })
		}
	}

}
