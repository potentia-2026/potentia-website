import { EnquiriesService } from './enquiries.service';
import type { MailService } from '../mail/mail.service';

describe('EnquiriesService', () => {
  const send = jest.fn().mockResolvedValue(undefined);
  const service = new EnquiriesService({ send } as unknown as MailService);

  beforeEach(() => send.mockClear());

  it('puts the section in the subject and sets reply-to', async () => {
    await service.submit({ section: 'Banking & Fintech', name: 'Aisha', email: 'aisha@bank.qa', organisation: 'Gulf Bank', interests: ['Payments', 'Card Switch'] });
    expect(send).toHaveBeenCalledTimes(1);
    const mail = send.mock.calls[0][0];
    expect(mail.subject).toBe('[Banking & Fintech] Website enquiry from Aisha, Gulf Bank');
    expect(mail.replyTo).toBe('aisha@bank.qa');
    expect(mail.text).toContain('Products or services: Payments, Card Switch');
  });

  it('drops honeypot submissions without emailing', async () => {
    await service.submit({ section: 'General enquiry', name: 'Bot', email: 'bot@spam.io', website: 'http://spam' });
    expect(send).not.toHaveBeenCalled();
  });

  it('escapes HTML in the email body', async () => {
    await service.submit({ section: 'General enquiry', name: 'Sam', email: 's@x.qa', message: '<script>x</script>' });
    expect(send.mock.calls[0][0].html).not.toContain('<script>');
  });
});
