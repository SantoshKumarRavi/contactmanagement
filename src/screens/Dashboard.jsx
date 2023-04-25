import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidenav from "../components/SideNav";
import routes from "../utils/Routes";
import { useController, setOpenSidenav } from "../utils/Context";
import { Bars4Icon } from "@heroicons/react/24/outline";
const Dashboard = () => {
  const [controller, dispatch] = useController();
  const {openSidenav } = controller;

  return (
    <>
      <div className="min-h-screen bg-blue-200  flex relative">
        {openSidenav && (
          <Sidenav
            routes={routes}
            // brandImg={
            //   // sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
            // }
          />
        )}
        <div className="p-4 xl:ml-80 bg-white flex-1 ">
          {!openSidenav && (
            <div
              onClick={() => {
                setOpenSidenav(dispatch, true);
              }}
            >
              <Bars4Icon strokeWidth={2.5} className="h-5 w-5 text-black" />
            </div>
          )}
          <Routes>
            {routes?.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route exact path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
