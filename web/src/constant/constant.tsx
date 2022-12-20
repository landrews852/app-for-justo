export type Asset = {
  _id?: string;
  name?: string;
  model?: string;
  serialNumber?: string;
  // createdBy?: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  itemsCreated?: Asset[];
};

export type Employee = {
  _id?: string;
  name: string;
  model: string;
  serialNumber: string;
  createdBy: string;
};

export const successMsgCss = 'text-center font-medium text-green-600';
export const errorMsgCss = 'text-center font-medium text-red-500';
