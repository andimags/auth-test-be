import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { parse } from 'pg-connection-string';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const url = process.env.DATABASE_URL;
        if (!url) throw new Error('DATABASE_URL is not defined!');

        // Parse the URL into components
        const config = parse(url);

        const adapter = new PrismaPg({
            user: config.user,
            password: config.password,
            host: config.host,
            database: config.database,
            port: config.port ? Number.parseInt(config.port) : 5432,
        });

        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
