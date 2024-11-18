import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RouterMainModule } from './router/router.main.module';
import { Logger, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const env: string = configService.get<string>('app.env');
    const appName: string = configService.get<string>('app.name');
    const host: string = configService.get<string>('app.http.host');
    const port: number = configService.get<number>('app.http.port');
    const globalPrefix: string = configService.get<string>('app.globalPrefix');
    const versioning: boolean = configService.get<boolean>('app.versioning.on');
    const versioningPrefix: string = configService.get<string>('app.versioning.prefix');

    const logger = new Logger();

    if (versioning) {
        app.enableVersioning({
            type: VersioningType.URI,
            defaultVersion: VERSION_NEUTRAL,
            prefix: versioningPrefix,
        });
    }

    app.setGlobalPrefix(globalPrefix);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    const swaggerMainConfig = new DocumentBuilder()
        .setTitle(`${appName} (Main section)`)
        .setDescription('API documentation for Survey backend service of Personal+')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentMain = SwaggerModule.createDocument(app, swaggerMainConfig, {
        include: [RouterMainModule],
    });
    SwaggerModule.setup('api-docs/main', app, documentMain);

    await app.listen(port, host);

    logger.log(`==========================================================`);
    logger.log(`App Environment is ${env}`, 'NestApplication');
    logger.log(`App Language is ${configService.get<string>('app.language')}`, 'NestApplication');
    logger.log(`App Debug is ${configService.get<boolean>('app.debug')}`, 'NestApplication');
    logger.log(`App Versioning is ${versioning}`, 'NestApplication');
    logger.log(`Mongo Database Debug is ${configService.get<boolean>('mongoDB.debug')}`, 'NestApplication');

    logger.log(
        `Mongo Database running on ${configService.get<string>('mongoDB.host')}:${configService.get<string>(
            'mongoDB.port',
        )}/${configService.get<string>('mongoDB.name')}`,
        'NestApplication',
    );
    logger.log(`Server running on ${await app.getUrl()}`, 'NestApplication');

    logger.log(`==========================================================`);
}
bootstrap();
