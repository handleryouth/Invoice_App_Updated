import { gql } from "@apollo/client";

export const responseFragment = gql`
  fragment responseFragment on InvoiceBody {
    _id
    bill_to
    invoice_date
    invoice_description
    invoice_due_date
    sent_to
    amount_due
    payment_term
    receiver_address {
      city
      country
      street
      zip
    }
    sender_address {
      city
      country
      street
      zip
    }
    status
  }
`;

export const itemFragment = gql`
  fragment itemFragment on ItemProperties {
    item_name
    item_quantity
    item_price
    item_total
  }
`;

export const QUERY_GET_ALL_INVOICES = gql`
  query getAllInvoices {
    getInvoices {
      ...responseFragment
    }
  }
  ${responseFragment}
`;

export const QUERY_GET_SPECIFIC_INVOICE = gql`
  query specificInvoices($id: String!) {
    getSpecificInvoice(id: $id) {
      ...responseFragment
      items {
        ...itemFragment
      }
    }
  }
  ${responseFragment}
  ${itemFragment}
`;

export const CREATE_INVOICE = gql`
  mutation createInvoices($input: InvoiceInput!) {
    createInvoice(input: $input) {
      ...responseFragment
      items {
        ...itemFragment
      }
    }
  }
  ${responseFragment}
  ${itemFragment}
`;

export const UPDATE_INVOICE = gql`
  mutation EditInvoice($id: String!, $input: InvoiceInput!) {
    updateInvoice(id: $id, input: $input)
  }
`;

export const DELETE_INVOICE = gql`
  mutation DeleteInvoice($id: String!) {
    deleteInvoice(id: $id)
  }
`;

export const MARK_AS_PAID = gql`
  mutation markAsPaid($id: String!) {
    updatedStatus(id: $id)
  }
`;
