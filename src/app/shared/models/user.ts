import { ObjResponse } from './common';

export class User {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  corporate_id: number;
}

export class CommonResponse {
  status: number;
  message: string;
}

export class AuthorizeResposne {
  token: string;
  id: number;
  obj_response: ObjResponse;
}

export class CreateUserResposne {
  token: string;
  id: number;
  obj_response: ObjResponse;
}
