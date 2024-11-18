import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerOptions } from 'winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { DEBUGGER_NAME } from '../constants/debugger.constant';

@Injectable()
export class DebuggerOptionService {
    private readonly debug: boolean;
    private readonly logger: boolean;
    private readonly maxSize: string;
    private readonly maxFiles: string;

    constructor(private configService: ConfigService) {
        this.debug = this.configService.get<boolean>('debugger.enabled');
        this.logger = this.configService.get<boolean>('debugger.system.active');
        this.maxSize = this.configService.get<string>('debugger.system.maxSize');
        this.maxFiles = this.configService.get<string>('debugger.system.maxFiles');
    }

    createLogger(): LoggerOptions {
        const transports = [];

        transports.push(
            new winston.transports.DailyRotateFile({
                filename: `%DATE%.log`,
                dirname: `logs/${DEBUGGER_NAME}/error`,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: this.maxSize,
                maxFiles: this.maxFiles,
                level: 'error',
            }),
        );
        transports.push(
            new winston.transports.DailyRotateFile({
                filename: `%DATE%.log`,
                dirname: `logs/${DEBUGGER_NAME}/default`,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: this.maxSize,
                maxFiles: this.maxFiles,
                level: 'info',
            }),
        );
        transports.push(
            new winston.transports.DailyRotateFile({
                filename: `%DATE%.log`,
                dirname: `logs/${DEBUGGER_NAME}/debug`,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: this.maxSize,
                maxFiles: this.maxFiles,
                level: 'debug',
            }),
        );
        if (this.debug || this.logger) {
            transports.push(new winston.transports.Console());
        }

        const loggerOptions: LoggerOptions = {
            format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
            transports,
        };
        return loggerOptions;
    }
}
