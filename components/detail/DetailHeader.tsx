import { useMutation } from "@apollo/client";
import { Modal, Portal, StatusBadge } from "components";
import { toggleSidebarTrue } from "features/sidebar";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { DetailHeaderProps } from "types";
import {
  DELETE_INVOICE,
  MARK_AS_PAID,
  QUERY_GET_SPECIFIC_INVOICE,
} from "utils";

const DetailHeader = ({ status, id }: DetailHeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [updatedAsPaid] = useMutation(MARK_AS_PAID);

  const [deleteInvoice] = useMutation(DELETE_INVOICE);

  const handleMarkAsPaid = useCallback(() => {
    updatedAsPaid({
      variables: { id },
      refetchQueries: [QUERY_GET_SPECIFIC_INVOICE, "specificInvoices"],
    });
  }, [id, updatedAsPaid]);

  const handleDeleteInvoice = useCallback(() => {
    deleteInvoice({
      variables: { id },
      onCompleted: () => router.push("/"),
    });
  }, [deleteInvoice, id, router]);

  return (
    <>
      <Portal visible={showModal}>
        <Modal
          modal_title="Confirm Deletion"
          modal_description={`Are you sure you want to delete invoice #${id.slice(
            0,
            6
          )}? This action cannot be undone.`}
          cancel_button_text="Cancel"
          confirm_button_text="Delete"
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            handleDeleteInvoice();
            setShowModal(false);
          }}
        />
      </Portal>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-8 px-4 py-6 rounded-md dark:bg-[#1e2139] border-2 border-slate-400 dark:border-transparent ">
        <div className="flex items-center">
          <p className="dark:text-white mr-4">Status</p>
          <StatusBadge status={status} />
        </div>

        <div className="mt-4 sm:mt-0">
          <button
            className="dark:text-white px-5 py-3 mr-4 rounded-full  dark:bg-[#252945] border-2 border-[#252945] dark:border-transparent"
            onClick={() => dispatch(toggleSidebarTrue())}
          >
            Edit
          </button>
          {status === ("Pending" || "Draft") ? (
            <button
              className="dark:text-white  px-5 py-3 rounded-full  dark:bg-[#7c5dfa] border-2 border-[#7c5dfa] dark:border-transparent"
              onClick={handleMarkAsPaid}
            >
              Mark as Paid
            </button>
          ) : (
            <button
              className="dark:text-white  px-5 py-3 rounded-full  dark:bg-[#ec5757] border-2 border-[#ec5757] dark:border-transparent"
              onClick={() => setShowModal(true)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailHeader;
