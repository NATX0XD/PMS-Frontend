import QueryFilesViews from "@/components/QueryFilesViews";
import React from "react";
import CreateDocument from "../CreateDocument";

const FormReceipt = () => {
  return (
    <div>
      {/* <QueryFilesViews title="ใบเสร็จรับเงิน" /> */}
      <CreateDocument title="ใบเสร็จรับเงิน" docName="RC021054PDF" />
    </div>
  );
};

export default FormReceipt;
