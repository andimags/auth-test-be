import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
        constructor(
            private readonly prisma: PrismaService, 
            private readonly userService: UserService,
            private readonly jwtService: JwtService
        ) {}

        async login(dto: LoginDto){
            const user = await this.userService.user({
                email: dto.email
            })

            if(user && await compare(dto.password, user.password)){
                const { password: _password, ...result } = user;

                return {
                    user: result,
                    backendTokens: {
                        accessToken: await this.jwtService.signAsync(result, {
                            expiresIn: '20s',
                            secret: process.env.JWT_ACCESS_KEY
                        }),
                        refreshToken: await this.jwtService.signAsync(result, {
                            expiresIn: '7d',
                            secret: process.env.JWT_REFRESH_KEY
                        })
                    }
                }
            }

            throw new UnauthorizedException;
        }

        async refresh(dto: any){
            const { exp: _exp, iat: _iat, ...payload } = dto; // strip exp if it exists

            return {
                user: payload,
                backendTokens: {
                    accessToken: await this.jwtService.signAsync(payload, {
                        expiresIn: '20s',
                        secret: process.env.JWT_ACCESS_KEY
                    }),
                    refreshToken: await this.jwtService.signAsync(payload, {
                        expiresIn: '7d',
                        secret: process.env.JWT_REFRESH_KEY
                    })
                }
            }
        }
}
