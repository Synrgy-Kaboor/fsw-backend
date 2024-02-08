import dotenv from 'dotenv';
import { join } from 'path';
import logger from 'utils/logger';

export interface receipentEmail {
  Name: string;
  Email: string;
}

dotenv.config({ path: join(__dirname, '..', '..', '.env') });
const SendMailJet = async (
  receipentEmail: receipentEmail[],
  message: string,
): Promise<string | undefined> => {
  try {
    const bodyMessage = {
      From: {
        Email: `${process.env.MAILJET_BINAR_KABOOR}`,
        Name: 'Kaboor',
      },
      To: receipentEmail,
      Subject: 'Email From Kaboor',
      TextPart: message,
      HTMLPart: `<p>${message}</p>`,
    };
    const encode = Buffer.from(
      `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`,
    ).toString('base64');
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encode}`,
      },
      body: JSON.stringify({ Messages: [bodyMessage] }),
    });
    const error = await response.json()
    const data = response.status;
    if (data !== 200) {
      logger.info(error)
    }
    return 'sended';
  } catch (error) {
    logger.info(error)
  }
};

export { SendMailJet };
