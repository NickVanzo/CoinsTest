var myERC20Token = artifacts.require("./MyERC20Token.sol");

module.exports = (deployer, network, accounts) => {
  deployer.then(async () => {
    try {
      await deployer.deploy(myERC20Token );
    } catch (err) {
      console.log(('Failed to Deploy Contracts', err))
    }
  })
}