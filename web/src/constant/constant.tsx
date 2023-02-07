export type ItemHistory = {
  itemHistoryId?: string;
  relationId?: string;
  relationName?: string;
  ownerType?: string;
  date?: string;
};

export type Item = {
  _id?: string;
  name?: string;
  model?: string;
  serialNumber?: string;
  itemHistory?: ItemHistory[];
  createdBy?: {username: string};
};

export type User = {
  _id?: string;
  username?: string;
  email?: string;
  itemsCreated?: Item[];
};

export type Employee = {
  _id?: string;
  name?: string;
  email?: string;
  position?: string;
  itemsInPossession?: any;
};

export type Store = {
  _id?: string;
  name?: string;
  location?: string;
};

export const successMsgCss = 'text-center font-medium text-green-600';
export const errorMsgCss = 'text-center font-medium text-red-500';
