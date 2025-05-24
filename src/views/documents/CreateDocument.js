"use client";
import { Button } from "@heroui/react";
import React from "react";
import { FaRegSave } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";

const CreateDocument = ({ title, docName }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4 pt-4">
        <h1 className="text-2xl ">
          New {title} - {docName}{" "}
        </h1>
        <div className="flex space-x-2">
          <Button
            radius="md"
            variant="ghost"
            size="sm"
            color="success"
            startContent={<FaRegSave />}
            style={{
              //   backgroundColor: "#4CAF50",
              //   color: "white",
              fontSize: "16px",
            }}
          >
            Save as Draft
          </Button>
          <Button
            radius="md"
            size="sm"
            startContent={<IoMdPrint />}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              fontSize: "16px",
            }}
          >
            Print
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-screen">
        {/* ฝั่งซ้าย: Content หลัก */}
        <div className="w-full md:basis-3/4 bg-blue-100 p-4 border-r border-gray-300">
          <h1 className="text-xl font-bold">ซ้าย (เนื้อหาหลัก)</h1>
          <p>แสดงเนื้อหาหลัก </p>
        </div>

        {/* ฝั่งขวา: Sidebar หรือเนื้อหาน้อย */}
        <div className="w-full md:basis-1/4 bg-green-100 p-4">
          <h1 className="text-xl font-bold">ขวา (เนื้อหาน้อย)</h1>
          <p>รายละเอียดเพิ่มเติม</p>
        </div>
      </div>
    </>
  );
};

export default CreateDocument;
