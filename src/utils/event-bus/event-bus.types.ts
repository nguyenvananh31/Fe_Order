export interface BaseEvent {
  type: EventBusName;
}

export interface BaseEventPayload<Payload> {
  type: EventBusName;
  payload: Payload;
}

export enum EventBusName {
  ON_SHOW_SiDE_ORDER,
  SET_LOADING_APP,
  LOGOUT,
  INVALID_TOKEN,
  LOGOUT_HANDLE,
  ON_SHOW_MANAGE_ORDER,
  ADD_PRO_TO_TABLE
}
