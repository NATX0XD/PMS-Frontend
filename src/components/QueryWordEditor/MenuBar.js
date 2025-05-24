"use client";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import React, { useState } from "react";
import {
  IoArrowBack,
  IoOptionsOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import ModalLayoutSetting from "./ModalLayoutSetting";
import { debounce } from "lodash";
import { MdCancel, MdOutlineMoreVert } from "react-icons/md";
import { FaFileImport, FaImage, FaRegSave } from "react-icons/fa";
import TableOptions from "@/configurations/WordEditorItems/TableOptions";
import DrawerOptionTable from "./DrawerOptionTable";

const MenuBar = ({
  editor,
  buttonStyle = null,
  groupStyle = null,
  editorsItems,
  undo = true,
  redo = true,
  fontSize = true,
  fontColor = true,
  fontFormat = true,
  justify,
  align,
  gap,
  pageLayoutSetting = false,
  pageLayoutFunction,
  buttonClose = null,
  optionBar = true,
  isSaving,
  saveAsJson,
  handleFileUpload,
  setIsWordOpen,
  isWordOpen,
}) => {
  if (!editor) {
    return null;
  }
  const { handleChangePageLayout, valuePageLayout } = pageLayoutFunction;
  const [openFontColor, setOpenFontColor] = useState(false);
  const [openTableColor, setOpenTableColor] = useState(false);
  const [openPageLayoutSetting, setOpenPageLayoutSetting] = useState(false);
  const [tempPageLayout, setTempPageLayout] = useState(null);
  const [arrangement, setArrangement] = useState("vertical");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpenPageLayoutSetting = () => {
    setOpenPageLayoutSetting(true);
  };
  const handleClosePageLayoutSetting = () => {
    setOpenPageLayoutSetting(false);
  };
  const changePageLayout = () => {
    if (tempPageLayout !== null) {
      Object.entries(tempPageLayout).forEach(([key, value]) => {
        handleChangePageLayout(key, value);
      });
      setTempPageLayout(null);
    } else {
      //   message.open({
      //     type: "error",
      //     content: "กรุณากรอกค่า",
      //   });
      console.log("กรุณากรอกค่า");
    }
    // setOpenPageLayoutSetting(false);
  };
  const handleInputChange = debounce((type, value) => {
    if (type === "resetValue") {
      handleChangePageLayout(type, value);
      setTempPageLayout(null);
      setArrangement("vertical");
    } else if (type === "horizontal") {
      handleChangePageLayout(type, value);
      setArrangement("horizontal");
    } else if (type === "vertical") {
      handleChangePageLayout(type, value);
      setArrangement("vertical");
    } else {
      setTempPageLayout((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  }, 500);

  // const handleChangeFontFormat = debounce((value) => {
  //   const level = parseInt(value.slice(1));
  //   editor.chain().focus().toggleHeading({ level }).run();
  // }, 100);
  const handleChangeSizeFont = debounce((value) => {
    if (value) {
      editor.chain().focus().setFontSize(`${value}px`).run();
    }
  }, 400);
  const handleChangeFontFormat = debounce((value) => {
    let selected = value;
    if (value && typeof value === "object" && value.size) {
      selected = Array.from(value)[0];
    }
    if (typeof selected === "string" && selected.startsWith("h")) {
      const level = parseInt(selected.slice(1));
      editor.chain().focus().toggleHeading({ level }).run();
    }
  }, 100);
  // const handleChangeFontColor = debounce((value) => {
  //   try {
  //     if (value && value.toHexString) {
  //       const hexColor = value.toHexString();
  //       editor.chain().focus().setColor(hexColor).run();
  //     }
  //   } catch (error) {
  //     //   message.open({
  //     //     type: "error",
  //     //     content: "ไม่สามารถเปลี่ยนสีตัวอักษรได้",
  //     //   });
  //     console.log("ไม่สามารถเปลี่ยนสีตัวอักษรได้", error);
  //   }
  // }, 200);
  const handleChangeFontColor = (event) => {
    try {
      const hexColor = event.target.value;
      editor.chain().focus().setColor(hexColor).run();
    } catch (error) {
      console.log("ไม่สามารถเปลี่ยนสีตัวอักษรได้", error);
    }
  };
  // const handleChangeTableColor = debounce((value) => {
  //   try {
  //     if (value && value.toHexString) {
  //       const hexColor = value.toHexString();
  //       editor
  //         .chain()
  //         .focus()
  //         .setCellAttribute("backgroundColor", `${hexColor}`, {
  //           header: true,
  //         })
  //         .run();
  //     }
  //   } catch (error) {

  //     console.log("ไม่สามารถเปลี่ยนสีตารางได้", error);
  //   }
  // }, 200);
  const handleChangeTableColor = (event) => {
    const hexColor = event.target.value;
    editor
      .chain()
      .focus()
      .setCellAttribute("backgroundColor", hexColor, { header: true })
      .run();
  };

  const getActiveHeading = () => {
    for (let level = 1; level <= 4; level++) {
      if (editor.isActive("heading", { level })) {
        return `h${level}`;
      }
    }
    return null;
  };
  const currentFontColor =
    editor?.getAttributes("textStyle")?.color || "#000000";

  const getCurrentTableColor = (editor) => {
    const cellAttrs = editor.getAttributes("tableCell");
    const headerAttrs = editor.getAttributes("tableHeader");
    if (cellAttrs.backgroundColor) return cellAttrs.backgroundColor;
    if (headerAttrs.backgroundColor) return headerAttrs.backgroundColor;
    return "#FFFFFF";
  };
  const currentTableColor = getCurrentTableColor(editor);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;

      editor.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          editor?.commands.setContent(data.content);
          const layout = data.pageLayout || {};
          setWidthPage(layout.widthPage || "210");
          setHeightPage(layout.heightPage || "297");
          setPaddingTop(layout.paddingTop || "15");
          setPaddingBottom(layout.paddingBottom || "15");
          setPaddingLeft(layout.paddingLeft || "20");
          setPaddingRight(layout.paddingRight || "20");
          alert("โหลดไฟล์ JSON ได้");
        } catch (error) {
          alert("ไม่สามารถโหลดไฟล์ JSON ได้");
        }
      };
      reader.readAsText(file);
    }
  };
  const {
    isOpen: isConfirmModal,
    onOpen: openConfirmModal,
    onClose: closeConfirmModal,
  } = useDisclosure();
  const handleExit = () => {
    setIsWordOpen(false);
    closeConfirmModal();
  };
  const {
    isOpen: isDrawer,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  return (
    <>
      {/* // <Card className="w-full p-2 rounded-xl shadow-sm"> */}
      <div className=" flex flex-row items-center justify-center gap-2">
        <Modal isOpen={isConfirmModal} onOpenChange={closeConfirmModal}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              ยืนยันการออกจากเอกสาร
            </ModalHeader>
            <ModalBody>
              คุณต้องการออกจากเอกสารนี้หรือไม่? <br />
              การแก้ไขปัจจุบันจะไม่ถูกบันทึกหากยังไม่ได้บันทึกไฟล์.
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={closeConfirmModal}
              >
                ยกเลิก
              </Button>
              <Button color="primary" onPress={handleExit}>
                ออกจากเอกสาร
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Dropdown>
          <DropdownTrigger>
            <Button
              style={{
                fontSize: 20,
                padding: 0,
                margin: 0,
              }}
              variant={"bordered"}
              isIconOnly
              size="md"
              radius="sm"
            >
              <MdOutlineMoreVert />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Editor Actions">
            {isWordOpen && (
              <DropdownItem key="save" onPress={openConfirmModal}>
                {/* <Button isIconOnly onPress={openConfirmModal}> */}
                {/* </Button> */}
                <div className="flex flex-row items-center gap-2">
                  <IoArrowBack /> ออกจากเอกสาร
                </div>
              </DropdownItem>
            )}
            <DropdownItem
              key="save"
              onPress={saveAsJson}
              disabled={isSaving || !editor}
            >
              <div className="flex flex-row items-center gap-2">
                <FaRegSave /> Save File
              </div>
            </DropdownItem>
            <DropdownItem
              key="save"
              onPress={() => document.getElementById("file-upload").click()}
            >
              <div className="flex flex-row items-center gap-2">
                <FaFileImport />
                Import File Json
              </div>
            </DropdownItem>
            <DropdownItem
              key="add image"
              onPress={() => document.getElementById("image-upload").click()}
            >
              <div className="flex flex-row items-center gap-2">
                <FaImage /> add Images
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <input
          type="file"
          id="file-upload"
          style={{ display: "none" }}
          accept=".json,.docx,.pdf"
          onChange={handleFileUpload}
        />

        <div className="flex flex-row items-center gap-2">
          {fontSize || fontColor || fontFormat ? (
            <div className="flex flex-row items-center gap-5">
              {/* {fontFormat && (
                <Tooltip showArrow={true} content="Format Type">
                  <Select
                    classNames={"w-full"}
                    size="small"
                    className="max-w-xs"
                    label="Select Format"
                    selectionMode="single"
                    placeholder={getActiveHeading() || "Format"}
                    onSelectionChange={handleChangeFontFormat}
                  >
                    <SelectItem value="h1">
                      <strong> Header</strong>
                    </SelectItem>
                    <SelectItem value="h2">
                      <strong> Title</strong>
                    </SelectItem>
                    <SelectItem value="h3">
                      <strong> SubTitle</strong>
                    </SelectItem>
                    <SelectItem value="h4">
                      <strong> Normal</strong>
                    </SelectItem>
                  </Select>
                </Tooltip>
              )} */}
              {fontSize && (
                <Tooltip showArrow={true} content="Font size">
                  <NumberInput
                    radius="md"
                    size="sm"
                    minValue={1}
                    defaultValue={16}
                    maxValue={106}
                    onValueChange={handleChangeSizeFont}
                    className="max-w-[80px] "
                    style={{ width: 30 }}
                  />
                </Tooltip>
              )}
              {fontColor && (
                // <ColorPicker
                //   size="middle"
                //   defaultValue="#000000"
                //   value={currentFontColor}
                //   open={openFontColor}
                //   onOpenChange={setOpenFontColor}
                //   trigger="hover"
                //   onChange={handleChangeFontColor}
                //   showText={() => (
                //     <DownOutlined
                //       rotate={openFontColor ? 180 : 0}
                //       style={{
                //         color: "rgba(0, 0, 0, 0.25)",
                //       }}
                //     />
                //   )}
                // />
                <input
                  type="color"
                  value={currentFontColor}
                  onChange={handleChangeFontColor}
                  className="max-w-[40px] h-10 cursor-pointer"
                  style={{ border: "none" }}
                />
              )}
            </div>
          ) : null}
          {Object.entries(
            editorsItems.reduce((groups, item) => {
              const groupKey = item.group || "default";
              if (!groups[groupKey]) groups[groupKey] = [];
              groups[groupKey].push(item);
              return groups;
            }, {})
          ).map(([groupKey, groupItems]) => (
            <div className="flex flex-row items-center gap-5" key={groupKey}>
              <Card
                style={{ ...groupStyle }}
                // styles={{
                //   body: {
                //     padding: 0,
                //     margin: 0,
                //   },
                // }}
              >
                <div className="flex flex-row ">
                  {groupItems.map(
                    ({
                      key,
                      TooltipTitle,
                      label,
                      icon,
                      onClick,
                      isActive,
                      canExecute,
                      size,
                      type,
                    }) => (
                      <React.Fragment key={key}>
                        {key === "insertTable" ? (
                          <>
                            <Tooltip
                              key={key}
                              content={TooltipTitle}
                              showArrow={true}
                            >
                              <Button
                                key={key}
                                isIconOnly
                                aria-label={key}
                                size={size}
                                radius="lg"
                                variant="solid"
                                onPress={onClick}
                                isDisabled={canExecute ? !canExecute() : false}
                                style={buttonStyle(isActive())}
                              >
                                {icon}
                              </Button>
                            </Tooltip>
                            {editor.isActive("table") && (
                              <>
                                <Button
                                  style={{
                                    fontSize: 20,
                                    padding: 0,
                                    margin: 0,
                                  }}
                                  isIconOnly
                                  size="sm"
                                  radius="sm"
                                  onPress={openDrawer}
                                  variant="light"
                                >
                                  <IoOptionsOutline />
                                </Button>

                                <DrawerOptionTable
                                  editor={editor}
                                  isDrawer={isDrawer}
                                  openDrawer={openDrawer}
                                  closeDrawer={closeDrawer}
                                  buttonStyle={buttonStyle}
                                  currentTableColor={currentTableColor}
                                  handleChangeTableColor={
                                    handleChangeTableColor
                                  }
                                />
                              </>
                            )}
                          </>
                        ) : (
                          <Tooltip
                            key={key}
                            content={TooltipTitle}
                            showArrow={true}
                          >
                            <Button
                              key={key}
                              isIconOnly
                              aria-label={key}
                              size={size}
                              radius="lg"
                              variant="solid"
                              onPress={onClick}
                              isDisabled={canExecute ? !canExecute() : false}
                              style={buttonStyle(isActive())}
                            >
                              {icon}
                            </Button>
                          </Tooltip>
                        )}
                      </React.Fragment>
                    )
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {pageLayoutSetting && (
          <Button
            style={{
              fontSize: 16,
              padding: 0,
              margin: 0,
            }}
            variant={"bordered"}
            isIconOnly
            size="md"
            radius="sm"
            onPress={onOpen}
          >
            <IoSettingsOutline />
          </Button>
        )}
      </div>
      <ModalLayoutSetting
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onOpen={onOpen}
        changePageLayout={changePageLayout}
        handleInputChange={handleInputChange}
        arrangement={arrangement}
        valuePageLayout={valuePageLayout}
      />
      {/* </Card> */}
    </>
  );
};

export default MenuBar;
