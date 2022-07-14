export interface UsersInterface{
    email: string;
    first_name: string;
    last_name: string;
    id?: number;
    is_active: number;
    last_login?: Date;
    password?:string;
    roles?:any;
    is_cgiar?: boolean;
  }