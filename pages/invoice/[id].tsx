import { QUERY_GET_SPECIFIC_INVOICE } from "utils";
import { ResponseData } from "types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import {
  DetailBody,
  DetailHeader,
  FormContainer,
  LoadingIndicator,
} from "components";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import omitDeep from "@typescript-runtime-schema/omit-deep";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const InvoiceDetail: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const { data, loading } = useQuery(QUERY_GET_SPECIFIC_INVOICE, {
    variables: {
      id: router.query.id as string,
    },
  });

  const formData = data && omitDeep(["__typename"])(data.getSpecificInvoice[0]);

  return (
    <>
      <Head>
        <title>{router.query.id} - Invoice App</title>
      </Head>
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
            height={11}
            layout="fixed"
          />
          <span className="ml-3 dark:text-white">{t("GO_BACK")}</span>
        </button>

        {loading ? (
          <div className="flex-centering h-screen">
            <LoadingIndicator />
          </div>
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
