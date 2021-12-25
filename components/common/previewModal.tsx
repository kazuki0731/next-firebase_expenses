import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
}

const PreviewModal: NextPage<Props> = ({
  children,
  isOpen,
  onClose,
}: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="80%" maxH="800px" p="0 10px 20px 10px">
          <ModalCloseButton />
          <ModalHeader mb="5px" />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewModal;
