import { Module } from '@nestjs/common';
import { TypeOrmOptionsService } from './services/typeorm-database.options.service';

@Module({
    imports: [],
    providers: [TypeOrmOptionsService],
    exports: [TypeOrmOptionsService],
})
export class TypeormDatabaseModule {}
