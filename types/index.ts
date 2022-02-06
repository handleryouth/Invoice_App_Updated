export interface ItemProperties {
  item_name: string;
  item_quantity: number;
  item_price: number;
  item_total: number;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface ResponseData {
  _id: string;
  invoice_date: string;
  invoice_description: string;
  invoice_due_date: string;
  payment_term: string;
  bill_to: string;
  sent_to: string;
  sender_address: Address;
  receiver_address: Address;
  items: ItemProperties[];
  amount_due: number;
  status: "Paid" | "Pending" | "Draft";
}

export interface StatusBadgeProps {
  status: "Paid" | "Pending" | "Draft";
  custom_class?: string;
}

export interface InvoicesContainerProps {
  invoice_id: string;
  invoice_due_date: string;
  bill_to: string;
  amount_due: number;
  status: "Paid" | "Pending" | "Draft";
}

export interface InputProps {
  label?: string;
  defaultValue?: string;
  placeholder: string;
  type?: string;
  value?: string;
  className?: string;
  toggleFunction?: (value: string) => void;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label?: string;
  option: DropdownOption[];
  value?: string;
  toggleFunction: (value: string) => void;
  className?: string;
}

export type CheckTotalParams = (
  index: number,
  type: "item_price" | "item_quantity",
  value: number
) => void;

export interface DetailHeaderProps {
  status: "Paid" | "Pending" | "Draft";
  id: string;
}

export interface InvoiceTitleProps {
  itemLength: number;
}

export interface FormContainerProps extends Omit<ResponseData, "status"> {
  edit: Boolean;
}
