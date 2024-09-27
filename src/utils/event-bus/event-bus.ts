import { Subject } from 'rxjs';
import { BaseEvent } from './event-bus.types';

export default class EventBus {
    private static instance: EventBus;

    private eventSubject = new Subject();

    static getInstance(): EventBus {
        if (!EventBus.instance) {
            EventBus.instance = new EventBus();
        }
        return EventBus.instance;
    }

    get events(): any {
        return this.eventSubject.asObservable();
    }

    post<T extends BaseEvent>(event: T): void {
        this.eventSubject.next(event);
    }
}
