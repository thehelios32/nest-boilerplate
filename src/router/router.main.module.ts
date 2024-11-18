import { Module } from '@nestjs/common';
import { BrowserLogModule } from 'src/modules/browser-log/browserLog.module';
import { BrowserLogController } from 'src/modules/browser-log/controllers/broswer-log.controller';

@Module({
    controllers: [BrowserLogController],
    providers: [],
    exports: [],
    imports: [BrowserLogModule],
})
export class RouterMainModule {}
