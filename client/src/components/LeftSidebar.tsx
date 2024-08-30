import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { sidebarLinks } from "@/utils/links";

const LeftSidebar = () => {


  const { pathname } = useLocation();
  
  return (
    <nav className="w-64 h-full relative left-0 top-0 bg-white">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>


        <ul className="flex flex-col gap-5">
          {sidebarLinks.map((link: any) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`rounded-md hover:bg-red-300 group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img

                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    } h-8`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        // onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logo" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};
export default LeftSidebar