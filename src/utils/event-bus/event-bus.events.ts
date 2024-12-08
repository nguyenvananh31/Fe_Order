import EventBus from './event-bus';
import { BaseEventPayload, EventBusName } from './event-bus.types';

export const showSideOder = (isOpen: boolean, orderId: number) => {
  EventBus.getInstance().post<BaseEventPayload<{ isOpen: boolean, orderId: number }>>({
    type: EventBusName.ON_SHOW_SiDE_ORDER,
    payload: {
      isOpen,
      orderId
    }
  });
};

export const showManageOrder = (isOpen: boolean) => {
  EventBus.getInstance().post<any>({
    type: EventBusName.ON_SHOW_MANAGE_ORDER,
    payload: isOpen
  });
}

export const addProToTable = (item: any) => {
  EventBus.getInstance().post<BaseEventPayload<{ item: any }>>({
    type: EventBusName.ADD_PRO_TO_TABLE,
    payload: { item }
  });
}

export const handleLogout = () => {
  EventBus.getInstance().post<any>({
    type: EventBusName.LOGOUT_HANDLE
  })
}

export const logout = () => {
  EventBus.getInstance().post<any>({
    type: EventBusName.LOGOUT
  })
}

export const invalidToken = () => {
  EventBus.getInstance().post<any>({
    type: EventBusName.INVALID_TOKEN
  })
}