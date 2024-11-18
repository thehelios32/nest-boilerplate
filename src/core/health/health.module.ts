import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmOptionsService } from '../typeorm-database/services/typeorm-database.options.service';

@Module({
    controllers: [],
    imports: [TerminusModule],
    providers: [TypeOrmOptionsService],
})
export class HealthModule {}
