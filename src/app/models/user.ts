export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: 'student' | 'doctor' | 'admin';
}
