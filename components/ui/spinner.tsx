"use client"

import { on } from "events";
import { ClipLoader } from "react-spinners";
import { Dialog } from "./dialog";
import { DialogContent } from "@radix-ui/react-dialog";

interface ModalSpinnerHelperProps{
  isOpen: boolean;
}


export const Spinner = () => {
  return (
    <div>
    <ClipLoader color="#6f6d75" />
    </div>
  );
}



export const ModalSpinnerHelper : React.FC<ModalSpinnerHelperProps> = ({
  isOpen,
}) => {

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <Spinner />
      </DialogContent>
    </Dialog>
  );
}