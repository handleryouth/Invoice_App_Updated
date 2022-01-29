import { Modal, Portal } from "components";
import { format } from "date-fns";
import { ResponseData } from "types";

const DetailBody = ({
  amount_due,
  bill_to,
  invoice_date,
  invoice_description,
  invoice_due_date,
  items,
  receiver_address,
  sender_address,
  sent_to,
  _id,
}: Omit<ResponseData, "status">) => {
  return (
    <>
      <div className="text-white p-4sm:p-8 text-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between my-8 ">
          <div>
            <p className="mb-2">#{_id.slice(0, 6)}</p>
            <p>{invoice_description || "-"}</p>
          </div>

          <div className="mt-8 sm:mt-0">
            <p className="mb-2">{sender_address.street || "-"}</p>
            <p className="mb-2">{sender_address.city || "-"}</p>
            <p className="mb-2">{sender_address.zip || "-"}</p>
            <p>{sender_address.country || "-"}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 my-16">
          <div className="flex flex-col">
            <div className="mb-4">
              <p className="mb-2">Invoice Date</p>
              <p className="font-bold">
                {invoice_date
                  ? format(new Date(invoice_date), "dd-MM-yyyy")
                  : "-"}
              </p>
            </div>

            <div className="mt-4">
              <p className="mb-2">Payment Due</p>
              <p className="font-bold ">
                {invoice_due_date
                  ? format(new Date(invoice_due_date), "dd-MM-yyyy")
                  : "-"}
              </p>
            </div>
          </div>

          <div>
            <p>Bill to</p>
            <p className="font-bold my-4 text-xl">{bill_to}</p>
            <p className="mb-1">{receiver_address.street || "-"}</p>
            <p className="mb-1">{receiver_address.city || "-"}</p>
            <p className="mb-1">{receiver_address.zip || "-"}</p>
            <p className="mb-1">{receiver_address.country || "-"}</p>
          </div>

          <div>
            <p>Sent To</p>
            <p className="font-bold mt-2 text-xl">{sent_to || "-"}</p>
          </div>
        </div>

        <table className="w-full table-auto rounded-md overflow-hidden ">
          <thead className="bg-[#252945] h-20 ">
            <tr>
              <th className="text-center">Item Name</th>
              <th className="text-center">QTY.</th>
              <th className="text-center">Price</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="py-8 text-center">{item.item_name}</td>
                    <td className="text-center">{item.item_quantity}</td>
                    <td className="text-center">{item.item_price}</td>
                    <td className="text-center">{item.item_total}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-xl">
                  Nothing here.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot className="bg-black h-24">
            <tr>
              <td colSpan={3} className="text-center">
                Amount Due
              </td>
              <td className="text-center font-bold   text-2xl">{amount_due}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default DetailBody;
