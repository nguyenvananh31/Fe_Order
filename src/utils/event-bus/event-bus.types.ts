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
}
