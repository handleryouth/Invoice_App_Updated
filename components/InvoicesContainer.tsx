import { useRouter } from "next/router";
import { InvoicesContainerProps } from "types";
import StatusBadge from "./StatusBadge";

const InvoicesContainer = ({
  invoice_id,
  invoice_due_date,
  bill_to,
  amount_due,
  status,
}: InvoicesContainerProps) => {
  const router = useRouter();
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-5 dark:bg-[#1e2139]  px-2 py-4 md:px-0 md:py-8 rounded-md dark:text-white text-[#888eb0] my-8 border-2 border-slate-400 dark:border-[#1e2139] hover:border-[#7c5dfa] dark:hover:border-[#7c5dfa] shadow-none transition-colors"
      onClick={() => {
        router.push(`/invoice/${invoice_id}`);
      }}
    >
      <div className="md:hidden flex flex-col justify-between">
        <p>#{invoice_id.slice(0, 6)}</p>

        <div className="mt-4">
          <p>{invoice_due_date}</p>
          <p className="mt-2">{amount_due}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center  items-center md:hidden justify-self-end ">
        <p className="mb-2">{bill_to}</p>
        <StatusBadge status={status} />
      </div>

      <p className="invoice-container-info">#{invoice_id.slice(0, 6)}</p>
      <p className="invoice-container-info">{invoice_due_date}</p>
      <p className="invoice-container-info">{amount_due}</p>
      <p className="invoice-container-info">
        <span
          className=" transition  duration-150 ease-in-out"
          data-bs-toggle="tooltip"
          title={bill_to}
        >
          {bill_to.length > 10 ? `${bill_to.slice(0, 10)}...` : bill_to}
        </span>
      </p>
      <StatusBadge
        status={status}
        custom_class="hidden md:flex items-center justify-center"
      />
    </div>
  );
};

export default InvoicesContainer;
