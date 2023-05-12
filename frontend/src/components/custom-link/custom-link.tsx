import NextLink from "next/link";
import Button from "../button";

interface CustomLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  type?: "link" | "button";
  color?: "green" | "purple";
  href: string;
  children: React.ReactNode;
}

function CustomLink({ type, href, children, color = "green", ...props }: CustomLinkProps) {
  if (type === "link" || !type) {
    return (
      <NextLink {...props} href={href} passHref>
        {children}
      </NextLink>
    );
  } else if (type === "button") {
    return (
      <NextLink {...props} href={href} passHref>
        <Button color={color}>{children}</Button>
      </NextLink>
    );
  }
}

export { CustomLink };
