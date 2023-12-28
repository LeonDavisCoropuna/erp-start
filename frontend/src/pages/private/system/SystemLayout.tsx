import { NavbarSystem } from "./components/NavbarSystem";
import image from "@/assets/erpLogo.jpg";
import { RiLogoutBoxRLine } from "react-icons/ri";

export const SystemLayout = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div style={styles}>
      <div style={headerStyle}>
        <div className="flex items-center justify-between w-full h-full px-4">
          <button>
            <img src={image} alt="Logo" style={{ width: "50px" }} />
          </button>
          <button>
            <RiLogoutBoxRLine size={30} color="white" />
          </button>
        </div>
      </div>
      <div style={navStyle}>
        <NavbarSystem />
      </div>
      <div style={mainStyle}>{children}</div>
      <div style={footerStyle}>Footer</div>
    </div>
  );
};

const styles = {
  display: "grid",
  gridTemplateAreas: `
    "header header header"
    "nav main main"
    "footer footer footer"
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
  backgroundColor: "blue",
};

const mainStyle = {
  gridArea: "main",
  backgroundColor: "white",
};

const footerStyle = {
  gridArea: "footer",
  backgroundColor: "yellow",
};
