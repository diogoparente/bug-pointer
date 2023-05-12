import NextLink from "next/link";
import Button from "../button";

interface CustomLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  type?: "link" | "button";
  color?: "mainGreen" | "mainPurple";
  href: string;
  children: React.ReactNode;
}

function CustomLink({ type, href, children, color = "mainGreen", ...props }: CustomLinkProps) {
  if (type === "link" || !type) {
    return (
      <NextLink href={href} passHref>
        {children}
      </NextLink>
    );
  } else if (type === "button") {
    return (
      <NextLink href={href} passHref>
        <Button color={color}>{children}</Button>
      </NextLink>
    );
  }
}

export { CustomLink };
