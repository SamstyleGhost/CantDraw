const sdk = require('api')('@verbwire/v1.0#g4z182klj3bh6g6');
sdk.auth('sk_live_c5d23fdc-5851-4c68-879c-06cbd25ca079');
sdk.postNftMintQuickmintfromfile({
  chain: 'mumbai',
  filePath: '',
  name: '',
  description: '',
  recipientAddress: 'Wallet Address',
  data: '',
// use this in data if yoy want to see your nfts on OpenSea [{"trait_type":"TraitType1","value":"TraitValue1"},{"trait_type":"TraitType2","value":"TraitValue2"}]
  allowPlatformToOperateToken: 'false'
}, {accept: 'application/json'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));