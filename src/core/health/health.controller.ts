import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { MemoryHealthIndicator, MongooseHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus/dist/health-indicator';
import { IResponse } from 'src/core/response/response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller({ path: 'health' })
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly typeOrmDatabaseIndicator: TypeOrmHealthIndicator,
        private readonly mongooseDatabaseIndicator: MongooseHealthIndicator,
        private readonly memoryHealthIndicator: MemoryHealthIndicator,
    ) {}

    @HealthCheck()
    @Get('/all')
    async checkAll(): Promise<IResponse> {
        return this.health.check([
            () => this.mongooseDatabaseIndicator.pingCheck('mongoDB'),
            () => this.typeOrmDatabaseIndicator.pingCheck('typeormDB'),
            () => this.memoryHealthIndicator.checkHeap('memoryHeap', 300 * 1024 * 1024),
            () => this.memoryHealthIndicator.checkRSS('memoryRss', 300 * 1024 * 1024),
        ]);
    }

    @HealthCheck()
    @Get('/database-typeorm')
    async checkTypeOrmDB(): Promise<IResponse> {
        return this.health.check([() => this.typeOrmDatabaseIndicator.pingCheck('typeormDB')]);
    }

    @HealthCheck()
    @Get('/database-mongodb')
    async checkMongoDB(): Promise<IResponse> {
        return this.health.check([() => this.mongooseDatabaseIndicator.pingCheck('mongoDB')]);
    }

    @HealthCheck()
    @Get('/memory-heap')
    async checkMemoryHeap(): Promise<IResponse> {
        return this.health.check([() => this.memoryHealthIndicator.checkHeap('memoryHeap', 300 * 1024 * 1024)]);
    }

    @HealthCheck()
    @Get('/memory-rss')
    async checkMemoryRss(): Promise<IResponse> {
        return this.health.check([() => this.memoryHealthIndicator.checkRSS('memoryRss', 300 * 1024 * 1024)]);
    }
}
