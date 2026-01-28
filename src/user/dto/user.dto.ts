import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    password: string;
}
