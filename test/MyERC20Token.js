/*
 *  I used this library for testing my coins: https://www.chaijs.com/ 
 */

var MyERC20Token = artifacts.require("MyERC20Token");
const BN = web3.utils.BN;

    contract('MyERC20TokenTest', ([owner, operator, other]) => {
        const initialAccount = owner;
        const transferValue = '100';
        let token;
        let tokenTotalSupply;
        let sender = owner;
        let recipient = operator;
        let thirdAccount = other;
        let senderBalanceBefore;
        let recipientBalanceBefore;
        let thirdAccountBalanceBefore;

        before(async () => {
            token = await MyERC20Token.new(initialAccount);
            tokenTotalSupply = await token.totalSupply();   
        });

        beforeEach(async () => {
            senderBalanceBefore = await token.balanceOf(sender);
            recipientBalanceBefore = await token.balanceOf(recipient);
            thirdAccountBalanceBefore = await token.balanceOf(thirdAccount);
        });
    
        it('should mint total supply of tokens to initial account', async () => {
            const initialAccountBalance = await token.balanceOf(initialAccount);
            assert.equal(initialAccountBalance, "21000000", "Not the same number of tokens");
        });

        it('should have name and symbol OK', async() => {
            const tokenSummary = await token.tokenSummary();
            assert.equal(tokenSummary[0], "BubaCoins");
            assert.equal(tokenSummary[1], "BUBA");
        });


        it('should send BubaCoins from owner to Operator', async() => {
            await token.approve(sender, transferValue, {from : owner});
            await token.transferFrom(sender, recipient, transferValue, {from : owner});
            const senderBalanceAfter = await token.balanceOf(sender);
            const recipientBalanceAfter = await token.balanceOf(recipient);
            assert.equal(
                senderBalanceAfter.valueOf(),
                new BN(senderBalanceBefore).sub(new BN(transferValue)).toString()
            )
            assert.equal(
                recipientBalanceAfter.valueOf(),
                new BN(recipientBalanceBefore).add(new BN(transferValue)).toString()
            );
        });

        it('should burn #value of the existing coins', async() => {
            const senderBalanceBeforeBurn = await token.balanceOf(sender);
            const tokenSupplyBeforeBurn = await token.totalSupply();
            await token.burn(transferValue, {from : owner});
            const senderBalanceAfter = await token.balanceOf(sender);
            const tokenSupplyAfter = await token.totalSupply();
            assert.equal(
                senderBalanceAfter.valueOf(),
                new BN(senderBalanceBefore).sub(new BN(transferValue)).toString()
            );
            assert.equal(
                tokenSupplyAfter.valueOf(),
                new BN(tokenSupplyBeforeBurn).sub(new BN(transferValue)).toString()
            )
        });

        it('should mint #value bubacoins', async() => {
            const tokenTotalSupplyBeforeMint = await token.totalSupply();
            await token.mint(sender, transferValue, {from : owner});
            const senderBalanceAfterMint = await token.balanceOf(sender);
            const tokenTotalSupplyAfterMint = await token.totalSupply();
            assert.equal(
                senderBalanceAfterMint.valueOf(),
                new BN(senderBalanceBefore).add(new BN(transferValue)).toString()  
            );
            assert.equal(
                tokenTotalSupplyAfterMint.valueOf(),
                new BN(tokenTotalSupplyBeforeMint).add(new BN(transferValue)).toString()
            );
        });
})
    