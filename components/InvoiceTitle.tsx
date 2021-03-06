import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InvoiceTitleProps } from "types";
import { RootState } from "features";
import Image from "next/image";
import { toggleSidebarTrue } from "features/sidebar";
import { handleChangeFilter, handleRemoveFilter } from "features/filter";
import useTranslation from "next-translate/useTranslation";
import Checkbox from "./Checkbox";

const InvoiceTitle = ({ itemLength }: InvoiceTitleProps) => {
  const dispatch = useDispatch();
  const filterItem = useSelector((state: RootState) => state.filter);
  const { t } = useTranslation("common");
  const [filterDropdown, setFilterDropdown] = useState(false);

  const filterOption = useMemo(() => {
    return [{ value: "Draft" }, { value: "Paid" }, { value: "Pending" }];
  }, []);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center  px-4 ">
      <div>
        <h1 className="text-3xl mt-4 font-bold mb-3 text-center sm:text-left ">
          {t("INVOICE")}
        </h1>
        <p className="text-[#888eb0]">
          {t("INVOICE_TOTAL", { count: itemLength })}
        </p>
      </div>

      <div className="flex items-center justify-center flex-col sm:flex-row mt-4">
        <div className="relative">
          <div
            className="flex items-center px-4  cursor-pointer"
            onClick={() => {
              setFilterDropdown((prevState) => !prevState);
            }}
          >
            <p className="mr-4">{t("FILTER_BY_STATUS")}</p>
            <Image
              src="/assets/icon-arrow-down.svg"
              className={`${
                filterDropdown && "rotate-180"
              } transition-transform  duration-400`}
              alt="arrow down"
              width={14}
              height={10}
              layout="fixed"
            />
          </div>

          <div
            className={`flex flex-col absolute border-2 border-slate-500 bg-white dark:bg-[#252945]  w-full py-4 px-8  mt-4 rounded z-10 ${
              !filterDropdown && "hidden"
            } `}
          >
            {filterOption.map((filter, index) => (
              <Checkbox
                key={index}
                value={filter.value as "Draft" | "Paid" | "Pending"}
                toggleFunction={(value) =>
                  filterItem.includes(value)
                    ? dispatch(handleRemoveFilter(value))
                    : dispatch(handleChangeFilter(value))
                }
              />
            ))}
          </div>
        </div>

        <button
          className="bg-[#7c5dfa] flex items-center ml-4 mt-4  sm:mt-0 py-3 px-3 rounded-full text-white"
          onClick={() => {
            dispatch(toggleSidebarTrue());
          }}
        >
          <span className="bg-white flex items-center p-2 rounded-full mr-3">
            <Image
              src="/assets/icon-plus.svg"
              alt="plus"
              width={14}
              height={14}
              layout="fixed"
            />
          </span>

          <p>{t("NEW_INVOICE")}</p>
        </button>
      </div>
    </div>
  );
};

export default InvoiceTitle;
