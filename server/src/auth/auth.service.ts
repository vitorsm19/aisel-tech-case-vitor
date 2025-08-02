import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly users: User[] = [
    {
      id: '1',
      username: 'jayanka@aisel.co',
      password: bcrypt.hashSync('123', 10),
      role: Role.Admin,
    },
    {
      id: '2',
      username: 'vitor@aisel.co',
      password: bcrypt.hashSync('123', 10),
      role: Role.User,
    },
  ];

  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = this.users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
}