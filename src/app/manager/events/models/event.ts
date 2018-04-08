import { Time } from '@angular/common';

export class Event {
    meeting_title: string;
    date: Date;
    time: Time;
    venue: string;
    budget_details: number;
    splitevents: boolean;
    catering: boolean;
    individualorder: boolean;
    restaurant: string;
}

export class EventListResponse {
    status: number;
    message: string;
    events_list_details: EventInfo[];
}

export class EventInfo {
    event_id: number;
    event_title: string;
    event_budget: number;
    event_order_type: boolean;
    event_restaurant_ids: string;
    event_split_even: boolean;
    event_date: Date;
    event_time: Time;
    event_users: string;
    event_venue_location: string;
    manager_id: number;
    event_created_at: Date;
    event_updated_at: Date;
}
