"use client";
import React, { useEffect, useState } from "react";
import QueryWordEditor from "@/components/QueryWordEditor";
import { Button, Card } from "@heroui/react";
import { FaPlus } from "react-icons/fa";

const QueryFilesViews = ({ title = "" }) => {
  const [isWordOpen, setIsWordOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get();
        setDocuments(response.data);
      } catch (error) {
        console.error("Error loading documents:", error);
      }
    };

    fetchDocuments();
  }, []);
  return (
    <>
      {!isWordOpen ? (
        <>
          <div className="flex justify-between items-center mb-4 pt-4">
            <h1 className="text-2xl ">เลือก Template {title}</h1>
            <Button
              radius="lg"
              size="sm"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                fontSize: "16px",
              }}
              onPress={() => setIsWordOpen(true)}
            >
              <FaPlus />
              เพิ่ม Template
            </Button>
          </div>
          ไม่พบข้อมูล เอกสาร
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              className="bg-white dark:bg-zinc-900 p-4"
              onPress={() => {
                setSelectedDoc(doc);
                setIsWordOpen(true);
              }}
            >
              <h2 className="text-lg font-semibold">{doc.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {doc.preview || "No preview available"}
              </p>
            </Card>
          </div> */}
        </>
      ) : (
        <QueryWordEditor
          title={title}
          // content={selectedDoc?.content || ""}
          setIsWordOpen={setIsWordOpen}
          isWordOpen={isWordOpen}
        />
      )}
    </>
  );
};

export default QueryFilesViews;
