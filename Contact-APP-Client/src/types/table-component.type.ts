import { IModifyOrCreateContact } from "./modify-or-create-comppnent";

export interface Column {
  id: 'id' | 'name' | 'email' | 'address' | 'city' | 'country' | 'postalCode' | 'phoneNumber' | 'delete';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface TableComponentProps {
  data: IModifyOrCreateContact[]
}