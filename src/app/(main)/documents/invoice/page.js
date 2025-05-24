import React, { Suspense } from "react";
import FormInvoice from "@/views/documents/invoice";
import LoadingInvoicePage from "./loading";

const Invoice = () => {
  return (
    <Suspense fallback={<LoadingInvoicePage />}>
      <FormInvoice />
    </Suspense>
  );
};

export default Invoice;
