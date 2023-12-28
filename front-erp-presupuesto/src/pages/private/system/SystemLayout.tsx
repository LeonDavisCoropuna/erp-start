import { NavbarSystem } from "./components/NavbarSystem";
import image from "@/assets/erpLogo.jpg";
import { AppStore } from "@/redux/store";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { LogoutButton } from "./components/LogoutButton";

export const SystemLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const user = useSelector((state: AppStore) => state.user);

  return (
    <div style={styles}>
      <div style={headerStyle}>
        <div className="flex items-center justify-between w-full h-full px-4">
          <button>
            <img src={image} alt="Logo" style={{ width: "50px" }} />
          </button>
          <div className="flex items-center">
            <span className="text-white">
              Username: <span>{user.sub}</span>
            </span>
            <div className="px-5 text-white flex items-center gap-2">
              <span>Roles: </span>
              <div>
                {user.roles && user.roles.map((e: any) => <h2>{e}</h2>)}
              </div>
            </div>
          </div>

          <button>
            <LogoutButton/>
          </button>
        </div>
      </div>
      <div style={navStyle}>
        <NavbarSystem />
      </div>
      <div style={mainStyle}>{children}</div>
    </div>
  );
};

const styles = {
  display: "grid",
  gridTemplateAreas: `
    "header header header"
    "nav main main"
    "nav main main"
  `,
  gridTemplateRows: "1fr 8fr 1fr", // Ajusta según tus necesidades
  gridTemplateColumns: "1fr 8fr 2fr",
  minHeight: "100vh", // Ajusta según tus necesidades
};

const navStyle = {
  gridArea: "nav",
  backgroundColor: "#E5E8E8",
};

const headerStyle = {
  gridArea: "header",
  backgroundColor: "black",
};

const mainStyle = {
  gridArea: "main",
  backgroundColor: "white",
};

const footerStyle = {
  gridArea: "footer",
  backgroundColor: "yellow",
};
