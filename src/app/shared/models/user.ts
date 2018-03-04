export class User {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
}

export class CreateUserResponse {
  status: number;
  message: string;
}
