export const checkFileType = (req: any, file: any, cb: any) => {
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
  cb(null, file.originalname);
};
