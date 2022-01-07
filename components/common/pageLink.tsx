import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { jumpToLink } from "../../hooks/clickEvent";

const PageLink = (props: any) => {
  const { clickLink } = jumpToLink();

  return (
    <NextLink href={props.href} as={props.url}>
      <Link
        _hover={{ textDecoration: props.underline }}
        fontWeight="semibold"
        {...props}
        onClick={clickLink}
      />
    </NextLink>
  );
};

export default PageLink;
