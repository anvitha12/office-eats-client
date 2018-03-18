import { Time } from "@angular/common";

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

