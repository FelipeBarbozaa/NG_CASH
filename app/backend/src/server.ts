import app from './app';
import 'dotenv/config';

const server = app.listen(process.env.APP_PORT, () => console.log(
  `Server is running on PORT: ${process.env.APP_PORT}`,
));

export default server;