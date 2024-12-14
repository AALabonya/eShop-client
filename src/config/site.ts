export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "eShop",
  description:
    "eShop is your one-stop online platform for all essential products. We aim to deliver high-quality, nutritious items right to your doorstep, saving you time and effort. Enjoy a seamless shopping experience with fast delivery and affordable prices.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Login",
      href: "/login",
    },
  ],
};