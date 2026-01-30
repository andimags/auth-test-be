import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule],
    controllers: [AppController],
    providers: [
        AppService, 
        PrismaService,
    {
        provide: APP_PIPE,
        useClass: ValidationPipe,
    },],
})
export class AppModule {}
