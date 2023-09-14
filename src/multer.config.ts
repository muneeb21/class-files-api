import { diskStorage } from 'multer';
import { extname } from 'path';

export const MulterConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      console.log(req.body);
      console.log('helloo', __dirname);
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return callback(null, `${Date.now()}-${extname(file.originalname)}`);
    },
  }),
};
