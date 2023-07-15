const sdk = require('api')('@prodia/v1.2#ans39zdlk16spqi');

sdk.auth('e7bce943-bf22-4962-a2d7-97bd80b16451');
sdk.getJob({jobId: '8afc91c2-d499-405a-91a9-d6f07dcf5369'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));