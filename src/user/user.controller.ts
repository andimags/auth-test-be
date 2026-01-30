import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get(':id')
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
