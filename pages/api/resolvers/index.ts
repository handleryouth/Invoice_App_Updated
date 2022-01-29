import axios from "axios";

export const resolvers = {
  Query: {
    getInvoices: async () => {
      try {
        const invoices = await axios
          .get("http://localhost:3000/api/invoice")
          .then((res) => res.data);
        return invoices;
      } catch (error) {
        throw error;
      }
    },
    getSpecificInvoice: async (_parent: any, args: any) => {
      try {
        const specificInvoice = await axios
          .get("http://localhost:3000/api/invoice", {
            params: { id: args.id },
          })
          .then((res) => res.data);
        return specificInvoice;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createInvoice: (_parent: any, args: any) => {
      try {
        const newInvoice = axios
          .post("http://localhost:3000/api/invoice", args.input)
          .then((res) => res.data);
        return newInvoice;
      } catch (error) {
        throw error;
      }
    },
    deleteInvoice: (_parent: any, args: any) => {
      try {
        const deleteInvoice = axios({
          method: "DELETE",
          url: "http://localhost:3000/api/invoice",
          data: { id: args.id },
        });
        return "Success";
      } catch (error) {
        throw error;
      }
    },
    updateInvoice: (_parent: any, args: any) => {
      try {
        const updateInvoice = axios({
          method: "PATCH",
          url: "http://localhost:3000/api/invoice",
          params: { id: args.id },
          data: args.input,
        });
        return "Success";
      } catch (error) {
        throw error;
      }
    },
    updatedStatus: (_parent: any, args: any) => {
      try {
        const updateStatus = axios({
          method: "PUT",
          url: "http://localhost:3000/api/invoice",
          params: { id: args.id },
        });
        return "Success";
      } catch (error) {
        throw error;
      }
    },
  },
};