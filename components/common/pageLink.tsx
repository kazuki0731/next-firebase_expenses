import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { clickLink } from "../../util/function";
import { NextPage } from "next";

const PageLink = (props: any) => {
  return (
    <NextLink href={props.href} as={props.url}>
      <Link
        _hover={{ textDecoration: props.underline }}
        fontWeight="semibold"
        fontSize={{ base: "12px", sm: "15px", md: "20px", lg: "21px" }}
        {...props}
        onClick={clickLink}
      />
    </NextLink>
  );
};

export default PageLink;
