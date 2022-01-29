import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/dbConnect";
import { InvoiceSchema } from "models";
import { Types } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const id = req.query.id as string;
        const invoice = id
          ? await InvoiceSchema.find({
              _id: new Types.ObjectId(id),
            })
          : await InvoiceSchema.find();
        res.status(200).json(invoice);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const invoice = await InvoiceSchema.create(req.body);
        res.status(201).json(invoice);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.body;
        const deletedInvoice = await InvoiceSchema.deleteOne({
          _id: new Types.ObjectId(id),
        });
        res.status(200).json(deletedInvoice);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PATCH":
      try {
        const id = req.query.id as string;
        const updatedInvoice = await InvoiceSchema.updateOne(
          { _id: new Types.ObjectId(id) },
          { $set: req.body }
        );
        res.status(200).json(updatedInvoice);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const id = req.query.id as string;
        const updatedInvoiceStatus = await InvoiceSchema.updateOne(
          {
            _id: new Types.ObjectId(id),
          },
          { $set: { status: "Paid" } }
        );
        res.status(200).json(updatedInvoiceStatus);
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
