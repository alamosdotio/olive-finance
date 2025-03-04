import { ToastCheck, ToastCircle } from "@/public/svgs/icons";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface TransactionToastProps{
    transaction: string
    isOpen: boolean
    setIsOpen: (state: boolean) => void;
}

export default function TransactionToast({transaction, isOpen, setIsOpen} : TransactionToastProps){
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-[420px] h-[380px] flex flex-col space-y-20 p-5 md:rounded-[20px] gap-0 justify-center">
                <DialogTitle className="w-full flex flex-col space-y-6 justify-center items-center">
                    <div className="relative flex justify-center w-fit h-fit">
                        <ToastCircle />
                        <div className="absolute top-2.5">
                            <ToastCheck />
                        </div>
                    </div>
                    <span className="text-2xl text-center font-medium">{transaction} has been <br/> <span className="text-[#53C08D]">completed!</span></span>
                </DialogTitle>
                <div className="w-full flex justify-center items-end">
                    <Button 
                        className="bg-inherit border text-foreground font-medium px-4 py-2 shadow-none"
                        onClick={() => setIsOpen(false)}
                    >
                        Back to Home
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}