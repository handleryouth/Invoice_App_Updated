import { useCallback, useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { CheckTotalParams, FormContainerProps, ResponseData } from "types";
import {
  CREATE_INVOICE,
  QUERY_GET_ALL_INVOICES,
  QUERY_GET_SPECIFIC_INVOICE,
  UPDATE_INVOICE,
} from "utils";
import { RootState } from "features";
import { toggleSidebarFalse } from "features/sidebar";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import addDays from "date-fns/addDays";
import useTranslation from "next-translate/useTranslation";
import Input from "./Input";
import Dropdown from "./Dropdown";

const FormContainer = ({ edit, _id, ...rest }: Partial<FormContainerProps>) => {
  const [createInvoice] = useMutation(edit ? UPDATE_INVOICE : CREATE_INVOICE);
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  const inputBoilerplate: Omit<ResponseData, "_id" | "status"> = useMemo(() => {
    return {
      invoice_date: "",
      invoice_description: "",
      invoice_due_date: "",
      bill_to: "",
      payment_term: "1",
      amount_due: 0,
      items: [],
      sent_to: "",
      receiver_address: {
        city: "",
        country: "",
        street: "",
        zip: "",
      },
      sender_address: {
        city: "",
        country: "",
        street: "",
        zip: "",
      },
    };
  }, []);

  const [inputTemplate, setInputTemplate] = useImmer<
    Partial<Omit<ResponseData, "_id" | "status">>
  >(
    edit
      ? { ...rest, payment_term: rest.payment_term || "1" }
      : inputBoilerplate
  );

  const handleCheckTotal: CheckTotalParams = useCallback(
    (index: number, type, value) => {
      if (type === "item_quantity" && inputTemplate.items![index].item_price) {
        setInputTemplate((draft) => {
          draft.items![index].item_total =
            draft.items![index].item_price * value;
        });
      } else if (
        type === "item_price" &&
        inputTemplate.items![index].item_quantity
      ) {
        setInputTemplate((draft) => {
          draft.items![index].item_total =
            draft.items![index].item_quantity * value;
        });
      }
    },
    [inputTemplate.items, setInputTemplate]
  );

  const handlePaymentDuration = useCallback(
    (type: "invoice_date" | "payment_terms", value: string) => {
      if (type === "payment_terms" && inputTemplate.invoice_date) {
        setInputTemplate((draft) => {
          draft.invoice_due_date = addDays(
            new Date(inputTemplate.invoice_date!),
            Number(value)
          ).toString();

          draft.payment_term = value;
        });
      } else if (type === "invoice_date" && inputTemplate.payment_term) {
        setInputTemplate((draft) => {
          draft.invoice_due_date = addDays(
            new Date(value),
            Number(inputTemplate.payment_term)
          ).toString();
          draft.invoice_date = new Date(value).toString();
        });
      }
    },
    [inputTemplate.invoice_date, inputTemplate.payment_term, setInputTemplate]
  );

  const handleCreateInvoice = useCallback(
    (type: string, id?: string) => {
      dispatch(toggleSidebarFalse());
      createInvoice({
        variables: {
          input: { ...inputTemplate, status: type },
          id,
        },
        refetchQueries: [
          QUERY_GET_SPECIFIC_INVOICE,
          "specificInvoices",
          QUERY_GET_ALL_INVOICES,
          "getAllInvoices",
        ],
      });
    },
    [createInvoice, dispatch, inputTemplate]
  );

  useEffect(() => {
    if (inputTemplate.items!.length > 0) {
      setInputTemplate((draft) => {
        draft.amount_due = draft.items!.reduce((acc, curr) => {
          return acc + curr.item_total;
        }, 0);
      });
    } else {
      setInputTemplate((draft) => {
        draft.amount_due = 0;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTemplate.items]);

  return (
    <>
      <div
        className={`z-20 dark:text-white md:border-r-4 md:border-slate-400 fixed top-0 ease-in-out duration-700 transition-transform left-0 bg-white dark:bg-[#141625]  px-4 py-8 h-screen overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-[-9999px]"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{t("NEW_INVOICE")}</h1>
          <span
            className="text-2xl cursor-pointer"
            onClick={() => {
              dispatch(toggleSidebarFalse());
            }}
          >
            x
          </span>
        </div>

        <form
          className="mt-4"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <h3 className="mb-4">{t("BILL_FROM")}</h3>

          <Input
            placeholder={t("STREET_ADDRESS")}
            label={t("STREET_ADDRESS")}
            value={inputTemplate.sender_address!.street}
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.sender_address!.street = value;
              });
            }}
          />

          <div className="flex gap-x-3 w-full">
            <Input
              className="basis-1/3"
              placeholder={t("CITY")}
              label={t("CITY")}
              value={inputTemplate.sender_address!.city}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.sender_address!.city = value;
                });
              }}
            />
            <Input
              className="basis-1/3"
              placeholder={t("POSTCODE")}
              label={t("POSTCODE")}
              value={inputTemplate.sender_address!.zip}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.sender_address!.zip = value;
                });
              }}
            />
            <Input
              className="basis-1/3"
              placeholder={t("COUNTRY")}
              label={t("COUNTRY")}
              value={inputTemplate.sender_address!.country}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.sender_address!.country = value;
                });
              }}
            />
          </div>

          <h3 className="mt-8 mb-4">Bill to</h3>

          <Input
            placeholder={t("CLIENT_NAME")}
            label={t("CLIENT_NAME")}
            value={inputTemplate.bill_to}
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.bill_to = value;
              });
            }}
          />
          <Input
            placeholder={t("CLIENT_EMAIL")}
            label={t("CLIENT_EMAIL")}
            value={inputTemplate.sent_to}
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.sent_to = value;
              });
            }}
          />
          <Input
            placeholder={t("CLIENT_STREET_ADDRESS")}
            label={t("CLIENT_STREET_ADDRESS")}
            value={inputTemplate.receiver_address!.street}
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.receiver_address!.street = value;
              });
            }}
          />

          <div className="flex gap-x-3">
            <Input
              className="basis-1/3"
              placeholder={t("CITY")}
              label={t("CITY")}
              value={inputTemplate.receiver_address!.city}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.receiver_address!.city = value;
                });
              }}
            />

            <Input
              className="basis-1/3"
              placeholder={t("POSTCODE")}
              label={t("POSTCODE")}
              value={inputTemplate.receiver_address!.zip}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.receiver_address!.zip = value;
                });
              }}
            />

            <Input
              className="basis-1/3"
              placeholder={t("COUNTRY")}
              label={t("COUNTRY")}
              value={inputTemplate.receiver_address!.country}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.receiver_address!.country = value;
                });
              }}
            />
          </div>

          <Input
            label={t("INVOICE_DATE")}
            placeholder={t("INVOICE_DATE")}
            defaultValue={
              inputTemplate.invoice_date &&
              format(new Date(inputTemplate.invoice_date), "yyyy-MM-dd")
            }
            type="date"
            toggleFunction={(value) => {
              handlePaymentDuration("invoice_date", value);
            }}
          />

          <Dropdown
            label={t("PAYMENT_TERMS")}
            value={inputTemplate.payment_term}
            toggleFunction={(value) =>
              handlePaymentDuration("payment_terms", value)
            }
            option={[
              { label: t("NET_DAY", { days: 1 }), value: "1" },
              { label: t("NET_DAYS", { days: 7 }), value: "7" },
              { label: t("NET_DAYS", { days: 14 }), value: "14" },
              { label: t("NET_DAYS", { days: 30 }), value: "30" },
            ]}
          />

          <Input
            placeholder={t("PROJECT_DESCRIPTION")}
            label={t("PROJECT_DESCRIPTION")}
            value={inputTemplate.invoice_description}
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.invoice_description = value;
              });
            }}
          />

          <h3 className="mt-8">{t("ITEM_LIST")}</h3>
          <table className="w-full my-8">
            <thead>
              <tr className="text-left">
                <th>{t("ITEM_NAME")}</th>
                <th>{t("QUANTITY")}</th>
                <th>{t("PRICE")}</th>
                <th>{t("TOTAL")}</th>
              </tr>
            </thead>
            <tbody>
              {inputTemplate.items!.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="pr-2">
                      <Input
                        placeholder={t("ITEM_NAME")}
                        toggleFunction={(value) => {
                          setInputTemplate((draft) => {
                            void (draft.items![index].item_name = value);
                          });
                        }}
                      />
                    </td>
                    <td className="pr-2">
                      <Input
                        placeholder={t("QUANTITY")}
                        toggleFunction={(value) => {
                          setInputTemplate((draft) => {
                            void (draft.items![index].item_quantity =
                              Number(value));
                          });
                          handleCheckTotal(
                            index,
                            "item_quantity",
                            Number(value)
                          );
                        }}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder={t("PRICE")}
                        toggleFunction={(value) => {
                          setInputTemplate((draft) => {
                            void (draft.items![index].item_price =
                              parseFloat(value));
                          });
                          handleCheckTotal(
                            index,
                            "item_price",
                            parseFloat(value)
                          );
                        }}
                      />
                    </td>
                    <td className="text-center">
                      {inputTemplate.items![index].item_quantity *
                        inputTemplate.items![index].item_price}
                    </td>
                    <td>
                      <Image
                        src="/assets/icon-delete.svg"
                        alt="delete"
                        width="20px"
                        height="20px"
                        layout="fixed"
                        onClick={() => {
                          setInputTemplate((draft) => {
                            draft.items = draft.items!.filter((inputItem) => {
                              return inputItem.item_name !== item.item_name;
                            });
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td>{t("PRICE_TOTAL")}:</td>
                <td colSpan={4} className="text-2xl text-center py-4">
                  {inputTemplate.amount_due}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="pt-8 pb-4">
                  <button
                    className="flex items-center w-full justify-center py-3 border-2 border-[#373b53] dark:border-transparent dark:bg-[#373b53] rounded-full"
                    onClick={() => {
                      setInputTemplate((draft) => {
                        void draft.items!.push({
                          item_name: "",
                          item_quantity: 0,
                          item_price: 0,
                          item_total: 0,
                        });
                      });
                    }}
                  >
                    <Image
                      src="/assets/icon-plus.svg"
                      alt="add"
                      width="20px"
                      height="20px"
                      layout="fixed"
                    />
                    <span className="ml-3">{t("ADD_NEW_ITEM")}</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <button
              type="reset"
              className="dark:bg-[#373b53] border-2 border-[#373b53] dark:border-transparent px-4 py-3 rounded-full"
              onClick={() => {
                setInputTemplate(edit ? { ...rest } : inputBoilerplate);
                dispatch(toggleSidebarFalse());
              }}
            >
              {t("DISCARD")}
            </button>

            <div className="flex items-center mt-4 sm:mt-0">
              <button
                type="reset"
                className="px-2 sm:px-4 py-3 dark:bg-[#373b53] border-2 border-[#373b53] dark:border-transparent rounded-full mr-3"
                onClick={() => handleCreateInvoice("Draft")}
              >
                {t("SAVE_AS_DRAFT")}
              </button>
              <button
                type="reset"
                className="px-2 sm:px-4 py-3 dark:bg-[#7c5dfa] border-2 border-[#7c5dfa] dark:border-transparent rounded-full  "
                onClick={() => handleCreateInvoice("Pending", _id)}
              >
                {t("SAVE_AND_SEND")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormContainer;
