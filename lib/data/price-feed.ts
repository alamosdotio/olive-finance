export interface priceFeed{
    token: string
    id: string
}

export const PRICE_FEEDS: priceFeed[] = [
    {
        token: 'Crypto.SOL/USD',
        id: '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d'
    },
    {
        token: 'Crypto.BTC/USD',
        id: '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43'
    },
    {
        token: 'Crypto.ETH/USD',
        id: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace'
    },
    {
        token: 'Crypto.LINK/USD',
        id: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221'
    },
    {
        token: 'Crypto.RENDER/USD',
        id: '0x3d4a2bd9535be6ce8059d75eadeba507b043257321aa544717c56fa19b49e35d'
    },
    {
        token: 'Crypto.WIF/USD',
        id: '0x4ca4beeca86f0d164160323817a4e42b10010a724c2217c6ee41b54cd4cc61fc'
    },
    {
        token: 'Crypto.BONK/USD',
        id: '0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419'
    },
    {
        token: 'Crypto.GRT/USD',
        id: '0x4d1f8dae0d96236fb98e8f47471a366ec3b1732b47041781934ca3a9bb2f35e7'
    },
    {
        token: 'Crypto.PYTH/USD',
        id: '0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff'
    },
    {
        token: 'Crypto.RAY/USD',
        id: '0x91568baa8beb53db23eb3fb7f22c6e8bd303d103919e19733f2bb642d3e7987a'
    },
    {
        token: 'Crypto.PENGU/USD',
        id: '0xbed3097008b9b5e3c93bec20be79cb43986b85a996475589351a21e67bae9b61'
    },
    {
        token: 'Crypto.HNT/USD',
        id: '0x649fdd7ec08e8e2a20f425729854e90293dcbe2376abc47197a14da6ff339756'
    },
    {
        token: 'Crypto.JUP/USD',
        id: '0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996'
    },
    {
        token: 'Crypto.AR/USD',
        id: '0xf610eae82767039ffc95eef8feaeddb7bbac0673cfe7773b2fde24fd1adb0aee'
    },
    {
        token: 'Crypto.FARTCOIN/USD',
        id: '0x58cd29ef0e714c5affc44f269b2c1899a52da4169d7acc147b9da692e6953608'
    },
    {
        token: 'Crypto.JTO/USD',
        id: '0xb43660a5f790c69354b0729a5ef9d50d68f1df92107540210b9cccba1f947cc2'
    },
    {
        token: 'Crypto.W/USD',
        id: '0xeff7446475e218517566ea99e72a4abec2e1bd8498b43b7d8331e29dcb059389'
    },
    {
        token: 'Crypto.POPCAT/USD',
        id: '0xb9312a7ee50e189ef045aa3c7842e099b061bd9bdc99ac645956c3b660dc8cce'
    },
    {
        token: 'Crypto.PNUT/USD',
        id: '0x116da895807f81f6b5c5f01b109376e7f6834dc8b51365ab7cdfa66634340e54'
    },
    {
        token: 'Crypto.PAXG/USD',
        id: '0x273717b49430906f4b0c230e99aa1007f83758e3199edbc887c0d06c3e332494'
    },
    {
        token: 'Crypto.EURC/USD',
        id: '0x76fa85158bf14ede77087fe3ae472f66213f6ea2f5b411cb2de472794990fa5c'
    },

    //Non-crypto assets on Pyth Network
    //A - AZO, USD Equities

    {
        token: 'Equity.US.A/USD',
        id: '0x95924710b36b19bdf82353dc921cb512a89b8213eecddf362a5212677d72a54c'
    },
    {
        token: 'Equity.US.AAPL/USD',
        id: '0x49f6b65cb1de6b10eaf75e7c03ca029c306d0357e91b5311b175084a5ad55688'
    },
    {
        token: 'Equity.US.ABBV/USD',
        id: '0x019ae7cb58ee716ebdd1288b057373d60224fc98a9a43ee373c6b0df1f3ffdf5'
    },
    {
        token: 'Equity.US.ABNB/USD',
        id: '0xccab508da0999d36e1ac429391d67b3ac5abf1900978ea1a56dab6b1b932168e'
    },
    {
        token: 'Equity.US.ABT/USD',
        id: '0x4aac40f432e039ab06236eb9bd3c58347f953d8f05b29aaac295b99cc47ee429'
    },
    {
        token: 'Equity.US.ACGL/USD',
        id: '0x01ccca2a0ba40cfa1e9ea3c81c5ebae0169e32c42603ed9c112e58769d187474'
    },
    {
        token: 'Equity.US.ACN/USD',
        id: '0x68848984b74a7766ad23cdccd8e78e9ef339dcfb86b7e96990f27447c20967ed'
    },
    {
        token: 'Equity.US.ADBE/USD',
        id: '0xdf82dc88ea742bb42bdb845e5fc3ca4eef2354c67357d338221e8a696891b4ca'
    },
    {
        token: 'Equity.US.ADI/USD',
        id: '0xa388977cbd7b063e456a31267919d86395af058a7558e892dde3c6b38c6240bb'
    },
    {
        token: 'Equity.US.ADM/USD',
        id: '0x0c4659250a9acd91536227c64e4d8dd65074ec21c3537ca554ea2aaeee00dd95'
    },
    {
        token: 'Equity.US.ADP/USD',
        id: '0x147e4b877552f9832b87f04038b21da4a3054fd2ae654bed4cb92548bb33f4b4'
    },
    {
        token: 'Equity.US.ADSK/USD',
        id: '0x3d3b04f0e32bd28246e6fd6d0e863e621827a6da9e979e7a7df5516aa28e9591'
    },
    {
        token: 'Equity.US.AEE/USD',
        id: '0x3ba9d201026abdc250a275d59f722abeef1bdcdc7364fedbaecef61c7da788b9'
    },
    {
        token: 'Equity.US.AEM/USD',
        id: '0xb8c2409078c3ff289b21835cd62cdc24233f430395397004874aff6265e8baa4'
    },
    {
        token: 'Equity.US.AEP/USD',
        id: '0xef333b80d26fb3630c870da74de7a52b4c5f40ead3cfd841a9d0fa6bb4186b5b'
    },
    {
        token: 'Equity.US.AES/USD',
        id: '0xc336f7bf37b7379ebaa84a51e5002560dfe0d341c516c05c50a80fc836e2ac32'
    },
    {
        token: 'Equity.US.AFL/USD',
        id: '0xf8b4d7aa681488438f9e51351567f3977480736923a4b75d326625f36f025836'
    },
    {
        token: 'Equity.US.AGG/USD',
        id: '0x66e2456d8f7fae8b1421538b10c868b89a6e23b727f290ac062cc6809c96ea9a'
    },
    {
        token: 'Equity.US.AI/USD',
        id: '0xafb12c5ccf50495c7a7b04447410d7feb4b3218a663ecbd96aa82e676d3c4f1e'
    },
    {
        token: 'Equity.US.AIG/USD',
        id: '0x9140533c3a5bd8c00b087c2d6e3b396f2767910484e61349a643f2e32a69f753'
    },
    {
        token: 'Equity.US.AIZ/USD',
        id: '0x0807c53eeceb8d3cb15096905d94839971f34cb2cffcda0358c0a8294cfa72ff'
    },
    {
        token: 'Equity.US.AJG/USD',
        id: '0xe26394da01c493bf0606d33395ad72c97a9d0e0cd68b31ace8832c6451a1f5ff'
    },
    {
        token: 'Equity.US.AKAM/USD',
        id: '0xacaab0049c5381f27cec309af76efc0d6f375922183d2df23a20768780ee652d'
    },
    {
        token: 'Equity.US.ALB/USD',
        id: '0x4db91e379e36addcdb1cc75dcb03022bd95d5d95148c41d268348d12cbd27c18'
    },

    {
        token: 'Equity.US.ALGN/USD',
        id: '0x973f5dc5c6c960f20c98c0d14d76c050fdf31b393059ca724fbfd746aa5b44dc'
    },
    {
        token: 'Equity.US.ALL/USD',
        id: '0xe99bb427a3e84a107c6e3108cd81608bfb1c54bba024374cae15da93da756c02'
    },
    {
        token: 'Equity.US.ALLE/USD',
        id: '0xf063ce6db3f3c237f248e51fe80cc4910fef79a8f0f3fc056b0d5b6a2bd450ba'
    },
    {
        token: 'Equity.US.AMAT/USD',
        id: '0xb9bc74cc1243b706efacf664ed206d08ab1dda79e8b87752c7c44b3bdf1b9e08'
    },
    {
        token: 'Equity.US.AMC/USD',
        id: '0x5b1703d7eb9dc8662a61556a2ca2f9861747c3fc803e01ba5a8ce35cb50a13a1'
    },
    {
        token: 'Equity.US.AMCR/USD',
        id: '0xca8c4a0ace217ae153dbdcaf27d9f5e29a8ddfe4385979c4b364db9588a65cd0'
    },
    {
        token: 'Equity.US.AMD/USD',
        id: '0x3622e381dbca2efd1859253763b1adc63f7f9abb8e76da1aa8e638a57ccde93e'
    },
    {
        token: 'Equity.US.AME/USD',
        id: '0x79adceba85771f08b71af57b027e0cf98a040738bca2a70ed3f89736a718f77c'
    },
    {
        token: 'Equity.US.AMGN/USD',
        id: '0x10946973bfcc936b423d52ee2c5a538d96427626fe6d1a7dae14b1c401d1e794'
    },
    {
        token: 'Equity.US.AMP/USD',
        id: '0xa63586143073186f23c7f8439ab75b558b9be60f37f395feae47d4329f509ee2'
    },
    {
        token: 'Equity.US.AMT/USD',
        id: '0x8a80397a6e962b6e260d620e3c68d08ab94bdc82fd27d2c506d41b8a52280364'
    },
    {
        token: 'Equity.US.AMZN/USD',
        id: '0xb5d0e0fa58a1f8b81498ae670ce93c872d14434b72c364885d4fa1b257cbb07a'
    },
    {
        token: 'Equity.US.ANET/USD',
        id: '0x31cc7558642dc348a3e2894146a998031438de8ccc56b7af2171bcd5e5d83eda'
    },
    {
        token: 'Equity.US.ANSS/USD',
        id: '0x052e079ee2b39cbe89698781ce80a8cd725e64418d2fa83f3a4934e185571ebb'
    },
    {
        token: 'Equity.US.AON/USD',
        id: '0x7b1525d880bf2d40d273c738036f3806bf9b0aef6688e16b246d7e37ec2923ed'
    },
    {
        token: 'Equity.US.AOS/USD',
        id: '0x7d981711db3d6a0b628823af5f51d8b94837b452aac6ed7da13fdbc227f6d9a8'
    },
    {
        token: 'Equity.US.APA/USD',
        id: '0xbb118ccad2f8d1df2d4f173abacaed772b8443abfcf6eacee1207a5e5d9c105c'
    },
    {
        token: 'Equity.US.APD/USD',
        id: '0x3a4d69933f6e8e251a730e1d04ae7fdd53a2b20a1d111bbccf263209375646a0'
    },
    {
        token: 'Equity.US.APH/USD',
        id: '0xd0723436221cd8ca5f2f11c38920271d77950e7ed0cec1a764459b465cb88651'
    },
    {
        token: 'Equity.US.APO/USD',
        id: '0x40176a5dd12a53bb1f31e848c9363863dd6f8e755f35ef56d2182fc7f1d03853'
    },
    {
        token: 'Equity.US.APP/USD',
        id: '0x54f128939505878cf4412abc5a533255ce07e85833849170deb67deff0533aa7'
    },
    {
        token: 'Equity.US.APTV/USD',
        id: '0x169b68eb05ce4bac2eac0a70b7eafd1abf78bd5d8c6f769e1668bf011308e4e8'
    },
    {
        token: 'Equity.US.ARE/USD',
        id: '0x59463a118f866f6061a89a9c3456f7c5824b74f5a55de944cb1e81a8a46b1827'
    },
    {
        token: 'Equity.US.ARKB/USD',
        id: '0x8f1c7775f51f7b7990953ad43c336778b8aa1bc3be8d8c1db68a020e078e8a2c'
    },
    {
        token: 'Equity.US.ARKK/USD',
        id: '0xb2fe0af6c828efefda3ffda664f919825a535aa28a0f19fc238945c7aff540b1'
    },
    {
        token: 'Equity.US.ARM/USD',
        id: '0x957bf692b35cc62f222dbf4dc6929130df42fe17c9f03373f44c01f78b05391e'
    },
    {
        token: 'Equity.US.ASML/USD',
        id: '0x1a6e324589a0e355919fb1c0389edc3fdf4c46034626bd82aad4e47714cfa94f'
    },
    {
        token: 'Equity.US.ATO/USD',
        id: '0xe045f185730daa0a656655aed1317710b047bda0a7e74d74b24f112d37bcde53'
    },
    {
        token: 'Equity.US.AVB/USD',
        id: '0xaafa1b2ed24a90e5f3fb7dd6b8e546a6068e4432039cc6adf1e6d6a92ff6ecdf'
    },
    {
        token: 'Equity.US.AVGO/USD',
        id: '0xd0c9aef79b28308b256db7742a0a9b08aaa5009db67a52ea7fa30ed6853f243b'
    },
    {
        token: 'Equity.US.AVY/USD',
        id: '0xd302d0bf304b2a9a186d58733a2fd9d29a9f4ed7c91b74df44071c614f81363c'
    },
    {
        token: 'Equity.US.AWK/USD',
        id: '0x36f47f658e232e48e4d922d9cdb9d553f71795d05e2655312e11ab853189484c'
    },
    {
        token: 'Equity.US.AXON/USD',
        id: '0x9e2f2b1adb8ac673c4a8dd6f4e4bc7d289df5f1527efd593c69ffd866faaba44'
    },
    {
        token: 'Equity.US.AXP/USD',
        id: '0x9ff7b9a93df40f6d7edc8184173c50f4ae72152c6142f001e8202a26f951d710'
    },

    {
        token: 'Equity.US.AZN/USD',
        id: '0x7fb3b27d9039f8ca0a435fe0fdf724a3a5a2309ab62ad07ca775e5ab2100c1be'
    },
    {
        token: 'Equity.US.AZO/USD',
        id: '0x3b9f8ee08c4dedaf70133256945518df1f037449c9d81cc678907694bdad3f0f'
    },
    
    //BA-BWA
    {
        token: 'Equity.US.BA/USD',
        id: '0x8419416ba640c8bbbcf2d464561ed7dd860db1e38e51cec9baf1e34c4be839ae'
    },
    {
        token: 'Equity.US.BAC/USD',
        id: '0x21debc1718a4b76ff74dadf801c261d76c46afaafb74d9645b65e00b80f5ee3e'
    },
    {
        token: 'Equity.US.BALL/USD',
        id: '0x906e8ef631023ae858c46e558604401c827c69f503795b4603d29f69e57afbef'
    },
    {
        token: 'Equity.US.BAX/USD',
        id: '0x72c3b869b1188eaaacd19da9fac87253d8d4adfa651e5b1b4fd371168445a108'
    },
    {
        token: 'Equity.US.BBY/USD',
        id: '0x1de9dba93a2de170417a6e113204ec0a7fcb594643a14e590a3d6ba1adef0017'
    },
    {
        token: 'Equity.US.BDX/USD',
        id: '0x97ee6da593bd5e1e73b1edccc05f901a89b698abcb56d31221e73bb9684a4ede'
    },
    {
        token: 'Equity.US.BEN/USD',
        id: '0xda588e138c2bfac1d3961703edce382c431c77406a68427153b9ac08f5a1b9e4'
    },
    {
        token: 'Equity.US.BF-B/USD',
        id: '0x1aa595ffc8426246994eedd6c6622b092ac0140f429c15c7fb93778644786ba1'
    },
    {
        token: 'Equity.US.BG/USD',
        id: '0xe39d2f3aa68f677f9782542e6142dc43bd7a9cd002c8af87aecad19758a76874'
    },
    {
        token: 'Equity.US.BHP/USD',
        id: '0x191d7aac7f589ecdf86e05e349c58873eebe0c6b0101615af3a22b366a51d87d'
    },
    {
        token: 'Equity.US.BIIB/USD',
        id: '0x1fba752348cffe265d87fd24eb641664234a089ff11947ac8d1bcfaa9430c453'
    },
    {
        token: 'Equity.US.BIL/USD',
        id: '0x6050efb3d94369697e5cdebf4b7a14f0f503bf8cd880e24ef85f9fbc0a68feb2'
    },
    {
        token: 'Equity.US.BITB/USD',
        id: '0xb2f5fb947fb6846c9d9860159179f206193a47bab3cd7ade2d3754c25051c0e1'
    },
    {
        token: 'Equity.US.BITS/USD',
        id: '0xc5676e71c8c76379bb2298934b26e2e848b196716362ea32d66dbcc228607027'
    },
    {
        token: 'Equity.US.BK/USD',
        id: '0x388d6ab5c18ec14b9339a718669dc6d5a366c159e21617498c97870d18aeb207'
    },
    {
        token: 'Equity.US.BKNG/USD',
        id: '0xe90b679a7e4ca0d591abb634959d38a535c2036c6b121c520a82cff111ff7d12'
    },
    {
        token: 'Equity.US.BKR/USD',
        id: '0x2792f57bf9f228b8e0d12053938e5eb1002f00c4fd76e0f21679b0b5ea576428'
    },
    {
        token: 'Equity.US.BLDR/USD',
        id: '0x7840cb9a07395e891dd3fe4d5dc9e5e32166c16b4081a05a65f7464c1d779f13'
    },
    {
        token: 'Equity.US.BLK/USD',
        id: '0x68d038affb5895f357d7b3527a6d3cd6a54edd0fe754a1248fb3462e47828b08'
    },
    {
        token: 'Equity.US.BMY/USD',
        id: '0x01d1d77d2d98cb38f163ecb6c1c0e3b8d60bbd5aa23c915b282f0228ac7d9967'
    },
    {
        token: 'Equity.US.BND/USD',
        id: '0xed8fb53acc8e6fada0885e9fca7b8bd15727ef6913fe10141d5cc51f73f6fc81'
    },
    {
        token: 'Equity.US.BNDX/USD',
        id: '0x80642d572babc523158d2bfad90f32ef236cd43150b44790c8aa88865007c07b'
    },
    {
        token: 'Equity.US.BR/USD',
        id: '0x945c4b4ca2c3526335c4b559f7948620d54c80323a56db7b70f5333671fd2416'
    },
    {
        token: 'Equity.US.BRK-A/USD',
        id: '0x886691e862ed9774a276051443d25f0b4745e2bc077450bf3aee5aba4c96b013'
    },
    {
        token: 'Equity.US.BRK-B/USD',
        id: '0xe21c688b7fc65b4606a50f3635f466f6986db129bf16979875d160f9c508e8c7'
    },
    {
        token: 'Equity.US.BRO/USD',
        id: '0xccf32dd36514b9028f6d5af01976fcf20e7a5d6a0adb040af5b6c84f1c76c600'
    },
    {
        token: 'Equity.US.BRRR/USD',
        id: '0xb40b427690447a6fd5f75aa4b35dca20ed9b2e42d8eaa80ecf4d81406db68cd8'
    },
    {
        token: 'Equity.US.BSV/USD',
        id: '0xc9ae586dc9d73ff6353f20c2c2a2c9efacf697e0abd30d7e8042e3c789054ebf'
    },
    {
        token: 'Equity.US.BSX/USD',
        id: '0xd699ec7e73369362480f83d2a6f6ec778fa2947a45f1e94309cf893689d35262'
    },
    {
        token: 'Equity.US.BTCO/USD',
        id: '0xf8a4a02d7b060a41879eaaab1f729bc2d68a4da491fb66d3446ba9dd6606e97d'
    },
    {
        token: 'Equity.US.BTCW/USD',
        id: '0x7e9582ecb9f1cb90400e897fb364ea35ed4193b47ce19a7eff8e392f695550be'
    },
    {
        token: 'Equity.US.BTF/USD',
        id: '0x5d72edffd1b1f72506018204afe1cdf9f31b97e6a30ba1d079bcb242c874529c'
    },
    {
        token: 'Equity.US.BWA/USD',
        id: '0x20e3150670edc7674cf130f844934de184fb497c271499d6c4b9ffad3c41ff0f'
    }


]