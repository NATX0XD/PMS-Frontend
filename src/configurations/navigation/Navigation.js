import { AiFillDashboard, AiFillFileText } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { FaFileInvoiceDollar, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import { IoBarChart, IoReceiptSharp } from "react-icons/io5";

const Navigation = [
  {
    title: "Dashboard",
    url: "/",
    icon: <AiFillDashboard className="text-lg" />,
  },

  {
    title: "สินค้า",
    url: "/products",
    icon: <BiPackage className="text-lg" />,
  },
  { title: "รายงาน", url: "/report", icon: <IoBarChart className="text-lg" /> },
  { title: "Users", url: "/users", icon: <FaUser className="text-lg" /> },
  {
    title: "Tracking",
    url: "/tracking",
    icon: <FaMapMarkedAlt className="text-lg" />,
  },
  {
    title: "ออกเอกสาร",
    url: "/documents",
    icon: <AiFillFileText />,
    children: [
      {
        title: "ใบเสนอราคา",
        url: "/documents/quotation",
        icon: <AiFillFileText className="text-lg" />,
      },
      {
        title: "ใบแจ้งหนี้",
        url: "/documents/invoice",
        icon: <FaFileInvoiceDollar className="text-lg" />,
      },
      {
        title: "ใบเสร็จรับเงิน",
        url: "/documents/receipt",
        icon: <IoReceiptSharp className="text-lg" />,
      },
    ],
  },
  //   { title: "Customer", url: "/customer", icon: <FaUser /> },
];

export { Navigation };
