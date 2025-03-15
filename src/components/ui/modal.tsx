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
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div>
                {children}
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Modal