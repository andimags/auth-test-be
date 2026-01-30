import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get(':id')
    @UseGuards(AuthGuard)
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
