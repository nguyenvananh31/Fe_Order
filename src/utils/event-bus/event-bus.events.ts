import EventBus from './event-bus';
import { BaseEventPayload, EventBusName } from './event-bus.types';


export const showSideOder = (isOpen: boolean, orderId: number) => {
  EventBus.getInstance().post<BaseEventPayload<{isOpen: boolean, orderId: number}>>({
    type: EventBusName.ON_SHOW_SiDE_ORDER,
    payload: {
      isOpen,
      orderId
    }
  });
};