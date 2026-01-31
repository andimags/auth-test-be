import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get(':id')
    @UseGuards(JwtGuard)
    async findUser(@Param('id') id: number){
        const user = await this.userService.user({
            id: id
        })

        if(!user){
            throw new NotFoundException;
        }

        return user;
    }
}
