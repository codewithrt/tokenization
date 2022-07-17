const { expect } = require("chai");

const Mytokensale = artifacts.require("Mytokensale");
const MYGLDToken = artifacts.require("MYGLDToken");
const Kyccontract = artifacts.require("Kyccontract");

require("dotenv").config({path : "../.env"});

contract("Mytokensale",()=>{

    it("Should not have any tokens in deployer account",async()=>{
        let  accounts =  await web3.eth.getAccounts();
        const MygldToken = await MYGLDToken.deployed();
        expect((await MygldToken.balanceOf(accounts[0])).toNumber()).to.be.equal(0);
    })

    it("All token should be in Mytokensale smartcontract smart contract",async ()=>{
        const mytokensale = await Mytokensale.deployed();
        const MygldToken = await MYGLDToken.deployed();
        expect((await MygldToken.balanceOf(mytokensale.address)).toNumber()).to.be.equal(parseInt(await process.env.INITIAL_TOKENS))
        // console.log((await MygldToken.balanceOf(mytokensale.address)).toNumber());
    })

    it("It should be possible to buy tokens",async ()=>{
        let  accounts =  await web3.eth.getAccounts();
        const [deployeraccount,recieptent,anotheraccount] = accounts;
        const mytokensale = await Mytokensale.deployed();
        const MygldToken = await MYGLDToken.deployed();
        const kyccontract = await Kyccontract.deployed();
        await kyccontract.SetKycCompleted(deployeraccount);
        expect(await mytokensale.sendTransaction({from : deployeraccount , value : await web3.utils.toWei("1", 'wei')})).to.be.ok; 
        // console.log(result);
        expect((await MygldToken.balanceOf(deployeraccount)).toNumber()).to.be.equal(100)

    })
})