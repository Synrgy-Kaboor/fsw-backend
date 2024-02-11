import multer from 'multer';
import { extname } from 'path';
import NoFileReceivedException from '@exceptions/NoFileReceivedException';

const storage = multer.memoryStorage();

export const profileImageUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      cb(new NoFileReceivedException());
      return;
    }
    cb(null, true);
  },
});

export const paymentFileUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.pdf') {
      cb(new NoFileReceivedException());
      return;
    }
    cb(null, true);
  },
});

