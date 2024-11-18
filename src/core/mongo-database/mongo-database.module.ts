import { Module } from '@nestjs/common';
import { MongoDatabaseOptionsService } from './services/mongo-database.options.service';
import { ConfigModule } from '@nestjs/config';
import { mongoDatabaseConfig } from './config/mongo-database.config';

@Module({
    imports: [ConfigModule.forFeature(mongoDatabaseConfig)],
    providers: [MongoDatabaseOptionsService],
    exports: [MongoDatabaseOptionsService],
})
export class MongoDatabaseModule {}
