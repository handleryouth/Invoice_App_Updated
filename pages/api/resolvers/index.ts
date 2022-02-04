import { InvoiceSchema } from "models";
import { Types } from "mongoose";
import dbConnect from "lib/dbConnect";

export const resolvers = {
  Query: {
    getInvoices: async () => {
      try {
        await dbConnect();
        const invoices = await InvoiceSchema.find();
        return invoices;
      } catch (error) {
        throw error;
      }
    },
    getSpecificInvoice: async (_parent: any, args: any) => {
      try {
        await dbConnect();
        const specificInvoice = await InvoiceSchema.find({
          _id: new Types.ObjectId(args.id),
        });
        return specificInvoice;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createInvoice: async (_parent: any, args: any) => {
      try {
        await dbConnect();
        const newInvoice = await InvoiceSchema.create(args.input);
        return newInvoice;
      } catch (error) {
        throw error;
      }
    },
    deleteInvoice: async (_parent: any, args: any) => {
      try {
        await dbConnect();
        await InvoiceSchema.deleteOne({
          _id: new Types.ObjectId(args.id),
        });
        return "Success";
      } catch (error) {
        throw error;
      }
    },
    updateInvoice: async (_parent: any, args: any) => {
      try {
        await dbConnect();
        await InvoiceSchema.updateOne(
          { _id: new Types.ObjectId(args.id) },
          { $set: args.input }
        );
        return "Success";
      } catch (error) {
        throw error;
      }
    },
    updatedStatus: async (_parent: any, args: any) => {
      try {
        await dbConnect();
        await InvoiceSchema.updateOne(
          {
            _id: new Types.ObjectId(args.id),
          },
          { $set: { status: "Paid" } }
        );
        return "Success";
      } catch (error) {
        throw error;
      }
    },
  },
};
