export class GetCorporatesResponse {
  status: number;
  message: string;
  corporate_info_details: Corporate[];
}

export class Corporate {
  corporate_id: number;
  corporate_name: string;
}
