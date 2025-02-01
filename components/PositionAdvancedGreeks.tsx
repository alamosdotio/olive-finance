import { Button } from "./ui/button";
import { Dialog, DialogTitle,  DialogContent, DialogTrigger } from "./ui/dialog";

export default function PositionAdvancedGreeks(){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-inherit p-0 w-fit h-fit shadow-none">
                    <span className="text-sm font-medium text-primary">Show Advanced Greeks</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[420px] px-3 py-5 space-y-[14px] bg-accent sm:rounded-[20px] gap-0">
                <DialogTitle>
                    <span className="text-base font-medium text-foreground">Advanced Greeks</span>
                </DialogTitle>
                <div className="w-full flex flex-col space-y-2">
                    <div className="w-full px-2">
                        <div className="w-full border p-3 rounded-[14px]">

                        </div>
                    </div>
                    <div className="w-full px-2">
                        <div className="w-full border p-3 rounded-[14px]">

                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <Button className="bg-inherit border px-4 py-2 shadow-none text-sm text-foreground rounded-[12px]">
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}