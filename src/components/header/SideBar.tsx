
import { LucideShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Separator } from "../ui/separator";
import { useAppSelector } from "@/redux/hooks";


const navLinks = [
  {
    lebel: "Home",
    href: "/",
  },
  {
    lebel: "All Products",
    href: "/product",
  },
  // ...categoryLinks,
];

interface IProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<IProps> = ({ showSidebar, setShowSidebar }) => {
  const { user } = useAppSelector((state) => state.auth);


  const path = usePathname();
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screent width
      const screen = window.screen.width;

      // ---**** return if the screen width is larger
      if (screen > 1024) {
        return;
      }

      // return if the user click on the drawer or the navbar
      if (target.closest(".myDrawer") || target.closest(".menuBTn")) {
        return;
      }

      setShowSidebar(false);
    };

    // hide sidebar on clicking outside
    if (showSidebar) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showSidebar, setShowSidebar]);
  return (
    <div
      className={`${
        showSidebar ? "w-[300px] border-r-[1px] px-[20px] pt-[20px]" : "w-[0px]"
      } bg-white left-0 top-0 fixed h-screen border-borderColor z-20 overflow-hidden myDrawer`}
      style={{ transition: "0.3s" }}
    >
      <Link href="/" className="flex items-center">
        <Image
          width={80}
          height={80}
          src="/favicon.ico.png"
          className="w-[80px] mix-blend-difference"
          alt="ferox logo"
        />
      </Link>
      <div className="w-full flex flex-col mt-[20px]">
        {navLinks.map(({ href, lebel }, i) => (
          <Link
            onClick={() => setShowSidebar(false)}
            key={i + "navlink"}
            href={href}
            className={`w-full px-[15px] py-[8px] rounded-[5px] ${
              path === href ? "bg-main text-white" : "text-main"
            }`}
          >
            {lebel}
          </Link>
        ))}
        {user && user.role === "CUSTOMER" ? (
          <Link
            onClick={() => setShowSidebar(false)}
            href={"/profile/my-orders"}
            className={`w-full px-[15px] py-[8px] rounded-[5px] ${
              path === "/profile/my-orders" ? "bg-main text-white" : "text-main"
            }`}
          >
            Manage Orders
          </Link>
        ) : (
          ""
        )}
      </div>
      <Separator className="mt-[20px]" />
      <Link
        href={`/cart`}
        onClick={() => setShowSidebar(false)}
        className={`w-full px-[15px] py-[8px] rounded-[5px] mt-[15px] flex items-center justify-between gap-[15px] text-main`}
      >
        <span className="flex items-center gap-[15px]">
          <LucideShoppingCart />
          <span className="text-[13px] ml-[5px]">Cart</span>
        </span>
    
      </Link>
    </div>
  );
};

export default SideBar;
