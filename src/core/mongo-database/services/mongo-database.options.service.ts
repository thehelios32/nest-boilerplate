import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { MONGO_DATABASE_CONFIG_KEY } from '../constants/mongo-database.constant';
@Injectable()
export class MongoDatabaseOptionsService implements MongooseOptionsFactory {
    private readonly host: string;
    private readonly database: string;
    private readonly user: string;
    private readonly password: string;
    private readonly debug: boolean;
    private readonly options: string;

    constructor(private readonly configService: ConfigService) {
        this.host = this.configService.get<string>(`${MONGO_DATABASE_CONFIG_KEY}.host`);
        this.database = this.configService.get<string>(`${MONGO_DATABASE_CONFIG_KEY}.name`);
        this.user = this.configService.get<string>(`${MONGO_DATABASE_CONFIG_KEY}.user`);
        this.password = this.configService.get<string>(`${MONGO_DATABASE_CONFIG_KEY}.password`);
        this.debug = this.configService.get<boolean>(`${MONGO_DATABASE_CONFIG_KEY}.debug`);

        /* istanbul ignore next */
        this.options = this.configService.get<string>(`${MONGO_DATABASE_CONFIG_KEY}.options`)
            ? `?${this.configService.get<string>(`${MONGO_DATABASE_CONFIG_KEY}.options`)}`
            : '';
    }

    createMongooseOptions(): MongooseModuleOptions {
        let uri = `${this.host}`;

        if (this.database) {
            uri = `${uri}/${this.database}${this.options}`;
        }

        /* istanbul ignore next */
        mongoose.set('debug', this.debug);

        const mongooseOptions: MongooseModuleOptions = {
            uri,
            serverSelectionTimeoutMS: 5000,
        };

        /* istanbul ignore next */
        if (this.user && this.password) {
            mongooseOptions.auth = {
                username: this.user,
                password: this.password,
            };
        }

        return mongooseOptions;
    }
}
