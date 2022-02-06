import { format } from "date-fns";
import { ResponseData } from "types";
import useTranslation from "next-translate/useTranslation";

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
  const { t } = useTranslation("common");
  return (
    <>
      <div className="dark:text-white p-4 sm:p-8 text-sm">
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
              <p className="mb-2">{t("INVOICE_DATE")}</p>
              <p className="font-bold">
                {invoice_date
                  ? format(new Date(invoice_date), "dd-MM-yyyy")
                  : "-"}
              </p>
            </div>

            <div className="mt-4">
              <p className="mb-2">{t("PAYMENT_DUE")}</p>
              <p className="font-bold ">
                {invoice_due_date
                  ? format(new Date(invoice_due_date), "dd-MM-yyyy")
                  : "-"}
              </p>
            </div>
          </div>

          <div>
            <p>{t("BILL_TO")}</p>
            <p className="font-bold my-4 text-xl">{bill_to}</p>
            <p className="mb-1">{receiver_address.street || "-"}</p>
            <p className="mb-1">{receiver_address.city || "-"}</p>
            <p className="mb-1">{receiver_address.zip || "-"}</p>
            <p className="mb-1">{receiver_address.country || "-"}</p>
          </div>

          <div>
            <p>{t("SENT_TO")}</p>
            <p className="font-bold mt-2 text-xl">{sent_to || "-"}</p>
          </div>
        </div>

        <table className="w-full table-auto rounded-md overflow-hidden ">
          <thead className="dark:bg-[#252945] h-20 border-2 border-slate-400 dark:border-transparent ">
            <tr>
              <th className="text-center">{t("ITEM_NAME")}</th>
              <th className="text-center">{t("QUANTITY")}</th>
              <th className="text-center">{t("PRICE")}</th>
              <th className="text-center">{t("TOTAL")}</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="py-8 text-center">{item.item_name}</td>
                    <td className="text-center">{item.item_quantity}</td>
                    <td className="text-center">${item.item_price}</td>
                    <td className="text-center">${item.item_total}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-xl">
                  {t("NOTHING_TO_SHOW")}
                </td>
              </tr>
            )}
          </tbody>

          <tfoot className="dark:bg-black h-24 border-2 border-slate-400 dark:border-transparent">
            <tr>
              <td colSpan={3} className="text-center">
                {t("AMOUNT_DUE")}
              </td>
              <td className="text-center font-bold   text-xl sm:text-2xl">
                ${amount_due}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default DetailBody;
