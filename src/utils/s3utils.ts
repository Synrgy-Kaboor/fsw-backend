import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY ?? '';
const AWS_SECRET_KEY =  process.env.AWS_SECRET_KEY ?? '';
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION ?? '';

export const s3utils = {
  getFileUrl: async (bucketName: string, fileName: string): Promise<string> => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
      },
      region: AWS_BUCKET_REGION
    });
  
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName
    });
  
    return await getSignedUrl(s3, command, { expiresIn: 3600 });
  },
  uploadFile: async (bucketName: string, fileName: string, buffer: Buffer, type: string): Promise<void> => {
    const s3 = new S3Client({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
      },
      region: AWS_BUCKET_REGION
    });
  
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: type
    });
  
    await s3.send(command);
  }
}