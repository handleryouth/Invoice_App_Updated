import { useQuery } from "@apollo/client";
import Image from "next/image";
import { DetailBody, DetailHeader, FormContainer, Portal } from "components";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import ReactLoading from "react-loading";
import { QUERY_GET_SPECIFIC_INVOICE } from "utils";
import { ResponseData } from "types";
import omitDeep from "@typescript-runtime-schema/omit-deep";
import { useState } from "react";

const InvoiceDetail: NextPage = () => {
  const router = useRouter();

  const { data, loading } = useQuery(QUERY_GET_SPECIFIC_INVOICE, {
    variables: {
      id: router.query.id as string,
    },
  });

  const formData = data && omitDeep(["__typename"])(data.getSpecificInvoice[0]);

  return (
    <>
      {!loading && <FormContainer {...formData} edit />}

      <div className="px-3 py-8 sm:p-4">
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="/assets/icon-arrow-left.svg"
            alt="arrow left"
            width={9}
            height={10}
            layout="fixed"
          />
          <span className="ml-3 text-white">Go Back</span>
        </button>

        {loading ? (
          <ReactLoading type="bubbles" color="white" height={50} width={50} />
        ) : (
          <>
            {(data.getSpecificInvoice as ResponseData[]).map(
              (invoice, index) => {
                return (
                  <div key={index}>
                    <DetailHeader status={invoice.status} id={invoice._id} />
                    <DetailBody {...invoice} />
                  </div>
                );
              }
            )}
          </>
        )}
      </div>
    </>
  );
};

export default InvoiceDetail;
