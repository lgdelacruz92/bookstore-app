import { Box, Heading } from "@radix-ui/themes";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface SideNavLinkProps {
  href?: string;
  children?: ReactNode;
  onNavClick?: (href: string) => void;
}
const SideNavLink: React.FC<SideNavLinkProps> = ({
  href,
  children,
  onNavClick,
}) => {
  return (
    <li
      onClick={() => (onNavClick ? onNavClick(href ?? "") : null)}
      className="cursor-pointer hover:bg-indigo-500 hover:text-white py-1 rounded-full"
    >
      {children}
    </li>
  );
};

const SideNav = () => {
  const navigate = useNavigate();
  const onNavClick = (href: string) => {
    if (href === "/login") {
      localStorage.setItem("token", "");
    }
    navigate(href);
  };
  return (
    <Box>
      <Heading>Site Links</Heading>
      <ul className="mt-4">
        <SideNavLink href="/books" onNavClick={onNavClick}>
          Books
        </SideNavLink>
        <SideNavLink href="/favorites" onNavClick={onNavClick}>
          Favorites
        </SideNavLink>
        <SideNavLink href="/login" onNavClick={onNavClick}>
          Log out
        </SideNavLink>
      </ul>
    </Box>
  );
};

export default SideNav;
