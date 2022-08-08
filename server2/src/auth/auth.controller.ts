import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    // signup(@Body() signupDto: SignupDto): Promise<AuthResponse> {
    // return this.authService.signup(signupDto);
    return this.authService.signup();
  }

  @Post('login')
  login() {
    // login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    // return this.authService.login(loginDto);
    return this.authService.login();
  }
}
