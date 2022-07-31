import { APIRoute } from 'next-s3-upload';

export default APIRoute.configure({
  async key(req, filename) {
    console.log(filename);
    return `${filename}`;
  },
});
