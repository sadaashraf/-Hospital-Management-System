import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const isPasswordCorrect = password === user.password;
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
    };

    return {
      success: true,
      message: 'login successful',
      access_token: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}