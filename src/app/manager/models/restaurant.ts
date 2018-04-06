export class Restaurant {
    restaurant_id: number;
    restaurant_name: string;
    isSelected: boolean;
}

export class GetRestaurantsResponse {
    status: number;
    message: string;
    restaurants_details: Restaurant[];
}
