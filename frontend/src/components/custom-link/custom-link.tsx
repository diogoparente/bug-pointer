import NextLink from "next/link";
import Button from "../button";

interface CustomLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  type?: "link" | "button";
  color?: "green" | "purple";
  size?: "small" | "large";
  href: string;
  children: React.ReactNode;
}

function CustomLink({ type, href, children, color = "green", size = "small", ...props }: CustomLinkProps) {
  if (type === "link" || !type) {
    return (
      <NextLink {...props} href={href} passHref>
        {children}
      </NextLink>
    );
  } else if (type === "button") {
    return (
      <NextLink {...props} href={href} passHref>
        <Button size={size} color={color}>
          {children}
        </Button>
      </NextLink>
    );
  }
  return <></>;
}

export { CustomLink };
