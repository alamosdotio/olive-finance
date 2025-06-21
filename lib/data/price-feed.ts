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
    },
    //Non-crypto assets on pyth
    //F-GWW, Equities

        {
        token: 'Equity.US.F/USD',
        id: '0x6c267962d46cec4a5baf6105de67ef08e1306f75973ce6eb8db8527f06e28f33'
    },
    {
        token: 'Equity.US.FANG/USD',
        id: '0xd3d57d3634cff1c062a1b87cc93a92b8dacc6537f9f7d155e81ed48bb9fd75f9'
    },
    {
        token: 'Equity.US.FAST/USD',
        id: '0xf5d11dd2f66a2cc27fa25caf2c7fd45caa33045e8e3d55dc825ca830c68397b5'
    },
    {
        token: 'Equity.US.FBTC/USD',
        id: '0xb3a76e70a55517e0405cc90a2545de4c30413c13c532caf96a734103ec4259e9'
    },
    {
        token: 'Equity.US.FCX/USD',
        id: '0x2b5735ead9b057b3fb96a422740ab26bdfcb1f2b5d4cd9d052f45311ef0f2952'
    },
    {
        token: 'Equity.US.FDS/USD',
        id: '0x071301c678e65e5e0530e6f8ff4eb655e23ff0252bb7f4112c89b2496329ab15'
    },
    {
        token: 'Equity.US.FDX/USD',
        id: '0x1d36f0faa0688b4250f12560718e9989138e20a3a8a77c0b4144792e363a6cb0'
    },
    {
        token: 'Equity.US.FE/USD',
        id: '0x0c1b5aa4ee8447c6251ddf07225edf15d4e6b9796a59afc349a3a9c4575e2c1f'
    },
    {
        token: 'Equity.US.FFIV/USD',
        id: '0x730aa1975c578f652b6f48667a8bc4ab1e499273cb4742198075b5494b47a29e'
    },
    {
        token: 'Equity.US.FI/USD',
        id: '0x4ba8ac75eba39c9cc1851bc880d4274262e621df32284ab23064865b7dc5ab44'
    },
    {
        token: 'Equity.US.FICO/USD',
        id: '0x84df202649f46e6362e38abcf5cd6947bc7e4379e8e281f1d02b382355c13aa3'
    },
    {
        token: 'Equity.US.FIS/USD',
        id: '0x50e1734e9f300ebe0af038055c76c1495a3b7a6389edce24eedcb1df9061120d'
    },
    {
        token: 'Equity.US.FITB/USD',
        id: '0x46a08c0ec7e78c610b835e7e6268f1f6aea10788890b2d72057f7a62a646ab2d'
    },
    {
        token: 'Equity.US.FMC/USD',
        id: '0x44955964544081c152e716f67f166083123d902d9436d2ea555e001ce2645860'
    },
    {
        token: 'Equity.US.FOX/USD',
        id: '0xa39fde03881da4314af515f7ab59e66e111552935e3fe9727a721491105d1f3f'
    },
    {
        token: 'Equity.US.FOXA/USD',
        id: '0x31b0d22a8ef589d5cd9541d598d95ccc4b7a15fc427fa710e9214bfb3a8bf57b'
    },
    {
        token: 'Equity.US.FRT/USD',
        id: '0x5626d50ed29cdc5774f52ebef13b61df4767c871bba385d44fb1a2875977eb8b'
    },
    {
        token: 'Equity.US.FSLR/USD',
        id: '0x787a166618ea8831a100371b51be91328b0171d0ac57265007b30f10e03de4e6'
    },
    {
        token: 'Equity.US.FTNT/USD',
        id: '0x7c09a3b332c3efc8c9a90da4ab26bb9eca53e1f147a0960cf458980d1aba97ef'
    },
    {
        token: 'Equity.US.FTV/USD',
        id: '0x8872d930ce5c58a3a4dab23a34e4bcdb6b0793573723c9a1945bcdd6e097b83c'
    },
    {
        token: 'Equity.US.GBTC/USD',
        id: '0xdc1498a077fef2b6e139e6212da2849c6c64a60f3ce9e13634aea9cf7ff7cae5'
    },
    {
        token: 'Equity.US.GD/USD',
        id: '0x894e9c429f83fe4f35fda679568348418bafe5a0a68e1cccc8e51a137e879ce9'
    },
    {
        token: 'Equity.US.GDDY/USD',
        id: '0xdb81d5006b97f915f7f34bd396df8cc84c436e4e76f3849ae6e70ad2585fdf0d'
    },
    {
        token: 'Equity.US.GE/USD',
        id: '0xe1d3115c6e7ac649faca875b3102f1000ab5e06b03f6903e0d699f0f5315ba86'
    },
    {
        token: 'Equity.US.GEHC/USD',
        id: '0x673e1dd093b996eeec37946467e9ad79dc4a613ba8c1c9c06ce2a0ae605051f3'
    },
    {
        token: 'Equity.US.GEN/USD',
        id: '0x1112194b9abe505c202d243be6f5de5a9c80e40a09082e07f06b6805d04ae54d'
    },
    {
        token: 'Equity.US.GEV/USD',
        id: '0x57e28b0f0ab18923f5c987629c0c714b9b46c87e729ed95ed6e23e466e8d1e0c'
    },
    {
        token: 'Equity.US.GFS/USD',
        id: '0x8cbec525dd085e025e7a4cb0fa5041a9db203ff0ed5919d9f14e61fff8bfe062'
    },
    {
        token: 'Equity.US.GILD/USD',
        id: '0x29148f7de5819fe7467e99f5f0b22e8fb124d958d8f668c3c17e607d7ed1eb09'
    },
    {
        token: 'Equity.US.GIS/USD',
        id: '0x771e3685ccdb5ea732fc6e562b72d9f9217823d7ab4884acb2d085c4ee0bc8a0'
    },
    {
        token: 'Equity.US.GL/USD',
        id: '0xd7e307b27dd075c7296b0e75e14a481b3adb588be47ca032403e1d721e3e352c'
    },
    {
        token: 'Equity.US.GLCNF/USD',
        id: '0x63ef768807de89d4b21c1efbb938923813cb6e043759c4019540f5d94825698e'
    },
    {
        token: 'Equity.US.GLD/USD',
        id: '0xe190f467043db04548200354889dfe0d9d314c08b8d4e62fabf4d5a3140fecca'
    },
    {
        token: 'Equity.US.GLW/USD',
        id: '0x6ef62b860055ef6819af274064e5aa597aa9d0963ce3109c51d996264844776e'
    },
    {
        token: 'Equity.US.GM/USD',
        id: '0xdf8109bbec79e2b24ce326c3be5ca0036a88ed20800ec0aa54ccc2bc7811bd3b'
    },
    {
        token: 'Equity.US.GMBXF/USD',
        id: '0xa54d01262b4a82334e828d835eb4975a772303ad39e2ff20a146fc1d80bb4e45'
    },
    {
        token: 'Equity.US.GME/USD',
        id: '0x6f9cd89ef1b7fd39f667101a91ad578b6c6ace4579d5f7f285a4b06aa4504be6'
    },
    {
        token: 'Equity.US.GNRC/USD',
        id: '0x27514c8e57a0fad5e095546852c0903319b66ab07f7526b5ac1540886d6d944e'
    },
    {
        token: 'Equity.US.GOOG/USD',
        id: '0xe65ff435be42630439c96396653a342829e877e2aafaeaf1a10d0ee5fd2cf3f2'
    },
    {
        token: 'Equity.US.GOOGL/USD',
        id: '0x5a48c03e9b9cb337801073ed9d166817473697efff0d138874e0f6a33d6d5aa6'
    },
    {
        token: 'Equity.US.GOVT/USD',
        id: '0xe0f87bbde799f33615b83a601b66415e850788000cd7286a3e7295f23c1bb353'
    },
    {
        token: 'Equity.US.GPC/USD',
        id: '0x045d3f99bd576f475f195276d699ad1dbeedfcab92f29f1b8159f02bd9ee07d7'
    },
    {
        token: 'Equity.US.GPN/USD',
        id: '0xcb179114c1a25a33def036ff8a3bf7260cd8035b7e3225e84754953f91e7e2f5'
    },
    {
        token: 'Equity.US.GRMN/USD',
        id: '0x14226b55af532f2fdea5928cff806c6073f67da5b9333672f709e7cf1e5ee7c6'
    },
    {
        token: 'Equity.US.GRND/USD',
        id: '0xca320d73da49ed89083480db02fbe5cd352d8bd98c9c7310336c82c32f9dbbd6'
    },
    {
        token: 'Equity.US.GS/USD',
        id: '0x9c68c0c6999765cf6e27adf75ed551b34403126d3b0d5b686a2addb147ed4554'
    },
    {
        token: 'Equity.US.GWW/USD',
        id: '0xbf20e149c45ec15b78eb4a61d0bbae625acc0dadacf9c3b76c3bb8de9346d3ec'
    },
    //Non-crypto assets on pyth
    //HAL-IXUS
        {
        token: 'Equity.US.HAL/USD',
        id: '0x8ecca7012d5cd82620c1222acd6296cb4a34fea7dae4bf93bc51ddc471830a53'
    },
    {
        token: 'Equity.US.HAS/USD',
        id: '0xab3a0f9d8e8565e58225a4e8bbe6bdf0ae8894aa3a1081aec1cf728fa61d7e4f'
    },
    {
        token: 'Equity.US.HBAN/USD',
        id: '0x92594609a3d435e8e880e36f6ac87794edbe9d3ac3df18fbfdab3b5dd33425db'
    },
    {
        token: 'Equity.US.HCA/USD',
        id: '0xdc85ae0ea74bb56972b162f1c9c48727015b774c25fd0e3c150cc18ce28bf2e5'
    },
    {
        token: 'Equity.US.HD/USD',
        id: '0xb3a83dbe70b62241b0f916212e097465a1b31085fa30da3342dd35468ca17ca5'
    },
    {
        token: 'Equity.US.HES/USD',
        id: '0x1c4a7344f8bd0e536c5430c55af295a31748ced0f0a4ebe13a491bf282d7c499'
    },
    {
        token: 'Equity.US.HIG/USD',
        id: '0xb8a84e7acb92be6f24b60cec80e87b84ec46780774e15d9791fc018b7ad49492'
    },
    {
        token: 'Equity.US.HII/USD',
        id: '0x659c675091db659251f2077293bf9e71aef2c978dd729c2be66cec0d41c1d671'
    },
    {
        token: 'Equity.US.HLT/USD',
        id: '0x02e83f2c834b9f2e495066b17da13c7caa5551a8378c6dff7f217166d9194588'
    },
    {
        token: 'Equity.US.HODL/USD',
        id: '0x69f766aa85e9273ab49eaafcfbf054dc12fdba781e4029ebd1c3993d5d5246c2'
    },
    {
        token: 'Equity.US.HOLX/USD',
        id: '0x7c19118ae1715b2b289d122ef5983fd31231e31e410937cbb64aa307ac91dcea'
    },
    {
        token: 'Equity.US.HON/USD',
        id: '0x107918baaaafb79cd9df1c8369e44ac21136d95f3ca33f2373b78f24ba1e3e6a'
    },
    {
        token: 'Equity.US.HOOD/USD',
        id: '0x306736a4035846ba15a3496eed57225b64cc19230a50d14f3ed20fd7219b7849'
    },
    {
        token: 'Equity.US.HPE/USD',
        id: '0x069b87074893c37fd250990df7409d7e19cd649bea8e28904a0fd49915f4e53a'
    },
    {
        token: 'Equity.US.HPQ/USD',
        id: '0xd1d6eb75702d0e80582c2d5a2df1849b9c83d7afbe99a2d474317f1f356e5659'
    },
    {
        token: 'Equity.US.HRL/USD',
        id: '0xb0dd9f829e915a1c103427394ff479da7f1de2b0e8fdad3d3b46012c37b05ac9'
    },
    {
        token: 'Equity.US.HSIC/USD',
        id: '0x8397ec3fb0eb764ecc05f530d6fcaa72731517fe919714f43f3bbf9387b1e669'
    },
    {
        token: 'Equity.US.HST/USD',
        id: '0xae35d2d68b05a98d8041dae04fed0a3a6e5a3a1007a5d5d10d62169d208271b8'
    },
    {
        token: 'Equity.US.HSY/USD',
        id: '0x824852f734257f78f21791d6082fa7d3380da95a16d248d50a6e9706d0a0fbec'
    },
    {
        token: 'Equity.US.HUBB/USD',
        id: '0x492f2b794efb3721b4243406d73cf68f34097b103ba690d0dbcafddb5a10cb7e'
    },
    {
        token: 'Equity.US.HUM/USD',
        id: '0x6469e80c4a4a3bed520e0882051c6f0dbc8d57c217b16662db6cfd3f6288de2c'
    },
    {
        token: 'Equity.US.HWM/USD',
        id: '0xb8f2bb034ab00c83a9a4e4bc4f8254c139631f56f11deb6f99f00c34ce032478'
    },
    {
        token: 'Equity.US.HYG/USD',
        id: '0x2077043ee3b67b9a70949c8396c110f6cf43de8e6d9e6efdcbd557a152cf2c6e'
    },
    {
        token: 'Equity.US.IAU/USD',
        id: '0xf703fbded84f7da4bd9ff4661b5d1ffefa8a9c90b7fa12f247edc8251efac914'
    },
    {
        token: 'Equity.US.IBIT/USD',
        id: '0x9db6bc1e6e9e5e60f6884e1cd8e4399cca9d0454c6e7234ad79680cf139748f5'
    },
    {
        token: 'Equity.US.IBM/USD',
        id: '0xcfd44471407f4da89d469242546bb56f5c626d5bef9bd8b9327783065b43c3ef'
    },
    {
        token: 'Equity.US.ICE/USD',
        id: '0xb2e33e4daa44d9b0c0783ededd335520a0f7eeed7608ff60c93c7c2294b2d813'
    },
    {
        token: 'Equity.US.IDXX/USD',
        id: '0xb28cc2e71cd5b1638c7aeefae54ceed579be828e52a56de0431fd428cca67791'
    },
    {
        token: 'Equity.US.IEF/USD',
        id: '0x034626d18bc711c55c71e27319f8851f483bc08a7f97be2dee9ea8f7ccd59248'
    },
    {
        token: 'Equity.US.IEFA/USD',
        id: '0x3e959410e8daa7941a4d2179332a3ab1d38e78dd8d83134996e65a3f4352f828'
    },
    {
        token: 'Equity.US.IEMG/USD',
        id: '0x96b1207c795f31283f5e44c527a1db18cacfb68de745a0de326611b0b5af3fc3'
    },
    {
        token: 'Equity.US.IEX/USD',
        id: '0x9e7c3edfc8ebb80bf14d7d9d2ffa589387859b20c401476bbcf69566512c097b'
    },
    {
        token: 'Equity.US.IFF/USD',
        id: '0x970222a3ff77f133b83c49989d8d8fcbad034fcc601f457e4a45cee6bfe5be36'
    },
    {
        token: 'Equity.US.IJH/USD',
        id: '0xab4b0a2fad7f23125a7a94eec46204fcf1ba69bb81d32778db0ba3e66df6772a'
    },
    {
        token: 'Equity.US.IJR/USD',
        id: '0xca0bac9d1826b4a222320f58d47ed66bdc95722124578ed50803674ccd99a775'
    },
    {
        token: 'Equity.US.INCY/USD',
        id: '0x7815579f89646eef8d679057e84ffa69158e3f5f1bfa5b5cbd9a65e38a4c2a3a'
    },
    {
        token: 'Equity.US.INTC/USD',
        id: '0xc1751e085ee292b8b3b9dd122a135614485a201c35dfc653553f0e28c1baf3ff'
    },
    {
        token: 'Equity.US.INTU/USD',
        id: '0x43ef64ff6af44e0648f0328ee56e88fee57943b0aa077c24ef175bb9ecd37133'
    },
    {
        token: 'Equity.US.INVH/USD',
        id: '0x3238d1e2df1760cacca8510e997cf6d45076a1b066e4e201d18881bf27aaf4ba'
    },
    {
        token: 'Equity.US.IP/USD',
        id: '0xd7b753e70cea474508a2f0cd0ae5b7ac67662eb648a88afe68f04759464ccc8d'
    },
    {
        token: 'Equity.US.IPG/USD',
        id: '0x18044a8755f961d11132e5d46e403143fcae8f789665a941cb5685dcc6c9ff0c'
    },
    {
        token: 'Equity.US.IQV/USD',
        id: '0xeab2a462fdee81002bc99e22cbaceb1b0fcbeceed8fa28a6d2f567880eb24e4d'
    },
    {
        token: 'Equity.US.IR/USD',
        id: '0x2abd60bfdf45bf74d29e1d4bcc815f0f1a81093cd51f49040e2856b1115fcd08'
    },
    {
        token: 'Equity.US.IRM/USD',
        id: '0xdcc697370beafb46fade6467328cd2f268b4b4e41c23b2189e649e21d120d76d'
    },
    {
        token: 'Equity.US.ISRG/USD',
        id: '0xad4dc1db82c47e0822afef9d9eca7bf693cdad20dd61fcd5aa1b6895b1b90190'
    },
    {
        token: 'Equity.US.IT/USD',
        id: '0x22eb56a8faa26639943a3f96ab2b0b5fee3fb9c888789da4107d56ffe0471503'
    },
    {
        token: 'Equity.US.ITA/USD',
        id: '0x79f7f0b79a6b7fdc0d7d9e8b6337fd709b8eea9dc6f57b6174c84816cae88bfd'
    },
    {
        token: 'Equity.US.ITOT/USD',
        id: '0xde7279ce7d805c43c4893239b77aa07525df93c9f8ede0bd8b3d87609dd80415'
    },
    {
        token: 'Equity.US.ITW/USD',
        id: '0x2b610a0d95397c20582741b53d61d5e79bab7bebbd5793546e90662f8f6ce0b9'
    },
    {
        token: 'Equity.US.IUSB/USD',
        id: '0x9e530d43756213889ebee4ac3aa0b96f6c7d5f4771e8fb777b76eb5905543d5c'
    },
    {
        token: 'Equity.US.IVE/USD',
        id: '0x032a22cf23ae07db0f787cdd9f69b7f41110c0cf3f29923edccbe0d567f99cbb'
    },
    {
        token: 'Equity.US.IVV/USD',
        id: '0x5967c196ca33171a0b2d140ddc6334b998dd71c2ddd85ba7920c35fd6ed20fe9'
    },
    {
        token: 'Equity.US.IVW/USD',
        id: '0x1b79d5b75253c291cc72d40cc874f468d07c1e6c149ee298a00d8075cb10c2c0'
    },
    {
        token: 'Equity.US.IVZ/USD',
        id: '0x45b4d37b660364a2bf23a9bdc0ed53b12b84fb85a334b711ba77d6a6533a3bff'
    },
    {
        token: 'Equity.US.IWB/USD',
        id: '0x1154bf293d452777db2e1b96649df3375d068bb0bce604c8c10b02472bd158f4'
    },
    {
        token: 'Equity.US.IWD/USD',
        id: '0xa156d1ca2a4b99c27d8402ec0dd4cad5568d12d3e37764254ab10cc55a8d870c'
    },
    {
        token: 'Equity.US.IWDA/USD',
        id: '0x043cfcce46f77fb2bc7ab360e7250aa6ab966781bea1cbf6bc5b8ac3e15e6e32'
    },
    {
        token: 'Equity.US.IWF/USD',
        id: '0xefc46125a2063f8662815a3c5d78f20aa0c4e6dde0862364a6f5d2f47d862ac1'
    },
    {
        token: 'Equity.US.IWM/USD',
        id: '0xeff690a187797aa225723345d4612abec0bf0cec1ae62347c0e7b1905d730879'
    },
    {
        token: 'Equity.US.IWR/USD',
        id: '0x216f5e294659837328cfe78f262ab628b83e1f436941b5e43500b48869e4e28e'
    },
    {
        token: 'Equity.US.IXUS/USD',
        id: '0x65d24596a828114c481bf8632dc1a182b545337dc696538857a54933c2576e8a'
    },

    //Non-crypto assets on pyth
    //J-MUB, Equities

    {
    token: 'Equity.US.J/USD',
    id: '0x04ac3a2e7287b5fe9733a415bc7c81d4d4ffdfebc3b7d726b9552623444f8036'
    },
    {
    token: 'Equity.US.JBHT/USD',
    id: '0x27af75b9414384273378f90ccc53bec01dc8adf3662c4f7e6ec0645622af55bb'
    },
    {
    token: 'Equity.US.JBL/USD',
    id: '0xd8226a5920c7fbfe9bf9b159ab25855fb07c66b28c0941c1d36b247e382add95'
    },
    {
    token: 'Equity.US.JCI/USD',
    id: '0xf6207ac0b3f712a3021a91f87ff0f03279e5df5126f4e9657f3e4cb3e18ab0f0'
    },
    {
    token: 'Equity.US.JEPI/USD',
    id: '0xbb3ba10444c2f231868444856a0c6bd97b92fc868f5272fb1ad5b90c2c40d800'
    },
    {
    token: 'Equity.US.JEPQ/USD',
    id: '0x32f8189b4ee26ea708553cf99a70163e6877c6681e5ba61673fdee89a671daff'
    },
    {
    token: 'Equity.US.JKHY/USD',
    id: '0x87ea4968e650693b61926526d4b3cb7ee32f4f71217b0e181732ba6e14f9d124'
    },
    {
    token: 'Equity.US.JNJ/USD',
    id: '0x12848738d5db3aef52f51d78d98fc8b8b8450ffb19fb3aeeb67d38f8c147ff63'
    },
    {
    token: 'Equity.US.JNPR/USD',
    id: '0x4417bd557ab521fd4419ff46a604f5bda29c74082bbb28bd610f6d0c9873aa63'
    },
    {
    token: 'Equity.US.JPM/USD',
    id: '0x7f4f157e57bfcccd934c566df536f34933e74338fe241a5425ce561acdab164e'
    },
    {
    token: 'Equity.US.JPST/USD',
    id: '0x52734824218d0361974ca000862f511aefdb51d608b762f16d59e372754b8909'
    },
    {
    token: 'Equity.US.K/USD',
    id: '0xecca4c7d5406b31d7734ff3ac7f2aad3b7ff6a8bfbeca1585aa35114ea7f979e'
    },
    {
    token: 'Equity.US.KDP/USD',
    id: '0x7b4b63935159e95489a446817966b95798bf92730d5a2439a9b164022c55671b'
    },
    {
    token: 'Equity.US.KEY/USD',
    id: '0x2f7524ff6f342a9ee55328570d30a64eadd3ef6b8673fcb9015ed11845130e43'
    },
    {
    token: 'Equity.US.KEYS/USD',
    id: '0x0a89d9c67435e8563fbf1bd1d3da9578fd07edfc2af55e92acf532cc9951a90a'
    },
    {
    token: 'Equity.US.KHC/USD',
    id: '0x4e9e00488e093d440381d5cc21ac74da5d78f13d83665b7d140cbc84760cc95c'
    },
    {
    token: 'Equity.US.KIM/USD',
    id: '0xf3d7864c65d3a6c00bd148c1daf95361de93ee36619180b194f656b053d6e80e'
    },
    {
    token: 'Equity.US.KKR/USD',
    id: '0xaef0db13545e411bfc9d17e7eba913b0a5376c6af415a33240b546f773b25105'
    },
    {
    token: 'Equity.US.KLAC/USD',
    id: '0x9c27675f282bfe54b5d0a7b187b29b09184d32d4462de7e3060629c7b8895aad'
    },
    {
    token: 'Equity.US.KMB/USD',
    id: '0x894f78037ec2465fbbd50c75abb95a5059d5d9ca5f092e2e6736685885569322'
    },
    {
    token: 'Equity.US.KMI/USD',
    id: '0xf709b8c2869054ca5c3cef0a3a1a97ff4960aff3f3b4eb611022079b1ff73e50'
    },
    {
    token: 'Equity.US.KMX/USD',
    id: '0xd15031bc3bf24bc63cc48cf6d24a7a83b242a628be400b3db58fef089a4da854'
    },
    {
    token: 'Equity.US.KO/USD',
    id: '0x9aa471dccea36b90703325225ac76189baf7e0cc286b8843de1de4f31f9caa7d'
    },
    {
    token: 'Equity.US.KR/USD',
    id: '0xff6a38e7adcdaf6d9e02c4c597defcdd328c1e4fe98977c8cc6b27a2673e4f8b'
    },
    {
    token: 'Equity.US.KVUE/USD',
    id: '0xa31b64345bf1601d1cf1cfdb7a1f628982fab0a4365947b3c4fa2230faea971d'
    },
    {
    token: 'Equity.US.L/USD',
    id: '0xdbceeed2f816d22ae5371206fa28c8da7615537eced46373185f4bde8af54d27'
    },
    {
    token: 'Equity.US.LDOS/USD',
    id: '0xdf36d39cf7b927c357284441fde4115922d0d6180d4813e525047ea3a3c57f4b'
    },
    {
    token: 'Equity.US.LEN/USD',
    id: '0x8cac856141272010adc7a18017523804afef935e0fb8b80f58cb120133c6ed34'
    },
    {
    token: 'Equity.US.LH/USD',
    id: '0xe9288bb7d4d9a5910030e83e4333777c9a9cba3fbb0e4c04d32ede572f865971'
    },
    {
    token: 'Equity.US.LHX/USD',
    id: '0x87039ec0fdfba15a4cfc68d257f509182baa1281bf9e79cbb6eca09dbe694e7a'
    },
    {
    token: 'Equity.US.LII/USD',
    id: '0xea444ab0d128898102e59ad785374bb37b93fc1e2ae232591de288474df84d07'
    },
    {
    token: 'Equity.US.LIN/USD',
    id: '0x9146c5c900d9aea9579819cf50d1ae18b54dea58eea3c9a198102e4e458e652b'
    },
    {
    token: 'Equity.US.LKQ/USD',
    id: '0xc20e777da34a153d8aed2eb01da6790b7586997825035991099201cc7888c842'
    },
    {
    token: 'Equity.US.LLY/USD',
    id: '0x70dcf5fd56553d0023693e4b590336a8c9bcfd0d98dd9f093b1f697820d98325'
    },
    {
    token: 'Equity.US.LMT/USD',
    id: '0x880d96a272d5ccbb3cd6f6aacb881a996cb4976b3f252b58c595cd2a418b6ea9'
    },
    {
    token: 'Equity.US.LNT/USD',
    id: '0x0cfd0022c6dce91015449034e1189551e6037a51b60b820ddc9a255e9782c3c0'
    },
    {
    token: 'Equity.US.LOW/USD',
    id: '0xab31ec9dbcacacfb26e5ea6c249d69f5ae8b9c691aac6ccc5919b6107efa1c3a'
    },
    {
    token: 'Equity.US.LQD/USD',
    id: '0xe4ff71a60c3d5d5d37c1bba559c2e92745c1501ebd81a97d150cf7cd5119aa9c'
    },
    {
    token: 'Equity.US.LRCX/USD',
    id: '0x01a67883f58bd0f0e9cf8f52f21d7cf78c144d7e7ae32ce9256420834b33fb75'
    },
    {
    token: 'Equity.US.LULU/USD',
    id: '0x13a19eb6a936a8c7020fe675687979b44e991efbfb4d3d2ca91425ce57b9e6f8'
    },

    {
    token: 'Equity.US.LUV/USD',
    id: '0xf8554a560dd9f59f36aff9ea5536d1c281141907ebc010b2fa94f411f912e30b'
    },
    {
    token: 'Equity.US.LVS/USD',
    id: '0xaa0eed91fe7b824ad9931f8601647bec51870c76f7a5d6ead18c3df9ecb3c553'
    },
    {
    token: 'Equity.US.LW/USD',
    id: '0x06b275656e26bc5a36b4777b95463c9fc65855d34f3d9d4da99418472bb857f1'
    },
    {
    token: 'Equity.US.LYB/USD',
    id: '0x9b02cd30bda06e851c8a18bddd0bda152856de8b5c429f0f16232b6678d26afc'
    },
    {
    token: 'Equity.US.LYV/USD',
    id: '0xf75c8eea6033c8100271292fa6f77d50347a8cd010959116fa0ac3ba7315e9b8'
    },
    {
    token: 'Equity.US.MA/USD',
    id: '0x639db3fe6951d2465bd722768242e68eb0285f279cb4fa97f677ee8f80f1f1c0'
    },
    {
    token: 'Equity.US.MAA/USD',
    id: '0x8b624894cc6534a0442a22cce2324c3950fc74c848e7f10faf028ae160a762d6'
    },
    {
    token: 'Equity.US.MAGS/USD',
    id: '0xd15a61d3d79889976bcd6073904bd6f8087d13a1a8a738928a6a51aba34fde6f'
    },
    {
    token: 'Equity.US.MAR/USD',
    id: '0xb530350ede7b5d1876f37fe416799e8f15beaca77c82295a3857f02c913df0f2'
    },
    {
    token: 'Equity.US.MARA/USD',
    id: '0x0fc2ad77a9ab75bcbc3ebd7a9ff60facd08c517309e2d684baa979c910a0e43e'
    },
    {
    token: 'Equity.US.MAS/USD',
    id: '0x40dc86c2c74546803ea869c71c0aebd332d83ca417e7c60f41b71919f8d8421e'
    },
    {
    token: 'Equity.US.MBB/USD',
    id: '0x200171a4fb486c9f441fae51a19a4103ca70cc66d97f081ce032e137801b3830'
    },
    {
    token: 'Equity.US.MCD/USD',
    id: '0xd3178156b7c0f6ce10d6da7d347952a672467b51708baaf1a57ffe1fb005824a'
    },
    {
    token: 'Equity.US.MCHI/USD',
    id: '0x33e3853fe3382522aec843bcc3e795bc62ef9d48a47fe2ea7e777926a7ac70f7'
    },
    {
    token: 'Equity.US.MCHP/USD',
    id: '0x1f1a9da5ed94f81694aaf250155adc7c6cde842e4a3ee6e6b4cb6fc23c85667b'
    },
    {
    token: 'Equity.US.MCK/USD',
    id: '0x374c080d60c3d055199df45e3c54accd5f04f190f61cd050dae28dd2519871a6'
    },
    {
    token: 'Equity.US.MCO/USD',
    id: '0x81ec776dd73898187779458dcd0c282a91322c7bd5fcb38b565f1b94bd8adff0'
    },
    {
    token: 'Equity.US.MDB/USD',
    id: '0x91fc07facc1b1ec2e8336dfa66e2b5f0892af06f491c606f67690bf4c55aaee6'
    },
    {
    token: 'Equity.US.MDLZ/USD',
    id: '0x67af944e59c35746d41b15c061fa2552ea958accfc6169a69f1e05033c507fd2'
    },
    {
    token: 'Equity.US.MDT/USD',
    id: '0x1d762c633d4166a8d061518e187047afda1868cc524990262d8144e39dbb815f'
    },

    {
    token: 'Equity.US.MELI/USD',
    id: '0x5c149158ad0cca240ab13e45d93f43d7eb747a25acf5a9313b5b03c0aa87251b'
    },
    {
    token: 'Equity.US.MET/USD',
    id: '0xa1603db75317c40a21301cc11d58ffd69bea273f3473bfed479b4325300fc721'
    },
    {
    token: 'Equity.US.META/USD',
    id: '0x78a3e3b8e676a8f73c439f5d749737034b139bbbe899ba5775216fba596607fe'
    },
    {
    token: 'Equity.US.MGM/USD',
    id: '0x3600d9719b640ae821b323d2aecb55534136f5b4a8711245ac9a8e088ae3ae56'
    },
    {
    token: 'Equity.US.MHK/USD',
    id: '0x11a23693e76395d2f0d2b0300d27e3e342732420ab79e2ea9f586985330e3ecb'
    },
    {
    token: 'Equity.US.MINT/USD',
    id: '0x58f4ee3a0fc4de834a2e96274a696d0f3d8ec45fc76131a6a49fcd18d3ca9812'
    },
    {
    token: 'Equity.US.MKC/USD',
    id: '0xf84d53799267676ca75d07bae921233dcc9d856d1b7616a728fdad0a71ed6159'
    },
    {
    token: 'Equity.US.MKTX/USD',
    id: '0x088802f5582891ff3b0f7f853ec4a609a715f2ce5b4f61ba3769784b165ca3fd'
    },
    {
    token: 'Equity.US.MLM/USD',
    id: '0x58dfd9c50639f1a6c7ea8a1a94d07d69989b51a4265801420895c292fd68e7d4'
    },
    {
    token: 'Equity.US.MMC/USD',
    id: '0x0226ff84f3cf3752d80319b0fc4b5dc4d039408e7c5f7bf44bb642f8be2fdc8d'
    },
    {
    token: 'Equity.US.MMM/USD',
    id: '0xfd05a384ba19863cbdfc6575bed584f041ef50554bab3ab482eabe4ea58d9f81'
    },
    {
    token: 'Equity.US.MNST/USD',
    id: '0x579e60cbba314226de0f602f770113aa007bf1786ee37b923800028dc203d1e5'
    },
    {
    token: 'Equity.US.MO/USD',
    id: '0xad17639d5c5f937b0069f09a455c613c5b6feb8cf0ffb725de3942af96c0434b'
    },
    {
    token: 'Equity.US.MOH/USD',
    id: '0xf9754453fb83c7fdbae0d515438ca2a5cc6458bdb191a4df649bfbbe9c2ff29c'
    },
    {
    token: 'Equity.US.MOS/USD',
    id: '0x1521ce20ce13ff348ed80f54bc37127d2755caf524b9ad65e8ce881f85ed5054'
    },
    {
    token: 'Equity.US.MPC/USD',
    id: '0xf324ae399346b21a3f40e9a07984750dfde9a9d7b40999fb1c6d98a4243f5eed'
    },
    {
    token: 'Equity.US.MPWR/USD',
    id: '0xe51d5a490b7ff684e72104f092096d33ad8f6d0bbc617fbe893e23358f8e1c72'
    },
    {
    token: 'Equity.US.MRK/USD',
    id: '0xc81114e16ec3cbcdf20197ac974aed5a254b941773971260ce09e7caebd6af46'
    },
    {
    token: 'Equity.US.MRNA/USD',
    id: '0x4083b0b1471123cf4d3e8edee7890940cafad866f06cadae638c23e555a1f4fc'
    },
    {
    token: 'Equity.US.MRVL/USD',
    id: '0x7aef4e90557add5289266340ccd1e1aa7a225f1220206b07aaf98e53101ce116'
    },
    {
    token: 'Equity.US.MS/USD',
    id: '0x97b55381ff94c6c0a22f3e0c8cdc2186a3561bf3dfe3cfaebf4786c9318b770f'
    },
    {
    token: 'Equity.US.MSCI/USD',
    id: '0xcb9be05a0205676c4959845ada37452d3b9613d6602addd0ec223bdb33d81c8b'
    },
    {
    token: 'Equity.US.MSFT/USD',
    id: '0xd0ca23c1cc005e004ccf1db5bf76aeb6a49218f43dac3d4b275e92de12ded4d1'
    },
    {
    token: 'Equity.US.MSI/USD',
    id: '0xcc7851b525bd7f0d8ce00e409d59d6cd5ecdfbc5a2df1aaee3c4948426976100'
    },
    {
    token: 'Equity.US.MSTR/USD',
    id: '0xe1e80251e5f5184f2195008382538e847fafc36f751896889dd3d1b1f6111f09'
    },
    {
    token: 'Equity.US.MTB/USD',
    id: '0x1525917fe1d100b6af40bb6f40f71059a6a4c52a1849c964ef33a06412bc9f46'
    },
    {
    token: 'Equity.US.MTCH/USD',
    id: '0x17106e7bc45a7a3c48db3eff47617a7eac3c67bd2e15dbee5285db744d3f2cd7'
    },
    {
    token: 'Equity.US.MTD/USD',
    id: '0x3d35ab79cabfe67134efe88b5526ff9340121f4641d3f33728fb6801afdb07f2'
    },
    {
    token: 'Equity.US.MU/USD',
    id: '0x152244dc24665ca7dd3f257b8f442dc449b6346f48235b7b229268cb770dda2d'
    },
    {
    token: 'Equity.US.MUB/USD',
    id: '0xdac5c8793675731b9467af853b644280b5bc5119421d5a271dcbd69aabb77983'
    },

    //Non-crypto asset on pyth
    //NCLH-TYL

    {
        "token": "Equity.US.NCLH/USD",
        "id": "0xa57ad8d2031a938779bcda698f28eebfac20c3d0b9b88a7e8452a84b34fa6be2"
    },
    {
        "token": "Equity.US.NDAQ/USD",
        "id": "0x1d4ad1c94a6828b41d3165abd4ee59491a9cc9194e2b8a672fc0aa2ad228ab47"
    },
    {
        "token": "Equity.US.NDSN/USD",
        "id": "0x6727509d8f206c8615b61a01039caa23b45271196e603daebb0366d5e864666f"
    },
    {
        "token": "Equity.US.NEE/USD",
        "id": "0xb058f7874b57f820aa7ff6034a8515add8095b5831e83fc8d02c1dccd4ac099c"
    },
    {
        "token": "Equity.US.NEM/USD",
        "id": "0x29caf4d900d3080e56306ac41a9856735b89cb4df6813dd7b83e9eb96c04700d"
    },
    {
        "token": "Equity.US.NFLX/USD",
        "id": "0x8376cfd7ca8bcdf372ced05307b24dced1f15b1afafdeff715664598f15a3dd2"
    },
    {
        "token": "Equity.US.NI/USD",
        "id": "0xe526b83aaac81d79736671ff6b948326194290a0c2f34a711df3e34b8afa6000"
    },
    {
        "token": "Equity.US.NKE/USD",
        "id": "0x67649450b4ca4bfff97cbaf96d2fd9e40f6db148cb65999140154415e4378e14"
    },
    {
        "token": "Equity.US.NOC/USD",
        "id": "0x5f848f61c44e1c9b21ddac0fcac5536344e80ad21df3271c2f069f57229fab81"
    },
    {
        "token": "Equity.US.NOW/USD",
        "id": "0x69d2eebcc3c62889f1c0105ff347f296eb435cba8d2e4705a486fd47a8fe1a1b"
    },

    
    {
        "token": "Equity.US.NRG/USD",
        "id": "0xcbb7674d9eebacf3a81a54109dca655d805f04d902bc61b2157e8a2d95b00492"
    },
    {
        "token": "Equity.US.NSC/USD",
        "id": "0x337129e71cdd78ee403dcde32b49632c088baa665aac6302dce0f4d3d1339196"
    },
    {
        "token": "Equity.US.NTAP/USD",
        "id": "0x5d929fdc829ffa55be5b1fd8b4d140ab555b1c71ec098c3ed5bce70d5911d753"
    },
    {
        "token": "Equity.US.NTRS/USD",
        "id": "0xf10492d0a522ca19f17cf8d54267abb2cca8ddb80d4bd528750223e3156a8aef"
    },
    {
        "token": "Equity.US.NUE/USD",
        "id": "0x7e535de06269b98ea0dfd8b238b80254a41be0092acf72c4464b269cd500716e"
    },
    {
        "token": "Equity.US.NVDA/USD",
        "id": "0xb1073854ed24cbc755dc527418f52b7d271f6cc967bbf8d8129112b18860a593"
    },
    {
        "token": "Equity.US.NVO/USD",
        "id": "0x8dde322496e031d942b9eee8ca769d618cd2e69b18196644369379f5a1e7c23d"
    },
    {
        "token": "Equity.US.NVR/USD",
        "id": "0xb8b6c23723982492c9e893684e2686af4c38eef7f58dc74a030b49a7c07996b7"
    },
    {
        "token": "Equity.US.NWS/USD",
        "id": "0x843ea585a43ae9d0acff8176ab6e5090aaa214c37902404a66082eb5eb4267a9"
    },
    {
        "token": "Equity.US.NWSA/USD",
        "id": "0xe3a1aa2fe470ff336c23daa1184f79764a15ac3af2e99ac31ac05942f0befcde"
    },

  {
    "token": "Equity.US.NXPI/USD",
    "id": "0x3d739102be847ba442365931b384aeba9b48eda30c25553d30b5ec697da29c41"
  },
  {
    "token": "Equity.US.O/USD",
    "id": "0xd2f530f73cad1b04094adbc1ef8d4525f67f2c812bae70af63e8027a9787d75c"
  },
  {
    "token": "Equity.US.ODFL/USD",
    "id": "0x4b8faa3f61c5764a6662179f8aa41c0cb36cb84d796be6d953944ecae87fdc94"
  },
  {
    "token": "Equity.US.OKE/USD",
    "id": "0x878b4560531e95bf028235e52d0e7116a022d3529326adc99c2d3a20994eb733"
  },
  {
    "token": "Equity.US.OMC/USD",
    "id": "0x113967e03bb7a347e3669bcb49cf0c6cd27ddc38439c9f009dec0bf9f0edb137"
  },
  {
    "token": "Equity.US.ON/USD",
    "id": "0x35f08f92f05ab4fd2117f8d857238f5eb25213fefe95e7ba042babea512a0a5b"
  },
  {
    "token": "Equity.US.ORCL/USD",
    "id": "0xe47ff732eaeb6b4163902bdee61572659ddf326511917b1423bae93fcdf3153c"
  },
  {
    "token": "Equity.US.ORLY/USD",
    "id": "0xd06528b28300de3b1a83a3acb383096ecad3e25c320f6d4a6a2745b70f7b1462"
  },
  {
    "token": "Equity.US.OTIS/USD",
    "id": "0x34df4b686b9b9b24d6c2d149e3b6d73df825ae85933c1c74965cc48bb10943f2"
  },
  {
    "token": "Equity.US.OXY/USD",
    "id": "0x54ba7b095dfa286f556cd41d4bfefe956ebd4df3d9eec8fe0188d0727f07e344"
  },

  {
    "token": "Equity.US.PALL/USD",
    "id": "0xfeeb371f721e75853604c47104967f0ab3fa92b988837013f5004f749a8a0599"
  },
  {
    "token": "Equity.US.PANW/USD",
    "id": "0x3b00df0661ccb3109d11ff301c1aa4e88b8d647cb477b089ba225149e6e1b7bb"
  },
  {
    "token": "Equity.US.PARA/USD",
    "id": "0xd31273eefefa4e9a3458c593f2a9a284f011db9884867c682d02c84e70b55ec2"
  },
  {
    "token": "Equity.US.PAYC/USD",
    "id": "0x2145839221f46430e99f5be8f32942291f56e248c142c42efcd978f35ddfdbb3"
  },
  {
    "token": "Equity.US.PAYX/USD",
    "id": "0x31df914d63247bdda62c7c423c497729ef50d89eeab208eb1db42503271713fa"
  },
  {
    "token": "Equity.US.PCAR/USD",
    "id": "0x6262b2695c0ea3371d0a0a3fb3c34ff12fdbf7a61046ec94db3665d47bbaf829"
  },
  {
    "token": "Equity.US.PCG/USD",
    "id": "0x026e4a35b33c438e4c75b2bf8f5f8298b26165eff133b1da2b4559985ecab11e"
  },
  {
    "token": "Equity.US.PDD/USD",
    "id": "0xae69f62081eb15ae4f077397871a1cf29cacf75e7b1db740aed9074c1efd3fa4"
  },
  {
    "token": "Equity.US.PEG/USD",
    "id": "0xb0d68bb7055327a5ec773094129a00f6794ae064b9286a1b55eb2b975bc17dc0"
  },
  {
    "token": "Equity.US.PEP/USD",
    "id": "0xbe230eddb16aad5ad273a85e581e74eb615ebf67d378f885768d9b047df0c843"
  },


  {
    "token": "Equity.US.PFE/USD",
    "id": "0x0704ad7547b3dfee329266ee53276349d48e4587cb08264a2818288f356efd1d"
  },
  {
    "token": "Equity.US.PFG/USD",
    "id": "0xf2be31eeb67f9e2bb7228aaab13fd3a7b836cfc3e6832b876d488363c21dd24a"
  },
  {
    "token": "Equity.US.PG/USD",
    "id": "0xad2fda41998f4e7be99a2a7b27273bd16f183d9adfc014a4f5e5d3d6cd519bf4"
  },
  {
    "token": "Equity.US.PGR/USD",
    "id": "0x1ab9bd7ed68a12736e9feb89044e6ab23b1abfa7b66e06f85653752ec0a890e1"
  },
  {
    "token": "Equity.US.PH/USD",
    "id": "0x9c86a3b6d84699fcc4c0f2e76f34d4b70c6c8230803cb35ae89278de9c6932a9"
  },
  {
    "token": "Equity.US.PHM/USD",
    "id": "0xa8bf7d55b95d25528cfe20141ade2952147a135208ca590fcc2ccf756d9b5119"
  },
  {
    "token": "Equity.US.PKG/USD",
    "id": "0x84ce9993f3e19e52be7d567c8bf7714407cab2afa0d3a752ac09bc49b0153663"
  },
  {
    "token": "Equity.US.PLD/USD",
    "id": "0x627b06aefb92e6b71c4a92f867c7df2718f73c25de2da7b3be1089cc1fe0e9b8"
  },
  {
    "token": "Equity.US.PLTR/USD",
    "id": "0x11a70634863ddffb71f2b11f2cff29f73f3db8f6d0b78c49f2b5f4ad36e885f0"
  },
  {
    "token": "Equity.US.PM/USD",
    "id": "0xa32f875eb39e23f087ea0db141b00857630c2c5011bfbe53a2a4d186f37cb583"
  },

  {
    "token": "Equity.US.PNC/USD",
    "id": "0x424c3c551dcb2c25f9a9de69ebb83586ccd6dd2a79fd2c62650803b1acac3105"
  },
  {
    "token": "Equity.US.PNR/USD",
    "id": "0x47c6ca824cb9b240f65ca58190a42df41cbc20dcee3803f313445828fe1b24b0"
  },
  {
    "token": "Equity.US.PNW/USD",
    "id": "0x735a2411c6c532f7f871e5b7370e9e62bac91784a9a620992f5f9de8dcf366b2"
  },
  {
    "token": "Equity.US.PODD/USD",
    "id": "0x365e9f0db7d3ece432d6882cd1b8f0b6211888f87094a7ec68946099efd684cb"
  },
  {
    "token": "Equity.US.POOL/USD",
    "id": "0x6c7af6afdee5b983466211bcc8f5a2e3b92e0685a57a7537703fc02dfb1dd4cf"
  },
  {
    "token": "Equity.US.PPG/USD",
    "id": "0x0a2d049aa48d4b77c4db199ae38a10a1e3d5130abd27b5cab7db548409da74d5"
  },
  {
    "token": "Equity.US.PPL/USD",
    "id": "0x1542f78dd90dfacbc39b00223999d5b6790a2f976d251d11c47b4c06e39eb06c"
  },
  {
    "token": "Equity.US.PPLT/USD",
    "id": "0x782410278b6c8aa2d437812281526012808404aa14c243f73fb9939eeb88d430"
  },
  {
    "token": "Equity.US.PRU/USD",
    "id": "0x6987f2cab2c2be6cb897220d99dd5665835e6d204f022d4b6d0701d9351b3138"
  },
  {
    "token": "Equity.US.PSA/USD",
    "id": "0x4b0077352f8790088c9e9c76d8490b06b94f75501c0027783ef310e378348d95"
  },


  {
    "token": "Equity.US.PSX/USD",
    "id": "0x16b28b05e3491528ff9ece996c65075c3d2af3027131b11da425c6930b1e5932"
  },
  {
    "token": "Equity.US.PTC/USD",
    "id": "0x8890509a8bea0d0ec4791ea315042061eac7fbde3a77a91a2b33564d799348f5"
  },
  {
    "token": "Equity.US.PWR/USD",
    "id": "0xa189b9eee6d023e3b79a726804aeb748d54e52cf6ebcebe0f7d5c8dae4988357"
  },
  {
    "token": "Equity.US.PYPL/USD",
    "id": "0x773c3b11f6be58e8151966a9f5832696d8cd08884ccc43ac8965a7ebea911533"
  },
  {
    "token": "Equity.US.QCOM/USD",
    "id": "0x54350ebf587c3f14857efcfec50e5c4f6e10220770c2266e9fe85bd5e42e4022"
  },
  {
    "token": "Equity.US.QQQ/USD",
    "id": "0x9695e2b96ea7b3859da9ed25b7a46a920a776e2fdae19a7bcfdf2b219230452d"
  },
  {
    "token": "Equity.US.QQQM/USD",
    "id": "0x433b196b3b026f46f76b5e901c84c575a7280dcba0f4272edefe0529b599ad64"
  },
  {
    "token": "Equity.US.QUAL/USD",
    "id": "0x74fbfe71e79f767d749c991af7415894fb2f543495729d9bd184f00493862343"
  },
  {
    "token": "Equity.US.RBLX/USD",
    "id": "0xd62134a195739141d0649991f11fe0f9cd9eb83fd890bc3ba41dfdd18c1a49f4"
  },
  {
    "token": "Equity.US.RCL/USD",
    "id": "0xd6782c6281afd154d34ebeb4a162352884dd1889ef09a430c10f98ee361019a3"
  },


  {
    "token": "Equity.US.RDDT/USD",
    "id": "0xc0ece6b9254797f4384bda1ba3f2c33259f552c7849a86b3029e811be5ea9227"
  },
  {
    "token": "Equity.US.REG/USD",
    "id": "0x6ae7403d57a08b736dfa40ee8294e6d5108f69280cbd9fe452ed445eb45e08c0"
  },
  {
    "token": "Equity.US.REGN/USD",
    "id": "0x2a45d16204f3588259fddf5a81a1129efab873571a4cef38641e16bfeac364ef"
  },
  {
    "token": "Equity.US.RF/USD",
    "id": "0x14f4bd2b349f33dcc150c1874b863be7b1b39b190e508d9fc54a37397b29a1c4"
  },
  {
    "token": "Equity.US.RIO/USD",
    "id": "0x55e9d82de00129d0fb368bc89d1ee59146b80a8772f8a972febac3f65ed3151f"
  },
  {
    "token": "Equity.US.RIOT/USD",
    "id": "0x46417522a59b245c5af35c33c13426d991b36514c4c85aaefe1cf787e7daad90"
  },
  {
    "token": "Equity.US.RJF/USD",
    "id": "0x96bccfb1661326a6a9717d248fa743762d65da0798656b24108ea48d4982758f"
  },
  {
    "token": "Equity.US.RKLB/USD",
    "id": "0x40589e289317e4fbd997b1a267606e20a1cc7c3e4689f9e5a5992957917816c8"
  },
  {
    "token": "Equity.US.RL/USD",
    "id": "0x80f271ae66ee740f4a8f2c2d33575592a6daf7f881133e4d8c0a4df0fc67315a"
  },
  {
    "token": "Equity.US.RMD/USD",
    "id": "0xe9f11baaade6cf979251d4c9e6c30657ed29275952a04b125915e475c31a5e63"
  },

  {
    "token": "Equity.US.ROK/USD",
    "id": "0xc531c5d85ae89ad23e0f455be0a9170e2924a4b6922d62d5b1e076023f7b7235"
  },
  {
    "token": "Equity.US.ROL/USD",
    "id": "0x0991357d942869150d5d10750b3e066855a56b1459b25dca044b59b9a3fbc779"
  },
  {
    "token": "Equity.US.ROP/USD",
    "id": "0x375d3fff7889b3bfdee5cfccdc5d4d3e67eed3b7d9599e29cea59b1baaa0b83a"
  },
  {
    "token": "Equity.US.ROST/USD",
    "id": "0x093d0ce5cbf3150e271db36706a0cf42b9dd7e62b1bc70fef09c0e2ee80434d5"
  },
  {
    "token": "Equity.US.RSG/USD",
    "id": "0xe3f0d3e53a6f645cd1d7e2927708a17d8bfb12b00c61b99d441f9ad590d2d8fe"
  },
  {
    "token": "Equity.US.RSP/USD",
    "id": "0xa62d605821e58128b42cd0d711319400c4e7a3a19400a3ee5a06222e0a3b9269"
  },
  {
    "token": "Equity.US.RTX/USD",
    "id": "0x97c483cc4172de7ac1a3cc0814f442e4747e64008723f2705d6e9fdff3ba4d3d"
  },
  {
    "token": "Equity.US.RVTY/USD",
    "id": "0x4da5b5fc2f6dfde7d47fac2370940217dd0ce5c37e650f770e6611a974aab96c"
  },
  {
    "token": "Equity.US.SBAC/USD",
    "id": "0x15d10cdf550966316121a3e07b86eec98be08afa1f3abc634818156d32094b31"
  },
  {
    "token": "Equity.US.SBUX/USD",
    "id": "0x86cd9abb315081b136afc72829058cf3aaf1100d4650acb2edb6a8e39f03ef75"
  },

  {
    "token": "Equity.US.SCCO/USD",
    "id": "0xa00be224b07426d688475926b6a7a8b007f1420734629b596ae6132c75bc5976"
  },
  {
    "token": "Equity.US.SCHB/USD",
    "id": "0xcd45d98122b6f79cbb55cb68472b937e362072efa2698b9a7e7f93f0d78262a1"
  },
  {
    "token": "Equity.US.SCHD/USD",
    "id": "0x47157bf302bcc58e21f552687e7b04f0c84a3ad1b8090ba1babefdb297a4b7d1"
  },
  {
    "token": "Equity.US.SCHF/USD",
    "id": "0x601671d8a16a9f456d9a16d0bf203dd80d5076cc95ddca29cb5c7f8024dbeba6"
  },
  {
    "token": "Equity.US.SCHG/USD",
    "id": "0xd822a0f4895f73990a04bec51fffdb477d5eff4b14cd2c5ddcb24ee72befc966"
  },
  {
    "token": "Equity.US.SCHW/USD",
    "id": "0xd437b2f1470d5f007f18a5565eaab1ed182d97204d80b7dd3dac29839f61c9e6"
  },
  {
    "token": "Equity.US.SCHX/USD",
    "id": "0x0abe02fc6a8e3e580236a2fa684297d2f1d3633d87b37ccd4782ab703581f8b3"
  },
  {
    "token": "Equity.US.SGML/USD",
    "id": "0x860ec6bd0af204b8062322bd788857c9fe48d2b44239759a9f578997b1f4f38c"
  },
  {
    "token": "Equity.US.SGOV/USD",
    "id": "0x8d6a29bb5ed522931d711bb12c4bbf92af986936e52af582032913b5ffcbf4d5"
  },
  {
    "token": "Equity.US.SH/USD",
    "id": "0xcea38e1fad0f4f2a2e5e8cc9d3a88613826f9340efadf9464eb3353a8cce3a7a"
  },

  {
    "token": "Equity.US.SHV/USD",
    "id": "0x765f416f2d676848b5016428bc9295fda3e71d5e97b16df75179a378cef040ec"
  },
  {
    "token": "Equity.US.SHW/USD",
    "id": "0x5418e711244ca3c599e0f6a2b3b217833e81f110ae53afadd4a0809808c7baae"
  },
  {
    "token": "Equity.US.SHY/USD",
    "id": "0xa48b0216da455c8f33edc75d5c82290f63180a41646df873b393450bb3218c0c"
  },
  {
    "token": "Equity.US.SIVR/USD",
    "id": "0x0a5ee42b0f7287a777926d08bc185a6a60f42f40a9b63d78d85d4a03ee2e3737"
  },
  {
    "token": "Equity.US.SJM/USD",
    "id": "0x9794052f000f3bc2bfa29662035ca0fa65d316ab901e2b4d4238a2bc30637ee6"
  },
  {
    "token": "Equity.US.SLB/USD",
    "id": "0x8042b087e06b64b7a40056782d48c8add189943d8354c56726e655f46e65320f"
  },
  {
    "token": "Equity.US.SMCI/USD",
    "id": "0x8f34132a42f8bb7a47568d77a910f97174a30719e16904e9f2915d5b2c6c2d52"
  },
  {
    "token": "Equity.US.SNA/USD",
    "id": "0x40ee2e8a06ac2de84d6cea61c4519a35755d59c255c545db964c5e2ed840a1e8"
  },
  {
    "token": "Equity.US.SNAP/USD",
    "id": "0xa23dd397c4f7a2187d00c1973e58ff6e8a681658b1105d1bd42a8fccbbd068f7"
  },
  {
    "token": "Equity.US.SNPS/USD",
    "id": "0xaf00c68cb77107c1f4e8ff5c7e8a28892931fd2790ff9ca54969625d27b66e63"
  },


  {
    "token": "Equity.US.SO/USD",
    "id": "0x650293cd51d63cac28ecb03823af05d8192dad724156af6ed4a90b1708057bf2"
  },
  {
    "token": "Equity.US.SOLV/USD",
    "id": "0xd96aa551f05f1e84366a7b32afb363aadbcf5357d2caca43bcefdb3e65eccb11"
  },
  {
    "token": "Equity.US.SOXS/USD",
    "id": "0x7cf66aa378a88b0637d1e8dae8ca0d558ba997338af670399e984a995c496200"
  },
  {
    "token": "Equity.US.SOXX/USD",
    "id": "0x3c3973e95c24fab3808a8fd9f25fb06ee92422fea20d814c1a850b307cbf31b9"
  },
  {
    "token": "Equity.US.SPDW/USD",
    "id": "0x12e4e2cd0563c32e153dc2e4b843c4f8389c187297a2b1e25651c20c0491e07d"
  },
  {
    "token": "Equity.US.SPG/USD",
    "id": "0xe5b009001bb93e2c5405c6c1f24a2ea178f378997cfd2e3fa8103bcc8df66985"
  },
  {
    "token": "Equity.US.SPGI/USD",
    "id": "0xe7268062e142570f97cfba327f14e3153d1d4d8f6a4f84e59b72940ee87ecdb9"
  },
  {
    "token": "Equity.US.SPLG/USD",
    "id": "0x4dfbf28d72ab41a878afcd4c6d5e9593dca7cf65a0da739cbad9b7414004f82d"
  },
  {
    "token": "Equity.US.SPYG/USD",
    "id": "0x39d6113025efb65b116726281dc70b917fd43391e26a5e06c76b9e9e606b5da9"
  },
  {
    "token": "Equity.US.SPYV/USD",
    "id": "0xda3768a335fe3d4e6a3a540300229909deec4ba07bab6f05d945b9dec67b6856"
  },


  {
    "token": "Equity.US.SQQQ/USD",
    "id": "0xf207c5d325e44579b12965394d9a4dd988567de635a494694bfb0b46c20a06ec"
  },
  {
    "token": "Equity.US.SRE/USD",
    "id": "0x2b6b8daa571caf41933359e3fa3e1497db49fa39bb0964f02e4fee4e3035b22a"
  },
  {
    "token": "Equity.US.STE/USD",
    "id": "0xc8688938e7493b4849467d88d1cac1518f13d9cee69742982120439acdf2c83a"
  },
  {
    "token": "Equity.US.STLD/USD",
    "id": "0x3bc436e6c024059b3493e4332b32d0cbdd2b8ecf84544261838137eb1f299525"
  },
  {
    "token": "Equity.US.STRK/USD",
    "id": "0xcdea273301806de445b481e91a8dbe292ba23fcff8f7dec2053311555a0656c3"
  },
  {
    "token": "Equity.US.STT/USD",
    "id": "0xa72ff152372a1a9b75e40c7da828be1e53129bfb0338436afab007bad29aa42c"
  },
  {
    "token": "Equity.US.STX/USD",
    "id": "0x0b7fc35cea4acfa65e49a718292e0b31b453072e3af39afbfd2925da5c3ab65d"
  },
  {
    "token": "Equity.US.STZ/USD",
    "id": "0xbcbe7f4f918381ad7891595dabea1c1a0b662e48cc533d48f308aa4883a0802d"
  },
  {
    "token": "Equity.US.SW/USD",
    "id": "0xc7ba1f80f10774038310eb30adc31c69103f9e3030262ef4e0a6ce9d6c44488f"
  },
  {
    "token": "Equity.US.SWDA/USD",
    "id": "0xfd80c93ce3a12d18aa3597382020843761ebfdbfc2cb386783a6091c9bc23e7b"
  },

  {
    "token": "Equity.US.SWK/USD",
    "id": "0xcc7233f28c816dae39aa0bd524029f89e5951bd308523228ecac6891d7a18a7b"
  },
  {
    "token": "Equity.US.SWKS/USD",
    "id": "0x431349b17e1ee2605695615baffd31e44290477089c02536bb2926dfa36850b8"
  },
  {
    "token": "Equity.US.SYF/USD",
    "id": "0x19182efb2c0ed89266ee1db3a1e8d3e46c9af1542232ed168e88bcb38db3b64f"
  },
  {
    "token": "Equity.US.SYK/USD",
    "id": "0x1e2fea8c5028e09489fbcb31014e9e7833e08eea78922eaa69d96cf1b37206c2"
  },
  {
    "token": "Equity.US.SYY/USD",
    "id": "0xda937ffe337d2111782ba3910b7b4191764724c3adc69e3074d5da7e25a7dfb4"
  },
  {
    "token": "Equity.US.T/USD",
    "id": "0x63e9f918ab91507c3574cca011da4dccda30cf54d46124d03b70279142ff81f3"
  },
  {
    "token": "Equity.US.TAP/USD",
    "id": "0x05e6a47abeb8086932fffaca66b028aac114c26310f2279ef924362fdd4128e7"
  },
  {
    "token": "Equity.US.TDG/USD",
    "id": "0xd381a4fd877aab599ca1270f5a099d8583ee60159b66c6b6b1ad3018ae89c8fe"
  },
  {
    "token": "Equity.US.TDY/USD",
    "id": "0xce974508b0d8eafcb71d4acca8df29adccc8af76844d7fa7f2e10d459d65b8fc"
  },
  {
    "token": "Equity.US.TEAM/USD",
    "id": "0x2bb7815db4d6081ddfda9befcacac28c63a3f4349fdd5b35accf47b52f35a746"
  },


  {
    "token": "Equity.US.TECH/USD",
    "id": "0xdd73e30fcfa3278a6995202c4b74cf92fc0a5aa9829bd5a1b17e6dd881eb1c29"
  },
  {
    "token": "Equity.US.TEL/USD",
    "id": "0x5cbf183213af0c63f896b908770e684cb0dfb6634e42bd6e8ea7b273eb61a342"
  },
  {
    "token": "Equity.US.TER/USD",
    "id": "0x58ab181e7512766728d2cc3581839bbb913e6cd24457ba422cbe2a33df64416e"
  },
  {
    "token": "Equity.US.TFC/USD",
    "id": "0xd39e81603a92c5b911f9a46432c50de459c6ab6d854e53b00ad65354e14728d7"
  },
  {
    "token": "Equity.US.TFX/USD",
    "id": "0x8ee55f6d832a1416ffba3344e92528b4e46fb8cfb931b318d6ccd7d80b06815b"
  },
  {
    "token": "Equity.US.TGT/USD",
    "id": "0x13537ceb2df5af0b8cdf8032561b0a71430b51297375bbfdc6ed209df1da0d65"
  },
  {
    "token": "Equity.US.TJX/USD",
    "id": "0x1e0192ac474db72a6937c45460929dcef6efebf4d4b493685d020d1bc3b265a2"
  },
  {
    "token": "Equity.US.TLT/USD",
    "id": "0x9f383d612ac09c7e6ffda24deca1502fce72e0ba58ff473fea411d9727401cc1"
  },
  {
    "token": "Equity.US.TMO/USD",
    "id": "0x244fdf268ed7ecfad2cf84529c46d0fcef7a643428ff4ef8b16e8dbb63e0f2d9"
  },
  {
    "token": "Equity.US.TMUS/USD",
    "id": "0x0b231ca4307d25e4600067bfb06f576474bcabd74fb50eeaa0906ac1b457f365"
  },


  {
    "token": "Equity.US.TPL/USD",
    "id": "0x5b839599042f75b23fab4ced6a448aa6d1c367879e25a77b87f4a9dfa98bf4bd"
  },
  {
    "token": "Equity.US.TPR/USD",
    "id": "0x86fcbb7f5166af4a0e298643e725f8af62e93b96891d478dd347165e3c7716a2"
  },
  {
    "token": "Equity.US.TQQQ/USD",
    "id": "0x5aa9f82dc2e0f5f8271fd163e980010101517da59f4b72b71c7056a5950b2f9d"
  },
  {
    "token": "Equity.US.TRGP/USD",
    "id": "0xe3fdb99fc6ce4b1b118b16abafb68242e7feef6e8e75f2ad435072ab83b5c3f7"
  },
  {
    "token": "Equity.US.TRMB/USD",
    "id": "0x9016be1a1eed6240724a40e2629a02c08ef6d87fafc772b856ebdbe3d174e6ba"
  },
  {
    "token": "Equity.US.TROW/USD",
    "id": "0xc58e1fe6b3a7df2a45f72bb291914f509d949951a76be1920b66fff1d1681f46"
  },
  {
    "token": "Equity.US.TRV/USD",
    "id": "0xd45392f678a1287b8412ed2aaa326def204a5c234df7cb5552d756c332283d81"
  },
  {
    "token": "Equity.US.TSCO/USD",
    "id": "0x17739c3c2b2888751a75bada52253281c29b5ec25b39a8aecdbe63e11283e219"
  },
  {
    "token": "Equity.US.TSLA/USD",
    "id": "0x16dad506d7db8da01c87581c87ca897a012a153557d4d578c3b9c9e1bc0632f1"
  },
  {
    "token": "Equity.US.TSLQ/USD",
    "id": "0x508439d4bbfac7632f640c74c6b7ace7f42c699393a588cb3bb236cfed001723"
  },

  {
    "token": "Equity.US.TSM/USD",
    "id": "0xe722560a66e4ab00522ef20a38fa2ba5d1b41f1c5404723ed895d202a7af7cc4"
  },
  {
    "token": "Equity.US.TSN/USD",
    "id": "0x0e83585b37891c7ed22e02b3319c0dc85e1315eccc85deba649c86525c880b36"
  },
  {
    "token": "Equity.US.TT/USD",
    "id": "0x0c9385e9109703f9cef4872dc1d6abaa7a630c1b524757141f79d42159768307"
  },
  {
    "token": "Equity.US.TTD/USD",
    "id": "0x0ad2003fcf837c63f83ce1238efaadce0976ef93d4b3b0befbbf5e196945c385"
  },
  {
    "token": "Equity.US.TTWO/USD",
    "id": "0x782a6a261306f01ab2ad004062a2832107360eefdcf8c83223e0ff7ca7ebde8d"
  },
  {
    "token": "Equity.US.TXN/USD",
    "id": "0xc5b94c7ece9c3ac984e1439a8fac86270d0f988bbbcc838b456e2d7311754bdc"
  },
  {
    "token": "Equity.US.TXT/USD",
    "id": "0x2fc0a41f1d62126539e3b1ca29029e66d991724b2189f63059a5f5682129ab28"
  },
  {
    "token": "Equity.US.TYL/USD",
    "id": "0xd78290ea68a7d23aa44291bf9075a7bdeda18f7aabb32b095cdf175ec5cee785"
  }




]
















