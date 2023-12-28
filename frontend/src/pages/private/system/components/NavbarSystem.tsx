import { useState } from "react";
import { routes } from "./routes";
import { FaFolder } from "react-icons/fa";
import { CiRoute } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export const NavbarSystem = () => {
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([]);
  const location = useLocation();

  const handleRouteClick = (route: string) => {
    setExpandedRoutes([route]);
  };

  const renderSubRoutes = (menu: any[], level: number = 1) => {
    return (
      <div style={{ marginLeft: `${level * 5}px` }}>
        {menu.map((subRoute, subIndex) => (
          <Link
            key={subIndex}
            className={`flex items-center gap-x-1 ${
              getCurrentRoute(subRoute.route) ? "bg-gray-300" : ""
            }`}
            to={subRoute.route}
          >
            <CiRoute />
            {subRoute.title}
          </Link>
        ))}
      </div>
    );
  };

  const getCurrentRoute = (route: string) => {
    return location.pathname.includes(route);
  };

  return (
    <nav>
      {routes.map((route, index) => (
        <div key={index}>
          <Link
            onClick={() => handleRouteClick(route.route)}
            className={`flex items-center gap-x-1 ${
              getCurrentRoute(route.route) ? "bg-gray-300" : ""
            }`}
            to={route.route}
          >
            <FaFolder color="gray" />
            {route.title}
          </Link>
          {expandedRoutes.includes(route.route) && route.hasMenu && (
            <div>{renderSubRoutes(route.menu, 2)}</div>
          )}
        </div>
      ))}
    </nav>
  );
};
