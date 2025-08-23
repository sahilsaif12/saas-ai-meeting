import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { Drawer ,DrawerContent, DrawerHeader,DrawerTitle,DrawerDescription} from "./ui/drawer";
import { Dialog, DialogContent, DialogHeader,DialogDescription,DialogTitle } from "./ui/dialog";

interface ResponsiveDialogProps {
    title:string;
    description:string;
    children:React.ReactNode;
    open:boolean;
    onOpenChange:(open:boolean)=>void;

}

function ResponsiveDialog({title,description,children,open,onOpenChange}:ResponsiveDialogProps) {
    const isMobile=useIsMobile()

    if(isMobile){
        return(
               <Drawer open={open} onOpenChange={onOpenChange}>

        <DrawerContent >
          <DrawerHeader>
            <DrawerTitle>{title} </DrawerTitle>
            <DrawerDescription>
              {description}
            </DrawerDescription>
          </DrawerHeader>
          {children}
        </DrawerContent>
    </Drawer>
        )
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title} </DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          <div className="p-4">
          {children}
          </div>
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
    </Dialog>
  )
}

export default ResponsiveDialog