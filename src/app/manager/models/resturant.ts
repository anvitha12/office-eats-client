export class Resturant {
    restaurant_id: number;
    restaurant_name: string;
    isSelected: boolean;
}

export class GetResturantsResponse {
    status: number;
    message: string;
    restaurants_details: Resturant[];
}
