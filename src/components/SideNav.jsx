import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { useController, setOpenSidenav, setActiveTab } from "../utils/Context";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function Sidenav({
  brandImg = "/img/logo-ct.png",
  brandName = "brandName",
  routes,
}) {
  const [controller, dispatch] = useController();
  const { sidenavColor, sidenavType, openSidenav, activeTab } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  return (
    <aside
      className={
        `
       w-72  transition-transform duration-300 
       bg-white z-50 shadow-lg
      ${!openSidenav ? "-translate-x-80" : "translate-x-0"}
      ` //true ? "translate-x-0" : "-translate-x-80"${sidenavTypes[sidenavType]} xl:translate-x-0 inset-0 z-50//openSidenav
      }
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex  items-center gap-4 py-6 px-8">
          <div className="w-1/4 h-1/4 rounded-full border-solid border-2 border-gray-200">
            <img
              className="w-full h-full rounded-full"
              src={
                "https://static.vecteezy.com/system/resources/previews/008/214/517/original/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg"
              }
            />
          </div>

          <h6
            className="text-blue-gray-50/50 font-bold	"
            // color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </h6>
        </Link>
        <button
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-3 top-4 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-black" />
        </button>
      </div>
      <div className="m-4">
        {routes?.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <h5
                  variant="small"
                  color={"blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </h5>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name} onClick={() => setActiveTab(dispatch, name)}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <button
                      variant={isActive ? "gradient" : "text"}
                      style={{
                        backgroundColor: activeTab === name ? "blue" : "",
                        color: activeTab === name ? "white" : "",
                        fontWeight: activeTab === name ? "bold" : "",
                      }}
                      className="flex w-full items-center gap-4 px-4 py-2 capitalize"
                      fullWidth
                    >
                      {icon(activeTab === name)}
                      <h3>{name}</h3>
                    </button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

export default Sidenav;
