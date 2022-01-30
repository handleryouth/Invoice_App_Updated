import axios from "axios";

export const resolvers = {
  Query: {
    getInvoices: async () => {
      try {
        const invoices = await axios
          .get("/api/invoice")
          .then((res) => res.data);
        return invoices;
      } catch (error) {
        throw error;
      }
    },
    getSpecificInvoice: async (_parent: any, args: any) => {
      try {
        const specificInvoice = await axios
          .get("/api/invoice", {
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
          .post("/api/invoice", args.input)
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
          url: "/api/invoice",
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
          url: "/api/invoice",
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
          url: "/api/invoice",
          params: { id: args.id },
        });
        return "Success";
      } catch (error) {
        throw error;
      }
    },
  },
};
