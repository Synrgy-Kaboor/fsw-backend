import dotenv from 'dotenv';
import { join } from 'path';

export interface receipentEmail {
  Name: string;
  Email: string;
}

dotenv.config({ path: join(__dirname, '..', '..', '.env') });
const SendMailJet = async (
  fromEmail: string,
  receipentEmail: receipentEmail[],
  message: string,
) => {
  try {
    const bodyMessage = {
      From: {
        Email: fromEmail,
        Name: 'FinProBinar',
      },
      To: receipentEmail,
      Subject: 'Email From Kaboor',
      TextPart: message,
      HTMLPart: `<p>${message}</p>`,
    };
    const encode = Buffer.from(
      `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`,
    ).toString('base64');
    const responseSend = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${encode}`,
      },
      body: JSON.stringify({ Messages: [bodyMessage] }),
    });
    return responseSend;
  } catch (error) {
    console.log(error);
  }
};

export { SendMailJet };
