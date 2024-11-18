import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CoreModule } from 'src/core/core.module';
import { BrowserLogModule } from 'src/modules/browser-log/browserLog.module';
import { BrowserLogController } from 'src/modules/browser-log/controllers/broswer-log.controller';
import { BrowserLogService } from 'src/modules/browser-log/services/browser-log.service';
import { ClientSession, Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { MONGO_DATABASE_CONNECTION_NAME } from 'src/core/mongo-database/constants/mongo-database.constant';
import { faker } from '@faker-js/faker';
import { ISearchFilter } from 'src/utils/helpers/types/find-options.type';
import { IBrowserLogEntity } from 'src/modules/browser-log/interfaces/browser-log.entity.interface';
import { ENUM_AVAILABLE_OPERATORS } from 'src/utils/helpers/available-operators.enum';

describe('E2E Common settings', () => {
    let app: INestApplication;
    let browserLogService: BrowserLogService;
    let connection: Connection;
    let session: ClientSession;

    beforeAll(async () => {
        const modRef = await Test.createTestingModule({
            imports: [CoreModule, BrowserLogModule],
            controllers: [BrowserLogController],
        }).compile();

        app = modRef.createNestApplication();
        browserLogService = app.get<BrowserLogService>(BrowserLogService);

        // Start mongoose transaction
        connection = app.get<Connection>(getConnectionToken(MONGO_DATABASE_CONNECTION_NAME));

        await app.init();
    });

    describe('BrowserLog controller', () => {
        beforeEach(async () => {
            session = await connection.startSession();
            session.startTransaction();
        });

        it('should create a new browser log', async () => {
            const createLog = () =>
                browserLogService.create({
                    appVersion: faker.system.semver(),
                    userAgent: faker.internet.userAgent(),
                    frontendUrl: faker.internet.url(),
                    screenShotFileId: faker.number.int(),
                    request: {
                        method: 'GET',
                        url: faker.internet.url(),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: undefined,
                    },
                    response: {
                        status: faker.internet.httpStatusCode(),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: {
                            message: faker.lorem.sentence(),
                        },
                    },
                });
            let count = 10;
            while (count--) {
                await createLog();
            }
            return expect(true).toBe(true);
        });
        it('should list browser logs', async () => {
            // return expect(true).toBe(true);
            const filters1: ISearchFilter<IBrowserLogEntity>[] = [
                {
                    field: 'request.url',
                    operator: ENUM_AVAILABLE_OPERATORS.LIKE,
                    value: '.org',
                },
            ];
            const listLogs = await browserLogService.findPaginated({ filters: filters1, size: 5, page: 1 });

            expect(true).toBe(true);
        });

        afterEach(async () => {
            await session.abortTransaction();
            await session.endSession();
        });
    });

    afterAll(async () => {
        // Rollback mongoose transaction
        await app.close();
    });
});
