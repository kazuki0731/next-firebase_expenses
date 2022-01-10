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
        fontSize={{ base: "12px", sm: "15px", md: "20px", lg: "22px" }}
        {...props}
        onClick={clickLink}
      />
    </NextLink>
  );
};

export default PageLink;
