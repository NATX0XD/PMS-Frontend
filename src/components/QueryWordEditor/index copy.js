"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";

import { extensions } from "./Extensions";
import { content } from "./Content";
import { FooterBar } from "./FooterBar";
import WordEditorItems from "@/configurations/WordEditorItems/WordEditorItems";
import { Card, Button, addToast } from "@heroui/react";
import MenuBar from "./MenuBar";
import * as XLSX from "xlsx";
import { useSettings } from "@/hooks/useSettings";
const QueryWordEditor = ({ title, setIsWordOpen, isWordOpen }) => {
  const [zoom, setZoom] = useState(100);
  const [widthPage, setWidthPage] = useState("210");
  const [heightPage, setHeightPage] = useState("297");
  const [paddingTop, setPaddingTop] = useState("15");
  const [paddingBottom, setPaddingBottom] = useState("15");
  const [paddingLeft, setPaddingLeft] = useState("20");
  const [paddingRight, setPaddingRight] = useState("20");
  const [isSaving, setIsSaving] = useState(false);
  //   const [isExporting, setIsExporting] = useState(false);
  const [savedContent, setSavedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const { settings } = useSettings();

  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none w-full max-w-full",
      },
    },
  });
  useEffect(() => {
    if (editor && title) {
      editor.commands.setContent(content(title));
    }
  }, [editor, title]);
  const page = {
    width: `${widthPage}mm`,
    minHeight: `${heightPage}mm`,
    // Height: "100%",
    padding: `${paddingTop}mm ${paddingRight}mm ${paddingBottom}mm ${paddingLeft}mm`,
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    pageBreakAfter: "always",
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "white",
    // transform: `scale(${zoom / 100})`,
    // transformOrigin: "center center",
    // transition: "transform 0.3s ease",
  };

  const valuePageLayout = {
    widthPage,
    heightPage,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  };

  const handleChangePageLayout = (type, value) => {
    const settings = {
      widthPage: setWidthPage,
      heightPage: setHeightPage,
      paddingTop: setPaddingTop,
      paddingRight: setPaddingRight,
      paddingBottom: setPaddingBottom,
      paddingLeft: setPaddingLeft,
      resetValue: () => {
        setWidthPage("240");
        setHeightPage("297");
        setPaddingTop("25.4");
        setPaddingBottom("25.4");
        setPaddingLeft("25.4");
        setPaddingRight("25.4");
      },
      horizontal: () => {
        setWidthPage(heightPage);
        setHeightPage(widthPage);
      },
      vertical: () => {
        setWidthPage(heightPage);
        setHeightPage(widthPage);
      },
    };

    if (settings[type]) {
      if (
        type !== "resetValue" &&
        type !== "horizontal" &&
        type !== "vertical"
      ) {
        settings[type](value);
      } else {
        settings[type]();
      }
    }
  };

  //   // ส่งออกเป็น PDF
  // const exportToPDF = async () => {
  //   if (!editor) return;

  //   setIsExporting(true);

  //   try {
  //     const pageElement = document.getElementById("page");

  //     if (!pageElement) {
  //       throw new Error("Page element not found");
  //     }

  //     const currentZoom = zoom;

  //     setZoom(100);

  //     await new Promise((resolve) => setTimeout(resolve, 300));

  //     const canvas = await html2canvas(pageElement, {
  //       scale: 2, // เพิ่มความละเอียด
  //       useCORS: true,
  //       logging: false,
  //       backgroundColor: "#FFFFFF",
  //     });

  //     const imgData = canvas.toDataURL("image/png");

  //     const pdfWidth = parseFloat(widthPage);
  //     const pdfHeight = parseFloat(heightPage);

  //     const pdf = new jsPDF({
  //       orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
  //       unit: "mm",
  //       format: [pdfWidth, pdfHeight],
  //     });
  //     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  //     pdf.save(`${title || "document"}.pdf`);

  //     setZoom(currentZoom);
  //   } catch (error) {
  //     console.error("Error exporting to PDF:", error);
  //     alert("Failed to export PDF. Please try again.");
  //   } finally {
  //     setIsExporting(false);
  //   }
  // };

  const saveAsJson = () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      const jsonData = JSON.stringify(editor.getJSON(), null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title || "document"}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error saving JSON:", error);
      alert("Failed to save JSON. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const saveContent = async () => {
    if (!editor) return;

    try {
      setIsSaving(true);
      setStatusMessage("กำลังบันทึก...");

      const jsonContent = editor.getJSON();
      console.log("JSON Content to save:", jsonContent);

      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: jsonContent }),
      });

      if (!response.ok) {
        throw new Error("การบันทึกล้มเหลว");
      }

      const result = await response.json();
      setSavedContent(jsonContent);
      setStatusMessage("บันทึกสำเร็จ!");

      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      console.error("Error saving content:", error);
      setStatusMessage("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setIsSaving(false);
    }
  };
  const loadContent = async () => {
    try {
      setIsLoading(true);
      setStatusMessage("กำลังโหลด...");

      const response = await fetch("  ");

      if (!response.ok) {
        throw new Error("การโหลดล้มเหลว");
      }

      const data = await response.json();
      console.log("Loaded JSON content:", data.content);

      if (editor && data.content) {
        editor.commands.setContent(data.content);
        setSavedContent(data.content);
        setStatusMessage("โหลดเรียบร้อย!");

        setTimeout(() => setStatusMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      setStatusMessage("เกิดข้อผิดพลาดในการโหลด");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      setStatusMessage("กรุณาเลือกไฟล์ JSON เท่านั้น");
      addToast({
        title: "กรุณาเลือกไฟล์ JSON เท่านั้น",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage("กำลังอ่านไฟล์...");

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);

        if (editor) {
          editor.commands.setContent(content);
          setSavedContent(content);
          setStatusMessage("นำเข้าไฟล์สำเร็จ!");
          addToast({
            title: "นำเข้าไฟล์สำเร็จ!",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            color: "success",
          });
        }
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        setStatusMessage("เกิดข้อผิดพลาดในการอ่านไฟล์ JSON");
        addToast({
          title: "เกิดข้อผิดพลาดในการอ่านไฟล์ JSON",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
          color: "danger",
        });
      } finally {
        setIsLoading(false);
        setTimeout(() => setStatusMessage(""), 3000);
      }
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setStatusMessage("เกิดข้อผิดพลาดในการอ่านไฟล์");
      addToast({
        title: "เกิดข้อผิดพลาดในการอ่านไฟล์",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger",
      });
      setIsLoading(false);
    };

    reader.readAsText(file);

    event.target.value = "";
  };

  const pageStyle = `<style> 
  @page {
      size: A4;
      margin: 0;
    }
  @media print {
  @page {
    size: A4;
    margin: 0;
  }
      @media print {
      html,
      body {
        width: 210mm;
        height: 297mm;
      }
      .page {
        margin: 0;
        border: initial;
        border-radius: initial;
        width: initial;
        min-height: initial;
        box-shadow: initial;
        background: initial;
        page-break-after: always;
      }
    }
}

  </style>`;

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = pageStyle;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const buttonStyle = (isActive) => ({
    borderRadius: 5,
    fontSize: 20,
    backgroundColor: isActive
      ? settings.mode === "Dark"
        ? "#444950"
        : "#D3D3D3"
      : "transparent",
  });

  const groupStyle = {
    // backgroundColor: "#fff",
    border: "2px solid rgb(192, 179, 179,0.4)",
    borderRadius: 8,
    padding: "3px 3px",
  };
  // const handleFileUploadXlsx = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: "array" });
  //       const sheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[sheetName];
  //       const html = XLSX.utils.sheet_to_html(worksheet);
  //       editor.commands.setContent(html);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   }
  // };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-shrink-0">
          <MenuBar
            editorsItems={WordEditorItems({ editor })}
            editor={editor}
            buttonStyle={buttonStyle}
            groupStyle={groupStyle}
            justify="center"
            align="center"
            gap={5}
            undo={false}
            redo={false}
            pageLayoutSetting={true}
            pageLayoutFunction={{ handleChangePageLayout, valuePageLayout }}
            saveAsJson={saveAsJson}
            isSaving={isSaving}
            handleFileUpload={handleFileUpload}
            setIsWordOpen={setIsWordOpen}
            isWordOpen={isWordOpen}
            // buttonClose={handleClose}
          />
        </div>
        <div className="flex-grow min-h-0 overflow-auto p-2 ">
          <Card
            className="bg-white dark:bg-zinc-900 mx-auto"
            shadow="md"
            id="page"
            style={{
              ...page,
              zoom: `${zoom}%`,
              border: "none",
            }}
            styles={{
              body: {
                overflow: "hidden",
                borderRadius: 0,
                padding: 0,
                margin: 0,
              },
            }}
          >
            <EditorContent
              editor={editor}
              style={{
                overflow: "hidden",
                height: "inherit",
              }}
            />
          </Card>
        </div>
        <div className="flex-shrink-0">
          <FooterBar
            editor={editor}
            pageId={document.getElementById("page")}
            zoom={zoom}
            setZoom={setZoom}
            undo={true}
            redo={true}
          />
        </div>
      </div>
    </>
  );
};

export default QueryWordEditor;
