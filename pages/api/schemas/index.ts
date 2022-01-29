import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Address {
    street: String
    city: String
    zip: String
    country: String
  }

  type ItemProperties {
    item_name: String
    item_quantity: Int
    item_price: Float
    item_total: Float
  }

  type InvoiceBody {
    _id: String
    invoice_date: String
    invoice_description: String
    invoice_due_date: String
    payment_term: String
    bill_to: String
    sent_to: String
    sender_address: Address
    receiver_address: Address
    items: [ItemProperties]
    amount_due: Float
    status: String
  }

  input InputAddress {
    street: String
    city: String
    zip: String
    country: String
  }

  type DeleteResponse {
    deletedCount: Int
  }

  input InputItemProperties {
    item_name: String
    item_quantity: Int
    item_price: Float
    item_total: Float
  }

  input InvoiceInput {
    _id: String
    invoice_date: String
    invoice_description: String
    invoice_due_date: String
    payment_term: String
    bill_to: String
    sent_to: String
    sender_address: InputAddress
    receiver_address: InputAddress
    items: [InputItemProperties!]
    amount_due: Float
    status: Status
  }

  enum Status {
    Paid
    Pending
    Draft
  }

  type Query {
    getInvoices: [InvoiceBody]
    getSpecificInvoice(id: String!): [InvoiceBody]
  }

  type Mutation {
    createInvoice(input: InvoiceInput!): InvoiceBody
    deleteInvoice(id: String!): String
    updateInvoice(id: String!, input: InvoiceInput!): String
    updatedStatus(id: String!): String
  }
`;
