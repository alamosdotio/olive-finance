'use client'

import { Download, Send, Upload } from "lucide-react"
import { Button } from "../ui/button"

export function PortfolioHeader(){
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <h1 className="text-3xl font-medium mb-4 lg:mb-0">Portfolio</h1>
            <div className="flex flex-wrap gap-2">
                {/* <Button variant="outline">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                </Button>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Withdraw
                </Button>
                <Button variant="outline" className="text-primary border-primary">
                    <Upload className="w-4 h-4 mr-2" />
                    Deposit
                </Button> */}
            </div>
        </div>
    )
}