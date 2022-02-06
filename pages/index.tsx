import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import {
  FormContainer,
  InvoicesContainer,
  InvoiceTitle,
  LoadingIndicator,
} from "components";
import { ResponseData } from "types";
import { QUERY_GET_ALL_INVOICES } from "utils";
import { RootState } from "features";
import useTranslation from "next-translate/useTranslation";

const Home: NextPage = () => {
  const { data, loading } = useQuery(QUERY_GET_ALL_INVOICES);
  const { t } = useTranslation("common");
  const [filteredItem, setFilteredItem] = useState<ResponseData[]>([]);

  const filterItem = useSelector((state: RootState) => state.filter);

  useEffect(() => {
    if (filterItem.length && data) {
      const result = (data.getInvoices as ResponseData[]).filter((item) => {
        return filterItem.includes(item.status);
      });
      setFilteredItem(result);
    } else if (data) {
      setFilteredItem(data.getInvoices);
    }
  }, [data, filterItem]);

  return (
    <>
      <FormContainer />
      <div className="min-h-full h-[100vh]">
        <InvoiceTitle
          itemLength={!data ? 0 : (data.getInvoices as ResponseData[]).length}
        />

        <div className={`px-4 ${loading && "h-screen flex-centering"}`}>
          {!loading ? (
            filterItem ? (
              filteredItem.map((invoice, index) => {
                return (
                  <InvoicesContainer
                    key={index}
                    amount_due={invoice.amount_due}
                    bill_to={invoice.bill_to}
                    invoice_due_date={
                      invoice.invoice_due_date
                        ? format(
                            new Date(invoice.invoice_due_date),
                            "MM/dd/yyyy"
                          )
                        : "-"
                    }
                    invoice_id={invoice._id}
                    status={invoice.status}
                  />
                );
              })
            ) : (
              <div className="h-screen flex-centering">
                <p>{t("NOTHING_TO_SHOW")}</p>
              </div>
            )
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
