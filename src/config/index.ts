import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  defalt_student_pass: process.env.DEFAULT_STUDENT_PASS,
  defalt_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  defalt_admin_pass: process.env.DEFAULT_ADMIN_PASS,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
