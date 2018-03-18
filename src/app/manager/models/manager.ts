import { CommonResponse } from '../../shared/models/user'

export class Manager {
    status: number;
    message: string;
    user_details: ManagerDetails;   
}

export class ManagerDetails {
    u_id: number;
    u_email: string;
    u_f_name: string;
    u_l_name: string;
    u_gender: string;
    u_phone: number;
}
