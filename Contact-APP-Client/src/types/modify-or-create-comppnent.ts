export type Params = {
  id: string;
};

export interface IModifyOrCreateContact {
  id: number;
  name: string;
  pictureFile?: string | ArrayBuffer | null;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
}