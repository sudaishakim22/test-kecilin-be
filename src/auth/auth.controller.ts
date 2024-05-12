import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    const token = await this.authService.signUp(signUpDto);

    const response = {
      message: 'Success Create User!',
      token: token,
    };
    return response;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);

    const response = {
      message: 'Success Login!',
      token: token,
    };
    return response;
  }
}
