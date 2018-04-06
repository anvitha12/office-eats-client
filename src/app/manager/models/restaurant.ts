export class Restaurant {
    restaurant_id: number;
    restaurant_name: string;
    checked: boolean;
}

export class GetRestaurantsResponse {
    status: number;
    message: string;
    restaurants_details: Restaurant[];
}
