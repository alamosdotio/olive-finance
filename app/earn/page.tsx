import EarnCards from "@/components/EarnCards";
import { ToastContainer } from "react-toastify";

export default function earnPage(){
    return (
        <div className="py-6">
            <EarnCards />
            <ToastContainer 
                theme={'dark'}
            />
        </div>
    )
}