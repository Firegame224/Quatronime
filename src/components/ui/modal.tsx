'use Client'

import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "./dialog";

interface modalProps {
    title : string;
    description : string;
    isOpen: boolean;
    children: React.ReactNode;
    onClose : () => void;
}

const Modal = ({title, isOpen, description, children, onClose}: modalProps) => {
  
    const onChange = (open : boolean) => {
        if (!open) {
            onClose();
        }
    }
    return (
    <Dialog open = {isOpen} onOpenChange={onChange}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden rounded-md w-5/6 md:w-2/5">
            <DialogHeader className="pt-8 px-6">
                <DialogTitle className="text-xl">{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="px-5 pb-5">
                {children}
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Modal