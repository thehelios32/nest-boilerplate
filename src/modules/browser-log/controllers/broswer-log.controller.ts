import { Body, Controller, Param, Post } from '@nestjs/common';
import { BrowserLogService } from '../services/browser-log.service';
import { DefaultSearchPayloadDto } from 'src/utils/helpers/dto/default-search-payload.dto';
import { BrowserLogDto } from '../dtos/browser-log.dto';
import { IBrowserLogEntity } from '../interfaces/browser-log.entity.interface';
import { DecoratedPostResponse } from 'src/core/response/decorators/post-response.decorator';

@Controller({
    path: 'browser-log',
    version: '1',
})
export class BrowserLogController {
    constructor(private readonly browserLogService: BrowserLogService) {}

    @Post('list')
    @DecoratedPostResponse('browser-log.list')
    async list(@Body() paginationPayload: DefaultSearchPayloadDto<IBrowserLogEntity>) {
        return this.browserLogService.findPaginated(paginationPayload);
    }

    @Post('create')
    async create(@Body() browserLogDocument: BrowserLogDto) {
        return this.browserLogService.create(browserLogDocument);
    }

    @Post('delete/:id')
    async delete(@Param('id') id: string) {
        return this.browserLogService.deleteOne({ _id: id });
    }
}
