import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TYPEORM_DATA_SOURCE_CONFIG } from '../constants/typeorm-data-source.config.constant';

@Injectable()
export class TypeOrmOptionsService implements TypeOrmOptionsFactory {
    constructor() {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return TYPEORM_DATA_SOURCE_CONFIG as TypeOrmModuleOptions;
    }
}
