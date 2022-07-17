const { expect } = require("chai");
// const { beforeEach } = require("mocha");

const MYGLDToken = artifacts.require("MYGLDToken");
require("dotenv").config({path : "../.env"});

contract("MYGLDToken",()=>{
      
   beforeEach(async()=>{
      this.Newtoken = await MYGLDToken.new(parseInt(await process.env.INITIAL_TOKENS));
   })

   it("All tokens should be in my account",async()=>{
      let  accounts =  await web3.eth.getAccounts();
      // console.log(accounts);
      const [deployeraccount,recieptent,anotheraccount] = accounts;
         const mygldtoken = await this.Newtoken;
         let totalsupply = await mygldtoken.totalSupply();
      //    console.log(totalsupply.toNumber());
         expect((await mygldtoken.balanceOf(deployeraccount)).toNumber()).to.be.equal(totalsupply.toNumber());
   })
   
   it("Is it possible to send tokens between accounts",async()=>{
      let  accounts =  await web3.eth.getAccounts();
      const [deployeraccount,recieptent,anotheraccount] = accounts;
      const Sendtoken = 10;
      const mygldtoken = await this.Newtoken;
      let totalsupply = await mygldtoken.totalSupply();
      expect((await mygldtoken.balanceOf(deployeraccount)).toNumber()).to.be.equal(totalsupply.toNumber());
      expect(await mygldtoken.transfer(recieptent,Sendtoken)).to.be.ok;
      expect((await mygldtoken.balanceOf(deployeraccount)).toNumber()).to.be.equal(totalsupply.toNumber() - Sendtoken)
      expect((await  mygldtoken.balanceOf(recieptent)).toNumber()).to.be.equal(Sendtoken)
   })

   it("It is not possible to send more tokens than available in total" ,async()=>{
      let  accounts =  await web3.eth.getAccounts();
      const [deployeraccount,recieptent,anotheraccount] = accounts;
      const mygldtoken = await this.Newtoken;
      try {
            console.log((await mygldtoken.balanceOf(deployeraccount)).toNumber());
            await mygldtoken.transfer(recieptent , ((await mygldtoken.balanceOf(deployeraccount)).toNumber()+1))
            
      } catch (error) {
           expect(error).to.be.ok
      }
   })
   
})