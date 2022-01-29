import { Schema, models, model } from "mongoose";
import { Address, ItemProperties, ResponseData } from "types";

const addressSchema = new Schema<Address>({
  street: String,
  city: String,
  zip: String,
  country: String,
});

const itemSchema = new Schema<ItemProperties>({
  item_name: String,
  item_quantity: Number,
  item_price: Number,
  item_total: Number,
});

const invoiceSchema = new Schema<ResponseData>({
  invoice_date: String,
  invoice_description: String,
  invoice_due_date: String,
  bill_to: String,
  sent_to: String,
  payment_term: String,
  sender_address: addressSchema,
  receiver_address: addressSchema,
  items: [itemSchema],
  amount_due: Number,
  status: String,
});

export default models.Invoice || model("Invoice", invoiceSchema);
