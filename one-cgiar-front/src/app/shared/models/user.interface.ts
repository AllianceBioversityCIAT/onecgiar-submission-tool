export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface User {
  email: string;
  password: string;
  token: string;
  name: string;
  id: number;
  role: Roles;
}

export interface ServerResponse extends User {
  title: string,
  response: any
}

// ServerResponse extends User {
//   message: string;
//   token: string;
//   userId: number;
//   role: Roles;
// }
