import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { type Transporter } from 'nodemailer';

export interface Mail { subject: string; text: string; html: string; replyTo?: string }

/**
 * Sends enquiry emails over SMTP. Without SMTP_HOST (local development)
 * the message is printed to the console instead.
 */
@Injectable()
export class MailService {
  private readonly log = new Logger(MailService.name);
  private readonly transport: Transporter | null;
  private readonly to: string;
  private readonly from: string;

  constructor(config: ConfigService) {
    const host = config.get<string>('SMTP_HOST');
    this.to = config.get<string>('MAIL_TO') ?? 'info@my-potentia.com';
    this.from = config.get<string>('MAIL_FROM') ?? 'Potentia Website <no-reply@my-potentia.com>';
    this.transport = host
      ? nodemailer.createTransport({
          host,
          port: Number(config.get('SMTP_PORT') ?? 587),
          secure: String(config.get('SMTP_SECURE') ?? 'false') === 'true',
          auth: config.get('SMTP_USER') ? { user: config.get<string>('SMTP_USER'), pass: config.get<string>('SMTP_PASS') } : undefined,
        })
      : null;
    if (!host) this.log.warn('SMTP_HOST is not set: enquiries will be logged, not emailed.');
  }

  async send(mail: Mail): Promise<void> {
    if (!this.transport) {
      this.log.log(`\n--- Enquiry (dev mode, not emailed) ---\nTo: ${this.to}\nSubject: ${mail.subject}\n${mail.text}\n---`);
      return;
    }
    try {
      await this.transport.sendMail({ from: this.from, to: this.to, replyTo: mail.replyTo, subject: mail.subject, text: mail.text, html: mail.html });
    } catch (err) {
      this.log.error(`Email delivery failed: ${(err as Error).message}`);
      throw new ServiceUnavailableException('We could not send your enquiry right now.');
    }
  }
}
