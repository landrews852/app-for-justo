import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return "I'm signed up";
  }

  signup() {
    return "I'm logged in";
  }

  // login(loginDto: LoginDto): Promise<AuthResponse> {
  // return new Promise((resolve, reject) => {
  //     if (loginDto.email === '
  //         @nestjs/common' && loginDto.password === '123456') {
  //             resolve({
  //                 access_token: 'access_token',
  //                 expires_in: 'expires_in',
  //                 refresh_token: 'refresh_token',
  //                 scope: 'scope',
  //                 token_type: 'token_type',
  //                 user_id: 'user_id',
  //             });
  //         } else {
  //             reject('Invalid credentials');
  //         }
  // });
}
