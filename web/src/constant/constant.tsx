export type History = {
  _id?: string;
  item?: {_id?: string; name: string};
  relationName?: string;
  relationId?: string;
  ownerType?: string;
  date?: string;
};

export type Item = {
  _id?: string;
  name?: string;
  model?: string;
  serialNumber?: string;
  itemHistory?: History[];
  createdBy?: {username: string};
};

export type User = {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  itemsCreated?: Item[];
};

export type Employee = {
  _id?: string;
  email?: string;
  name?: string;
  position?: string;
  employeeHistory?: History[];
};

export type Store = {
  _id?: string;
  name?: string;
  location?: string;
  storeHistory?: History[];
};

export const successMsgCss = 'text-center font-medium text-green-600';
export const errorMsgCss = 'text-center font-medium text-red-500';
