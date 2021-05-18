var myAuth = artifacts.require("./Auth.sol");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    try {
      await deployer.deploy(myAuth);
    } catch (err) {
      console.log(('Failed to Deploy Contracts', err))
    }
  })
}