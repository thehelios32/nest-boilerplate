import { Global, Module } from '@nestjs/common';
import { DebuggerOptionService } from './services/debugger.option.service';
import { DebuggerService } from './services/debugger.service';
import { ConfigModule } from '@nestjs/config';
import { debuggerConfig } from './config/debugger.config';

@Global()
@Module({
    imports: [ConfigModule.forFeature(debuggerConfig)],
    providers: [DebuggerOptionService, DebuggerService],
    exports: [DebuggerOptionService, DebuggerService],
})
export class DebuggerModule {}
