export default function OptionChainSummary(){
    return (
        <main className="w-full flex flex-col space-y-4 border rounded-sm justify-center items-center"  style={{ height: 'calc(100vh - 155px)' }}>
            <div className="flex flex-col space-y-3 items-center">
                <h1 className="text-2xl font-medium">Trade Options</h1>
                <span className="text-sm font-normal text-secondary-foreground">Selected options will appear here</span>
            </div>
        </main>
    )
}