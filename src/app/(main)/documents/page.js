import ViewDocumets from "@/views/documents";
import React, { Suspense } from "react";
import LoadingDocuments from "./loading";

const Documents = () => {
  return (
    <Suspense fallback={<LoadingDocuments />}>
      <ViewDocumets />
    </Suspense>
  );
};

export default Documents;
