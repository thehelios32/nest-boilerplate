import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from 'src/core/health/health.controller';
import { HealthModule } from 'src/core/health/health.module';

@Module({
    controllers: [HealthController],
    providers: [],
    exports: [],
    imports: [HealthModule, TerminusModule],
})
export class RouterCoreModule {}
