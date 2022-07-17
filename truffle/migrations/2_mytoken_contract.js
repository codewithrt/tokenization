const MYGLDToken =  artifacts.require("MYGLDToken");
const Mytokensale = artifacts.require("Mytokensale");
const Kyccontract = artifacts.require("Kyccontract");

require("dotenv").config({path : "../.env"});


module.exports = async function(deployer){
   console.log(parseInt(await process.env.INITIAL_TOKENS));
   const accounts = await web3.eth.getAccounts();
   await deployer.deploy(MYGLDToken , parseInt(await process.env.INITIAL_TOKENS));
   await deployer.deploy(Kyccontract)
   await deployer.deploy(Mytokensale , 1 , accounts[0] , MYGLDToken.address ,Kyccontract.address)
   
   let instance = await MYGLDToken.deployed();
   await instance.transfer(Mytokensale.address , parseInt(await process.env.INITIAL_TOKENS))
}

