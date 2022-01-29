import { useCallback, useEffect, useMemo } from "react";
import { useImmer } from "use-immer";
import addDays from "date-fns/addDays";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { format } from "date-fns";
import Input from "./Input";
import { CheckTotalParams, ResponseData } from "types";
import { useMutation } from "@apollo/client";
import {
  CREATE_INVOICE,
  QUERY_GET_ALL_INVOICES,
  QUERY_GET_SPECIFIC_INVOICE,
  UPDATE_INVOICE,
} from "utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebarFalse } from "features/sidebar";
import { RootState } from "features";

interface FormContainerProps extends Omit<ResponseData, "status"> {
  edit: Boolean;
}

const FormContainer = ({ edit, _id, ...rest }: Partial<FormContainerProps>) => {
  const [createInvoice] = useMutation(edit ? UPDATE_INVOICE : CREATE_INVOICE);
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

  console.log(inputTemplate.payment_term);

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
        className={`z-20 text-white fixed top-0 ease-in-out duration-700 transition-transform left-0 bg-[#141625]  px-4 py-8 h-screen overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-[-9999px]"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">New Invoice</h1>
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
          <h3 className="mb-4">Bill from</h3>

          <Input
            placeholder="Street Address"
            label="Street Address"
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
              placeholder="City"
              label="City"
              value={inputTemplate.sender_address!.city}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.sender_address!.city = value;
                });
              }}
            />
            <Input
              className="basis-1/3"
              placeholder="Postcode"
              label="Postcode"
              value={inputTemplate.sender_address!.zip}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.sender_address!.zip = value;
                });
              }}
            />
            <Input
              className="basis-1/3"
              placeholder="Country"
              label="Country"
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
            placeholder="Client's Name"
            label="Name"
            value={inputTemplate.bill_to}
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.bill_to = value;
              });
            }}
          />
          <Input
            placeholder="Client's Email"
            label="Email"
            value={inputTemplate.sent_to}
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.sent_to = value;
              });
            }}
          />
          <Input
            placeholder="Client's Street Address"
            label="Street Address"
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
              placeholder="City"
              label="City"
              value={inputTemplate.receiver_address!.city}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.receiver_address!.city = value;
                });
              }}
            />

            <Input
              className="basis-1/3"
              placeholder="Postcode"
              label="Postcode"
              value={inputTemplate.receiver_address!.zip}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.receiver_address!.zip = value;
                });
              }}
            />

            <Input
              className="basis-1/3"
              placeholder="Country"
              label="Country"
              value={inputTemplate.receiver_address!.country}
              toggleFunction={(value) => {
                setInputTemplate((draft) => {
                  draft.receiver_address!.country = value;
                });
              }}
            />
          </div>

          <Input
            label="Invoice Date"
            placeholder="Date"
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
            label="Payment Terms"
            value={inputTemplate.payment_term}
            toggleFunction={(value) =>
              handlePaymentDuration("payment_terms", value)
            }
            option={[
              { label: "Net 1 Day", value: "1" },
              { label: "Net 7 Days", value: "7" },
              { label: "Net 14 Days", value: "14" },
              { label: "Net 30 Days", value: "30" },
            ]}
          />

          <Input
            label="Project Description"
            value={inputTemplate.invoice_description}
            placeholder="Project Description"
            toggleFunction={(value) => {
              setInputTemplate((draft) => {
                draft.invoice_description = value;
              });
            }}
          />

          <h3 className="mt-8">Item List</h3>
          <table className="w-full my-8">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {inputTemplate.items!.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="pr-2">
                      <Input
                        placeholder="Item Name"
                        toggleFunction={(value) => {
                          setInputTemplate((draft) => {
                            void (draft.items![index].item_name = value);
                          });
                        }}
                      />
                    </td>
                    <td className="pr-2">
                      <Input
                        placeholder="Quantity"
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
                        placeholder="Price"
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
                <td>Price Total:</td>
                <td colSpan={4} className="text-2xl text-center py-4">
                  {inputTemplate.amount_due}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="pt-8 pb-4">
                  <button
                    className="flex items-center w-full justify-center py-3 bg-[#373b53] rounded-full"
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
                    <span>Add New Item</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="flex justify-between items-center">
            <button
              type="reset"
              className="bg-[#373b53] px-4 py-3 rounded-full"
              onClick={() => {
                setInputTemplate(edit ? { ...rest } : inputBoilerplate);
                dispatch(toggleSidebarFalse());
              }}
            >
              Discard
            </button>

            <div className="flex items-center">
              <button
                type="reset"
                className="px-4 py-3 bg-[#373b53] rounded-full mr-3"
                onClick={() => handleCreateInvoice("Draft")}
              >
                Save as Draft
              </button>
              <button
                type="reset"
                className="px-4 py-3 bg-[#7c5dfa] rounded-full  "
                onClick={() => handleCreateInvoice("Pending", _id)}
              >
                Save & Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormContainer;
