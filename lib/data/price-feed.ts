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
    
    //Non-crypto assets on Pyth Network
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
    },

    //Non-crypto assets on Pyth Network
    //CBOE-CZR

    {
        token: 'Equity.US.CBOE/USD',
        id: '0x566241bb0d53283a8a1765b759341490dbf69e7fa7653c4b5f86aabf37567595'
    },
    {
        token: 'Equity.US.CBRE/USD',
        id: '0xc153deece90e57f0c4b2bd1b693deed41e32a8117fd6eb8269a49e71d5080292'
    },
    {
        token: 'Equity.US.CCEP/USD',
        id: '0xfd06662626076e1bd5c6cac35a92d1466f4d11b243e6c28fbc4a96c456275d93'
    },
    {
        token: 'Equity.US.CCI/USD',
        id: '0xd346bf2b5a30cbcb8092c1eed6afe9e747bb5a6a63ed7c008164cb280c64754c'
    },
    {
        token: 'Equity.US.CCL/USD',
        id: '0x2e92206274d7a8d2fe094d7ef448724608bdb231b3096ceac004fc44e12975db'
    },
    {
        token: 'Equity.US.CDNS/USD',
        id: '0xa2168b2c613dcd4b8c0f50e255b61a1c5dfdf750eddaf09bade719b9ceb573a0'
    },
    {
        token: 'Equity.US.CDW/USD',
        id: '0x3cb1afe7c1f9633ec2245e2ae902d431989d86e67fe69a999ea4736365226049'
    },
    {
        token: 'Equity.US.CE/USD',
        id: '0x6463830f5008818cb88359ee283973c92ef1edd8ea025aa75a5c75032a63e186'
    },
    {
        token: 'Equity.US.CEG/USD',
        id: '0xa541bc5c4b69961442e45e9198c7cce151ff9c2a1003f620c6d4a9785c77a4d9'
    },
    {
        token: 'Equity.US.CF/USD',
        id: '0xe2bad4d409637556216267dbb29fcb27d23e263ae12ab5acbb68b309ba17783d'
    },
    {
        token: 'Equity.US.CFG/USD',
        id: '0xc7c24c987c84f7c76bde1a1d50ff04624422d9ac68bd8f039a57a30e24dc524b'
    },
    {
        token: 'Equity.US.CHD/USD',
        id: '0x29f6892fec85377d66086b3c323e298c2a0bf133551e9a0a91c150b95517aec5'
    },
    {
        token: 'Equity.US.CHRW/USD',
        id: '0xf2df0a854dc8f45e9c6f93bb7e4e2720c920b2a5208afba18075a87fb5a6f6ed'
    },
    {
        token: 'Equity.US.CHTR/USD',
        id: '0x1585a2b6467e2bf7788d6c58ab4b0f2259610d5997f8aa7b6c160417250c71f8'
    },
    {
        token: 'Equity.US.CI/USD',
        id: '0x50792163ea9ceb6e4142a4ae35845e4ca4c559b89bbf6cb3d426f79534717401'
    },
    {
        token: 'Equity.US.CINF/USD',
        id: '0x2bdf663a6dacfbb4f986adc98d833cbdd206ab64d6f5fb0cd5470e91bb3985a0'
    },
    {
        token: 'Equity.US.CL/USD',
        id: '0x89b83912f0fe0c5091de834750cac3de2ff16b74b6a99bab7cbae25dd6585f4c'
    },
    {
        token: 'Equity.US.CLX/USD',
        id: '0x772e16ce4ffa670ed237b51edf04a153137998d06162517f75ad0baa45e118c4'
    },
    {
        token: 'Equity.US.CMCSA/USD',
        id: '0x1bd6720eea4df323c076c9bbc1e98e8f5fe4bd16584e56468c5fb6b1a6072725'
    },
    {
        token: 'Equity.US.CME/USD',
        id: '0x8773fef6b95d156416c3025d3a7b6f90b4a88b206038dde8000b1acddb714906'
    },
    {
        token: 'Equity.US.CMG/USD',
        id: '0xc1046358a2b78d92a2ad45b9d3c271350ab9335b478df21a390b8924cad91563'
    },
    {
        token: 'Equity.US.CMI/USD',
        id: '0x069463ea9b6c8741e39498539365f385d4fdf0acea213d1efdb6ddc30101d0dd'
    },
    {
        token: 'Equity.US.CMS/USD',
        id: '0x25be29dc1eae3448537076cf0d14ef2c43dbfd5de043256ead46fa01a19b425b'
    },
    {
        token: 'Equity.US.CNC/USD',
        id: '0x46c5fc6eefc5becf2f8dc3656357c21ef585feaf74bc94f0fc58f6f33fae1205'
    },
    {
        token: 'Equity.US.CNP/USD',
        id: '0xbf3a21d6b8dbb4df9e75df58c124be8248239c005d117fdb9e0f0ff434d1dfa8'
    },
    {
        token: 'Equity.US.COF/USD',
        id: '0x857c3a552953250d5b19db7341f3deaed12ff623f2db451e30581c266b23ab58'
    },
    {
        token: 'Equity.US.COIN/USD',
        id: '0xfee33f2a978bf32dd6b662b65ba8083c6773b494f8401194ec1870c640860245'
    },
    {
        token: 'Equity.US.COO/USD',
        id: '0xed5a005efa0f84a8acfab450ce4429c3dd57f7cd3284d04eb0c65820e062e85f'
    },
    {
        token: 'Equity.US.COP/USD',
        id: '0xd54d8d4e3774ea53660e660ecd03aa9daa31eed9b7e67d1a2aed3095b3e6720d'
    },
    {
        token: 'Equity.US.COR/USD',
        id: '0xec3594578eb750e3b9393433e983263baa18018db14e1d220c6845bf2fe480a3'
    },
    {
        token: 'Equity.US.COST/USD',
        id: '0x163f6a6406d65305e8e27965b9081ac79b0cf9529f0fcdc14fe37e65e3b6b5cb'
    },
    {
        token: 'Equity.US.CPAY/USD',
        id: '0x221834e0bb6002d75833e2aa4dcc4fdd26b8300a40e4546978946c3dff272c29'
    },
    {
        token: 'Equity.US.CPB/USD',
        id: '0x9b826f23dd771b0b4dfdcb76ff40db3b51c86e06fc2b62c1d4e5d69cf2942669'
    },
    {
        token: 'Equity.US.CPNG/USD',
        id: '0x5557d206aa0dd037fc082f03bbd78653f01465d280ea930bc93251f0eb60c707'
    },
    {
        token: 'Equity.US.CPRT/USD',
        id: '0x9bffd1e8d7b5f6c4890216b89d30393cf7284c540a9e0843c92490b58167302a'
    },
    {
        token: 'Equity.US.CPT/USD',
        id: '0xd71412c0ef13b400c49514108d5236f47c5c30906ac8ae7c65b40bca8a6a984b'
    },
    {
        token: 'Equity.US.CRCL/USD',
        id: '0x92b8527aabe59ea2b12230f7b532769b133ffb118dfbd48ff676f14b273f1365'
    },
    {
        token: 'Equity.US.CRL/USD',
        id: '0xffd5fb797551c47a8afbe371a3223489615969197332e02a412d79cd59a8423f'
    },
    {
        token: 'Equity.US.CRM/USD',
        id: '0xfeff234600320f4d6bb5a01d02570a9725c1e424977f2b823f7231e6857bdae8'
    },
    {
        token: 'Equity.US.CRWD/USD',
        id: '0xbaed936d3c6c2e34104e92c6b015b97ce96adc5ab4f04230c1270e1162e7a270'
    },
    {
        token: 'Equity.US.CSCO/USD',
        id: '0x3f4b77dd904e849f70e1e812b7811de57202b49bc47c56391275c0f45f2ec481'
    },
    {
        token: 'Equity.US.CSGP/USD',
        id: '0xc858b58bd00ea15770243cf7410c5fbcd09b4ff12775d6279464a2508d660932'
    },
    {
        token: 'Equity.US.CSX/USD',
        id: '0x74f3621e920f9a9d78595ed957c9090007d19e82f7c0edbe89a392bafec62c64'
    },
    {
        token: 'Equity.US.CTAS/USD',
        id: '0x3aac822069ed803b272ade5510441f32b97501963cad9598ae61238bd8843aa5'
    },
    {
        token: 'Equity.US.CTRA/USD',
        id: '0x5f28e3b079837ccba948864610ef7a436235aaed53d3b3c72e1c2b2d2d825407'
    },
    {
        token: 'Equity.US.CTSH/USD',
        id: '0x440045c78d204a0ec4aba5fdeebcc10a7eb9cd3a3df4a89e3aa917653db8ef04'
    },
    {
        token: 'Equity.US.CTVA/USD',
        id: '0x5fcafa59eadb26d764ed8de3d1ce071a4a9337dddf093ee8a7bace713aed7f22'
    },
    {
        token: 'Equity.US.CVS/USD',
        id: '0x016eb8866d4455bcce669bc745835fd1f00be9c9205602abb3a2b3cc31e993ff'
    },
    {
        token: 'Equity.US.CVX/USD',
        id: '0xf464e36fd4ef2f1c3dc30801a9ab470dcdaaa0af14dd3cf6ae17a7fca9e051c5'
    },
    {
        token: 'Equity.US.CZR/USD',
        id: '0x806724043f1c85300d24b61da4e03ea9840c059d2cb8ea248f005e6314d27052'
    },

    //Non-crypto assets on pyth
    //D-DXCM

    {
        token: 'Equity.US.D/USD',
        id: '0xa4102a6d0a6a6e5bf66fa3599411d688f8b253d38db982a266c5eec6ba042c8a'
    },
    {
        token: 'Equity.US.DAL/USD',
        id: '0x8af4d43c43e35e6849f686e831f8201d3e868e921ac22de97d6acebde95d2829'
    },
    {
        token: 'Equity.US.DASH/USD',
        id: '0xaf9f76555c0147ec660100ff1639eb128e48c4f16b0aec229b736c04e082de23'
    },
    {
        token: 'Equity.US.DAY/USD',
        id: '0xa5339e81ef1422dc856798fb93c93d57b2be1dcd4ec02a0d562b12f213c2d666'
    },
    {
        token: 'Equity.US.DD/USD',
        id: '0x9f740601dfd8fc74556b8b90e807240f7dff3c3bb91c44f131a8306361220c7e'
    },
    {
        token: 'Equity.US.DDOG/USD',
        id: '0x5c49964b5e5420d84e445a2f5e9e3965cf3a82a275d83f8efc30cdeeaf2d062f'
    },
    {
        token: 'Equity.US.DE/USD',
        id: '0xc2d23f236142a519929b147c4dbe8720475724918c8b8473db0283f8cf044184'
    },
    {
        token: 'Equity.US.DECK/USD',
        id: '0xd31cf7d2e7a6a971b74c72815830c642d10a3c4cb170163b30833db9fb1d3d60'
    },
    {
        token: 'Equity.US.DEFI/USD',
        id: '0x78c13ca4415e910dcb9516b811e630e6fa8f98999615eb66955cbef4337c1d3f'
    },
    {
        token: 'Equity.US.DELL/USD',
        id: '0xa2950270a22ce39a22cb3488ba91e60474cd93c6d01da2ecc5a97c1dd40f4995'
    },
    {
        token: 'Equity.US.DFAC/USD',
        id: '0x3f2248ef2d37b8f3cad014b64fb1d7506254feaed383220219e73406bd458b6b'
    },
    {
        token: 'Equity.US.DFS/USD',
        id: '0xd1ccbe23ce799dbdd27137cfb4b51a9836b9d6458adce065f5df26e7f11f6740'
    },
    {
        token: 'Equity.US.DG/USD',
        id: '0xdf48fe2e8442694202366ab9de55554ecc68c9e0cfa385fc692c6905a3887d34'
    },
    {
        token: 'Equity.US.DGRO/USD',
        id: '0x1519a1216a7556cda9e89554706127a1f39c36d96d5471889bbeaf2f78eaf5bd'
    },
    {
        token: 'Equity.US.DGX/USD',
        id: '0xeccf190dca034f378b3b3051e70da93e882c08c665befbf01bacd866c1976fef'
    },
    {
        token: 'Equity.US.DHI/USD',
        id: '0xa2c9466d7558768573d83ad57735177d8448098d0a87aca9ca2ae9a9585bbdcc'
    },
    {
        token: 'Equity.US.DHR/USD',
        id: '0x725ae6c67201359f9601d6ee8228c821f0abc93fef5cc509acfcee3f7bc2a388'
    },
    {
        token: 'Equity.US.DIA/USD',
        id: '0x57cff3a9a4d4c87b595a2d1bd1bac0240400a84677366d632ab838bbbe56f763'
    },
    {
        token: 'Equity.US.DIS/USD',
        id: '0x703e36203020ae6761e6298975764e266fb869210db9b35dd4e4225fa68217d0'
    },
    {
        token: 'Equity.US.DLR/USD',
        id: '0x5af7f961ea231d5f4bd19dc99d1fd43f6de67ab57b73779f9ebe65a6a4ab64d5'
    },
    {
        token: 'Equity.US.DLTR/USD',
        id: '0x5d9f295f1afeaa993f9e07600158a1b8566c27e003a929d123f9b6c97164da0e'
    },
    {
        token: 'Equity.US.DOC/USD',
        id: '0x0adae539549d8495edc5cfc14dfed8974fe440a8c195df187d1a75bb3bb7b441'
    },
    {
        token: 'Equity.US.DOV/USD',
        id: '0xb9a51a477586da4fca62f1c20002b1f72d715733aa242cda5e99ca37beffdf0e'
    },
    {
        token: 'Equity.US.DOW/USD',
        id: '0xf3b50961ff387a3d68217e2715637d0add6013e7ecb83c36ae8062f97c46929e'
    },
    {
        token: 'Equity.US.DPZ/USD',
        id: '0xac8965f0ed1f9003909d9826d3fe783a45c5021bce71a40341d0ba06140c6431'
    },
    {
        token: 'Equity.US.DRI/USD',
        id: '0xf2f92d342955b934fa72137c7ed461dfd3e3112a7b962070440190b8184a7ab5'
    },
    {
        token: 'Equity.US.DTE/USD',
        id: '0xa751259432cd627edc50b32f22010b355486a5743fff310ad8d9946d45c48d4b'
    },
    {
        token: 'Equity.US.DUK/USD',
        id: '0x914c7f24178681e916139175ca651271ea14c340c4ba5e0c7787162020a9e79b'
    },
    {
        token: 'Equity.US.DVA/USD',
        id: '0x316c3f180861da3a9c8f0254d961dbebc2055491d469f459170337233de2e0e9'
    },
    {
        token: 'Equity.US.DVN/USD',
        id: '0xba9e386c7cff73f68e17ee14f3f8a190afa842621527ec5f542968c516759df4'
    },
    {
        token: 'Equity.US.DXCM/USD',
        id: '0x7afba60a06a553edc3339b53c2e46c2700b076b3f9c9067b88b93f0a12213fbf'
    },
    
    //Non-crypto assets on Pyth Network
    //EA-EZBC, Equities

    {
        token: 'Equity.US.EA/USD',
        id: '0x4a6538143c76292692d430d939d868cc15ca22b9c551cf683f1c59374b38594b'
    },
    {
        token: 'Equity.US.EBAY/USD',
        id: '0x6264a259e2cc90dfd3207f5831949eced2da6bf53965834c9160e4ceb9240947'
    },
    {
        token: 'Equity.US.ECL/USD',
        id: '0x60bd1ddb5b55fc99af50cba723ceeecc68067a8e23cc2df420df5b36873744e2'
    },
    {
        token: 'Equity.US.ED/USD',
        id: '0x04fefda6091b212f5445fd4286eacfa417f58c10e42fded88fabb17beb208fea'
    },
    {
        token: 'Equity.US.EEM/USD',
        id: '0xd407e68cec58205be82a6140a668dc42f8d9079bcf3be4aa4b41f41f7b983035'
    },
    {
        token: 'Equity.US.EFA/USD',
        id: '0x3b7ef6c95ceedbffbb66bff3d6135a200c5d0a0466b0c90812510ceaedebaf04'
    },
    {
        token: 'Equity.US.EFX/USD',
        id: '0xefd52d85fdad1aec47798b6955efd22fccd1e88ec942d3dfb3cbddb8ea2a577b'
    },
    {
        token: 'Equity.US.EG/USD',
        id: '0x1ebf3dd05546ce87c5a2892404717bca81a7b191f893244ad27f6ced751ae38d'
    },
    {
        token: 'Equity.US.EIX/USD',
        id: '0x920b1e06e2f2920c682534620a82c7991accd0637b1fb58a5631357ce42a4e29'
    },
    {
        token: 'Equity.US.EL/USD',
        id: '0xce8211e981a578b4ba9f2f7eb01c40643dc1d0860f57178d76c9bec95c88462f'
    },
    {
        token: 'Equity.US.ELV/USD',
        id: '0x5fc195aa6556b6b2ce09bd3308c6b872bf9b85682d54ec92ed910172b319a9f0'
    },
    {
        token: 'Equity.US.EMN/USD',
        id: '0x7caa8b2689bd66b4ff025a0f2bef623b356f4904fc4b4323453126b0ba77f104'
    },
    {
        token: 'Equity.US.EMR/USD',
        id: '0xe1c0e5aaf1842d3efb806d14a7cd21160d4b7c0f96746e0fa1227ae961bf3929'
    },
    {
        token: 'Equity.US.ENPH/USD',
        id: '0x5ec583659f690a921cd7a5be9dd2730d67b2541528ca5b1ff99df3e5d44bbedb'
    },
    {
        token: 'Equity.US.EOG/USD',
        id: '0x8a6a338e7cd256a83e4f27d7cf7ebe4983cae694a00762ef25c6c7da5607124e'
    },
    {
        token: 'Equity.US.EPAM/USD',
        id: '0x71964eba24eb7fb3b8be60d8c2a4809f1eb6574cba978cab0795b65ba6f32646'
    },
    {
        token: 'Equity.US.EQIX/USD',
        id: '0x66eb6cfa3a28e8e7cad538a55872ac0e41a2741ca66a29c1dc5540f2b1fb6fb6'
    },
    {
        token: 'Equity.US.EQR/USD',
        id: '0x788fd7744aac2f3ec325be7a944aa6620102f961dac93ca28f752f0b442b4874'
    },
    {
        token: 'Equity.US.EQT/USD',
        id: '0xad81a87631f8ab7f09897d7001e46e206afa727c419d93f31591a8edefdf37cb'
    },
    {
        token: 'Equity.US.ERIE/USD',
        id: '0x4b2dcf7c46475fe5a08554af8528a9fdcf2596ce3db92c29aacdf2004795a72d'
    },
    {
        token: 'Equity.US.ES/USD',
        id: '0xe0b9598e00ab485a49941feceb653d02e7b50f8e0074d5fab1d561add4f8c125'
    },
    {
        token: 'Equity.US.ESS/USD',
        id: '0xcac64835d33852ea56d0da42bc2057a1e5baa66360ba368630e0cabc1b9fa2bc'
    },
    {
        token: 'Equity.US.ETN/USD',
        id: '0xb1cf984febc32fbd98f0c5d31fed29d050d56a272406bae9de64dd94ba7e5e1e'
    },
    {
        token: 'Equity.US.ETR/USD',
        id: '0xdd3baa1ebafa53b0a8b1e208f2e8df9dfed597f8b93d0fead0e84d8f4a0336d9'
    },
    {
        token: 'Equity.US.EVRG/USD',
        id: '0x8fa90a86d593ae81e23fe16272b1d572d971d4f7a749e01841b91fec6d24e10e'
    },
    {
        token: 'Equity.US.EW/USD',
        id: '0x54a39d1072d96389f124055a1da65d20f3b130719a2b615009ef30afecc7146a'
    },
    {
        token: 'Equity.US.EWH/USD',
        id: '0x5c7e5c28ac515e94b0e4c3addeddd10b997d5e389cc6ded138510fe2987f94ec'
    },
    {
        token: 'Equity.US.EXC/USD',
        id: '0x9beecfa17137405edde62ca98241e24c86d217282f8e193ee6c8fc40aae01092'
    },
    {
        token: 'Equity.US.EXPD/USD',
        id: '0x6aae0b67e75b4ebd942e31b61020aa08489b33787256e66e63c7f5085eba47e6'
    },
    {
        token: 'Equity.US.EXPE/USD',
        id: '0x1aed988d2a3349d64e8a34c0d71535e01d17bf6b80c4d99138288af251822552'
    },
    {
        token: 'Equity.US.EXR/USD',
        id: '0x0b47051e9531b81dc79bfdaa7f2483d23a7eb2f99b6816c815284a6fdef83346'
    },
    {
        token: 'Equity.US.EZBC/USD',
        id: '0x337611acbeb14ef4ea0d754226bc8b900ff5fd2e469e762a4b135034c3ed9897'
    }











]