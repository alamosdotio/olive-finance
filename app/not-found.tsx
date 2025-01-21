import { ThemeProvider } from "@/components/ThemeProvider";

export default function NotFound(){
    return (
        <ThemeProvider attribute="data-theme" defaultTheme="light-purple">
        <div className="flex justify-center items-center h-[90vh]">
            <div className="flex items-center p-4">
                <h1>COMING SOON!</h1>
            </div>
        </div>
        </ThemeProvider>
    )
}