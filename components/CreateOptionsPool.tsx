"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Info, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import idl from "@/lib/idl/option_contract.json";
import { OptionContract } from "@/lib/idl/option_contract"; 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

interface Token {
  symbol: string
  name: string
  mint: string
  logo: string
  decimals: number
  price?: number
}

interface OracleFeed {
  id: string
  name: string
  provider: string
  feedId: string
}

export default function CreateOptionsPool() {
  const router = useRouter()
  const [poolName, setPoolName] = useState("")
  const [selectedTokenA, setSelectedTokenA] = useState<Token | null>(null)
  const [selectedTokenB, setSelectedTokenB] = useState<Token | null>(null)
  const [tokenRatio, setTokenRatio] = useState([50]) // Token A percentage
  const [oracleA, setOracleA] = useState<OracleFeed | null>(null)
  const [oracleB, setOracleB] = useState<OracleFeed | null>(null)
  const [initialLiquidity, setInitialLiquidity] = useState({ tokenA: "", tokenB: "" })
  const [fees, setFees] = useState({
    addLiquidity: "0.1",
    removeLiquidity: "0.1",
    exercise: "0.3",
    ratioAdjustment: "1.0",
  })
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)
  const [poolDescription, setPoolDescription] = useState("")
  const [isValidating, setIsValidating] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [availableTokens, setAvailableTokens] = useState<Token[]>([]);

  const wallet = useAnchorWallet()
  const {connection} = useConnection()


  // Mock data - in real app, fetch from API
  useEffect(() => {
    const fetchTokens = async() => {
      try{
        const res = await fetch("https://tomato-rear-quokka-6.mypinata.cloud/ipfs/bafkreidhd2hlr474cfflnmefwaylmykv6ij4fpuhw4i32uu4p23kqftt7m")
        if(!res.ok) throw new Error("Failed to Fetch Token List")
        const data: Token[] = await res.json()
        setAvailableTokens(data)
      } catch(err) {
        console.error("Token List fetch failed: ", err)
      }
    };

    fetchTokens();
  }, [])

  // const availableOracles: OracleFeed[] = [
  //   {
  //     id: "pyth-sol",
  //     name: "SOL/USD",
  //     provider: "Pyth",
  //     feedId: "0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d",
  //   },
  //   {
  //     id: "pyth-usdc",
  //     name: "USDC/USD",
  //     provider: "Pyth",
  //     feedId: "0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
  //   },
  //   {
  //     id: "pyth-btc",
  //     name: "BTC/USD",
  //     provider: "Pyth",
  //     feedId: "0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
  //   },
  //   {
  //     id: "pyth-eth",
  //     name: "ETH/USD",
  //     provider: "Pyth",
  //     feedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
  //   },
  // ]

  // Auto-select oracle when token is selected
  // useEffect(() => {
  //   if (selectedTokenA) {
  //     const oracle = availableOracles.find((o) => o.name.startsWith(selectedTokenA.symbol))
  //     setOracleA(oracle || null)
  //   }
  // }, [selectedTokenA])

  // useEffect(() => {
  //   if (selectedTokenB) {
  //     const oracle = availableOracles.find((o) => o.name.startsWith(selectedTokenB.symbol))
  //     setOracleB(oracle || null)
  //   }
  // }, [selectedTokenB])

  const validateForm = () => {
    const errors: string[] = []

    if (!poolName.trim()) errors.push("Pool name is required")
    if (poolName.length > 32) errors.push("Pool name must be 32 characters or less")
    if (!selectedTokenA) errors.push("Token A (Underlying) is required")
    if (!selectedTokenB) errors.push("Token B (Quote) is required")
    if (selectedTokenA?.mint === selectedTokenB?.mint) errors.push("Token A and Token B must be different")
    // if (!oracleA) errors.push("Oracle feed for Token A is required")
    // if (!oracleB) errors.push("Oracle feed for Token B is required")

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleCreatePool = async () => {
    if (!validateForm() || !wallet) return;

    setIsValidating(true);

    try {
      const provider = new AnchorProvider(connection, wallet, {});
      const programId = new PublicKey(idl.address);
      const program = new Program(idl as OptionContract, provider);

      const poolSeed = Buffer.from("pool");
      const lpMintSeed = Buffer.from("lp_token_mint");
      const contractSeed = Buffer.from("contract");
      const multisigSeed = Buffer.from("multisig");
      const transferAuthoritySeed = Buffer.from("transfer_authority");

      const [poolPda] = PublicKey.findProgramAddressSync(
        [poolSeed, Buffer.from(poolName)],
        program.programId
      );
      const [lpMintPda] = PublicKey.findProgramAddressSync(
        [lpMintSeed, Buffer.from(poolName)],
        program.programId
      );
      const [contractPda] = PublicKey.findProgramAddressSync(
        [contractSeed],
        program.programId
      );
      const [multisigPda] = PublicKey.findProgramAddressSync(
        [multisigSeed],
        program.programId
      );
      const [transferAuthorityPda] = PublicKey.findProgramAddressSync(
        [transferAuthoritySeed],
        program.programId
      );

    console.log(program.methods);

    const tx = await program.methods
      .addPool({ name: poolName })
      .accounts({
        signer: wallet.publicKey,
        pool: poolPda,
        lpTokenMint: lpMintPda,
        contract: contractPda,
        multisig: multisigPda,
        transferAuthority: transferAuthorityPda,
        tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
        systemProgram: PublicKey.default,
        rent: PublicKey.findProgramAddressSync([], PublicKey.default)[0], // use SYSVAR_RENT_PUBKEY if imported
      })
      .rpc();

      console.log("Pool created successfully. TX:", tx);
      alert("Pool created successfully!");
    } catch (err) {
      console.error("Failed to create pool:", err);
      alert("Error creating pool. Check console.");
    } finally {
      setIsValidating(false);
    }
  };

  const calculatePoolValue = () => {
    if (!selectedTokenA || !selectedTokenB || !initialLiquidity.tokenA || !initialLiquidity.tokenB) {
      return 0
    }

    const valueA = Number.parseFloat(initialLiquidity.tokenA) * (selectedTokenA.price || 0)
    const valueB = Number.parseFloat(initialLiquidity.tokenB) * (selectedTokenB.price || 0)
    return valueA + valueB
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-accent/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push("/earn")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Create Options Pool</h1>
              <p className="text-sm text-muted-foreground">Configure your new options liquidity pool parameters</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="grid gap-6">

          {/* Basic Pool Configuration */}
          <Card className="bg-accent/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Basic Pool Configuration
                <Badge variant="secondary" className="text-xs">
                  Required
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pool Name */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Pool Name
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unique identifier for your pool (max 32 characters)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  placeholder="e.g., SOL_USDC_OPTIONS"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  className="bg-secondary border-border p-2"
                  maxLength={32}
                />
                <p className="text-xs text-muted-foreground">{poolName.length}/32 characters</p>
              </div>

              {/* Token Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Token A (Underlying Asset)</Label>
                  <Select
                    value={selectedTokenA?.symbol || ""}
                    onValueChange={(value) => {
                      const token = availableTokens.find((t) => t.symbol === value)
                      setSelectedTokenA(token || null)
                    }}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select underlying token" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-3 py-1">
                            <Image
                              src={token.logo || "/placeholder.svg"}
                              alt={token.symbol}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{token.symbol}</span>
                              <span className="text-xs text-muted-foreground">{token.name}</span>
                            </div>
                            <div className="ml-auto text-right">
                              <div className="text-sm">${token.price?.toFixed(2)}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTokenA && (
                    <div className="text-xs text-muted-foreground">
                      Mint: {selectedTokenA.mint.slice(0, 8)}...{selectedTokenA.mint.slice(-8)}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Token B (Quote Asset)</Label>
                  <Select
                    value={selectedTokenB?.symbol || ""}
                    onValueChange={(value) => {
                      const token = availableTokens.find((t) => t.symbol === value)
                      setSelectedTokenB(token || null)
                    }}
                  >
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue placeholder="Select quote token" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          <div className="flex items-center gap-3 py-1">
                            <Image
                              src={token.logo || "/placeholder.svg"}
                              alt={token.symbol}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{token.symbol}</span>
                              <span className="text-xs text-muted-foreground">{token.name}</span>
                            </div>
                            <div className="ml-auto text-right">
                              <div className="text-sm">${token.price?.toFixed(2)}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTokenB && (
                    <div className="text-xs text-muted-foreground">
                      Mint: {selectedTokenB.mint.slice(0, 8)}...{selectedTokenB.mint.slice(-8)}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Oracle Configuration */}
          <Card className="bg-accent/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Oracle Price Feeds
                <Badge variant="secondary" className="text-xs">
                  Auto-Selected
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Oracle for {selectedTokenA?.symbol || "Token A"}</Label>
                  <div className="p-3 bg-secondary rounded-md border border-border">
                    {oracleA ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{oracleA.name}</div>
                          <div className="text-xs text-muted-foreground">{oracleA.provider} Network</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">Select Token A first</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Oracle for {selectedTokenB?.symbol || "Token B"}</Label>
                  <div className="p-3 bg-secondary rounded-md border border-border">
                    {oracleB ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{oracleB.name}</div>
                          <div className="text-xs text-muted-foreground">{oracleB.provider} Network</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">Select Token B first</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Ratios */}
          <Card className="bg-accent/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Target Token Ratios
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Target allocation between tokens for optimal pool performance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {selectedTokenA?.symbol || "Token A"}: {tokenRatio[0]}%
                  </span>
                  <span className="text-sm font-medium">
                    {selectedTokenB?.symbol || "Token B"}: {100 - tokenRatio[0]}%
                  </span>
                </div>
                <Slider
                  value={tokenRatio}
                  onValueChange={setTokenRatio}
                  max={80}
                  min={20}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>20%</span>
                  <span>50%</span>
                  <span>80%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Initial Liquidity */}
          <Card className="bg-accent/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Initial Liquidity
                <Badge variant="outline" className="text-xs">
                  Optional
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Initial {selectedTokenA?.symbol || "Token A"} Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={initialLiquidity.tokenA}
                    onChange={(e) => setInitialLiquidity({ ...initialLiquidity, tokenA: e.target.value })}
                    className="bg-secondary border-border p-2"
                  />
                  {selectedTokenA && initialLiquidity.tokenA && (
                    <div className="text-xs text-muted-foreground">
                      ≈ ${((Number.parseFloat(initialLiquidity.tokenA) || 0) * (selectedTokenA.price || 0)).toFixed(2)}{" "}
                      USD
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Initial {selectedTokenB?.symbol || "Token B"} Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={initialLiquidity.tokenB}
                    onChange={(e) => setInitialLiquidity({ ...initialLiquidity, tokenB: e.target.value })}
                    className="bg-secondary border-border p-2"
                  />
                  {selectedTokenB && initialLiquidity.tokenB && (
                    <div className="text-xs text-muted-foreground">
                      ≈ ${((Number.parseFloat(initialLiquidity.tokenB) || 0) * (selectedTokenB.price || 0)).toFixed(2)}{" "}
                      USD
                    </div>
                  )}
                </div>
              </div>

              {calculatePoolValue() > 0 && (
                <div className="p-3 bg-secondary/50 rounded-md border border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Pool Value</span>
                    <span className="text-lg font-bold">${calculatePoolValue().toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="bg-accent/50 border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Advanced Settings</CardTitle>
                <Switch checked={isAdvancedMode} onCheckedChange={setIsAdvancedMode} />
              </div>
            </CardHeader>
            {isAdvancedMode && (
              <CardContent className="space-y-6">
                {/* Fee Structure */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">Fee Structure (%)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Add Liquidity Fee</Label>
                      <Input
                        type="number"
                        value={fees.addLiquidity}
                        onChange={(e) => setFees({ ...fees, addLiquidity: e.target.value })}
                        className="bg-secondary border-border p-2"
                        step="0.01"
                        min="0"
                        max="5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Remove Liquidity Fee</Label>
                      <Input
                        type="number"
                        value={fees.removeLiquidity}
                        onChange={(e) => setFees({ ...fees, removeLiquidity: e.target.value })}
                        className="bg-secondary border-border p-2"
                        step="0.01"
                        min="0"
                        max="5"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Exercise Fee</Label>
                      <Input
                        type="number"
                        value={fees.exercise}
                        onChange={(e) => setFees({ ...fees, exercise: e.target.value })}
                        className="bg-secondary border-border p-2"
                        step="0.01"
                        min="0"
                        max="10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Ratio Adjustment Multiplier</Label>
                      <Input
                        type="number"
                        value={fees.ratioAdjustment}
                        onChange={(e) => setFees({ ...fees, ratioAdjustment: e.target.value })}
                        className="bg-secondary border-border p-2"
                        step="0.1"
                        min="0.1"
                        max="5"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Pool Description */}
                <div className="space-y-2">
                  <Label>Pool Description</Label>
                  <Textarea
                    placeholder="Describe your pool strategy, objectives, and any special features..."
                    value={poolDescription}
                    onChange={(e) => setPoolDescription(e.target.value)}
                    className="bg-secondary border-border min-h-[100px]"
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">{poolDescription.length}/500 characters</p>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-1">
                  {validationErrors.map((error, index) => (
                    <div key={index}>• {error}</div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="flex-1" onClick={validateForm}>
              Validate Configuration
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-black font-medium"
              onClick={handleCreatePool}
              disabled={isValidating}
            >
              {isValidating ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Creating Pool...
                </div>
              ) : (
                "Create Options Pool"
              )}
            </Button>
          </div>

          {/* Summary Card */}
          {selectedTokenA && selectedTokenB && (
            <Card className="bg-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Pool Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pool Name:</span>
                    <div className="font-medium">{poolName || "Not set"}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Token Pair:</span>
                    <div className="font-medium">
                      {selectedTokenA.symbol}/{selectedTokenB.symbol}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Target Ratio:</span>
                    <div className="font-medium">
                      {tokenRatio[0]}% / {100 - tokenRatio[0]}%
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Initial Value:</span>
                    <div className="font-medium">${calculatePoolValue().toFixed(2)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
