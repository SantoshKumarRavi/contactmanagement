import React from "react";
import {
  ClipboardDocumentIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import Form from "../components/ContactForm";
import ContactScreeen from "../screens/ContactScreeen";
import Charts from "../screens/Charts";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: (Active) => (
          <ClipboardDocumentIcon
            strokeWidth={Active ? 3.0 : 1.5}
            className="h-5 w-5"
          />
        ),
        name: "Contact",
        path: "/contact",
        element: <ContactScreeen />,
      },
      {
        icon: (Active) => (
          <ChartPieIcon strokeWidth={Active ? 3.0 : 1.5} className="h-5 w-5" />
        ),
        name: "Charts",
        path: "/charts",
        element: <Charts />,
      },
    ],
  },
];

export default routes;
