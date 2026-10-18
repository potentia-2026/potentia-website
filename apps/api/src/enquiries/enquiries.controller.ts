import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiriesService } from './enquiries.service';

@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiries: EnquiriesService) {}

  @Post()
  @HttpCode(202)
  async create(@Body() dto: CreateEnquiryDto) {
    await this.enquiries.submit(dto);
    return { status: 'received' };
  }
}
