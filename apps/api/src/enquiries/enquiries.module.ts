import { Module } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { EnquiriesController } from './enquiries.controller';
import { EnquiriesService } from './enquiries.service';

@Module({
  controllers: [EnquiriesController],
  providers: [EnquiriesService, MailService],
})
export class EnquiriesModule {}
