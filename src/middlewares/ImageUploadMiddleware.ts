import multer from 'multer';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';
import NoFileReceivedException from '@exceptions/NoFileReceivedException';

export const carImageUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, join(__dirname, '..', '..', 'storage', 'cars'));
    },
    filename: (req, file, cb) => {
      cb(null, randomUUID() + extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      cb(new NoFileReceivedException());
      return;
    }
    cb(null, true);
  },
});
