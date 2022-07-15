import { Controller, Post } from '@nestjs/common';
import { ConvertService } from './convert.service';

@Controller('convert')
export class ConvertController {
  constructor(private readonly convertService: ConvertService) {}

  @Post('json-to-csv')
  async convertJsonToCsv() {
    return await this.convertService.convertToJson();
  }
}
