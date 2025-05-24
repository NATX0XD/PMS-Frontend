import TableQuery from "@/components/TableQuery";
import ColumnsTableDocuments from "@/configurations/columns/ColumnsTableDocuments";
import React from "react";

const ViewDocumets = () => {
  const documents = [
    {
      id: "QUO-2024-001",
      type: "quotation",
      customer: "ABC Company",
      amount: 15000,
      status: "sent",
      date: "2024-01-15",
    },
    {
      id: "INV-2024-001",
      type: "invoice",
      customer: "XYZ Corporation",
      amount: 22000,
      status: "paid",
      date: "2024-01-14",
    },
  ];
  return (
    // <TableQuery
    //   titleTable="เอกสารทั้งหมด"
    //   sorting={documents}
    //   // isLoading={isLoading}
    //   columns={ColumnsTableDocuments}
    //   // height="600px"
    // />
    <div>wdwd</div>
  );
};

export default ViewDocumets;
