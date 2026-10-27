import { Injectable, Logger } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';

const LABELS: Record<string, string> = {
  name: 'Name', email: 'Email', phone: 'Phone', organisation: 'Organisation / institution', role: 'Role',
  jobTitle: 'Job title', institutionType: 'Institution type', country: 'Country', interest: 'Interest',
  interests: 'Products or services', users: 'Users or students', message: 'Message',
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

@Injectable()
export class EnquiriesService {
  private readonly log = new Logger(EnquiriesService.name);

  constructor(private readonly mail: MailService) {}

  async submit(dto: CreateEnquiryDto): Promise<void> {
    // Honeypot filled in: accept silently so bots learn nothing, but send nothing.
    if (dto.website) {
      this.log.warn(`Honeypot triggered (${dto.section}); submission discarded.`);
      return;
    }

    const rows = Object.entries(LABELS)
      .map(([k, label]) => {
        const v = dto[k as keyof CreateEnquiryDto];
        const text = Array.isArray(v) ? v.join(', ') : v;
        return text ? [label, String(text)] : null;
      })
      .filter((r): r is [string, string] => r !== null);

    const kind = dto.requestType === 'Demo request' ? 'Demo request' : 'Website enquiry';
    const subject = `[${dto.section}] ${kind} from ${dto.name}${dto.organisation ? `, ${dto.organisation}` : ''}`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
    const html = `<h2 style="font-family:Arial,sans-serif;color:#5D2E8E">${esc(kind)} · ${esc(dto.section)}</h2>
<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#5C4C66;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
      .join('')}</table>`;

    await this.mail.send({ subject, text, html, replyTo: dto.email });
    this.log.log(`Enquiry received: ${subject}`);
  }
}
