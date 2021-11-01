import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { NextPage } from "next";

interface Props {
  href: string;
  url?: string;
  color?: string;
}

const PageLink: NextPage<Props> = (props) => {
  const clickLink = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <NextLink href={props.href} as={props.url}>
      <Link
        color={props.color}
        fontWeight="semibold"
        {...props}
        onClick={clickLink}
      />
    </NextLink>
  );
};

export default PageLink;
