import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { NextPage } from "next";

// interface Props {
//   href:
//     | {
//         pathname: string;
//         query: {
//           data: string;
//         };
//       }
//     | string;
//   url?: string;
//   color?: string;
//   underLine?: string;
// }
{
  /* <PageLink
  href={{
    pathname: "/todos/[id]",
    query: { todo: todo.id },
  }}
  url={`/todos/${todo.title}`}
></PageLink>; */
}

const PageLink = (props: any) => {
  const clickLink = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <NextLink href={props.href} as={props.url}>
      <Link
        _hover={{ textDecoration: props.underLine }}
        color={props.color}
        fontWeight="semibold"
        {...props}
        onClick={clickLink}
      />
    </NextLink>
  );
};

export default PageLink;
