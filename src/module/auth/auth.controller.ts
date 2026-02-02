import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(
    @Body() body: { email: string; password: string }, LoginDto: LoginDto,
  ) {
    return this.authService.login(body.email, body.password);
  }

}
