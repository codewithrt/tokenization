import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import "./App.css";
import Mygldtoken from "./contracts/MYGLDToken.json";
import Mytokensale from "./contracts/Mytokensale.json";
import Kyccontract from "./contracts/Kyccontract.json";

class App extends Component {
  state = {loaded : false , KycAddress :"0x2b..." , Tokensaleaddress : null ,Weitotransfer:0 ,Usertoken : 0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await this.web3.eth.net.getId();

      this.mygldtoken = new this.web3.eth.Contract(
        Mygldtoken.abi,
        Mygldtoken.networks[networkId] && Mygldtoken.networks[networkId].address,
      );
      this.mytokensale = new this.web3.eth.Contract(
        Mytokensale.abi,
        Mytokensale.networks[networkId] && Mytokensale.networks[networkId].address,
      );
      this.kyc = new this.web3.eth.Contract(
        Kyccontract.abi,
        Kyccontract.networks[networkId] && Kyccontract.networks[networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({loaded :true ,Tokensaleaddress : Mytokensale.networks[networkId].address});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleonchange = (event) =>{
     const target = event.target;
     const value = target.value;
     const name = target.name;
    this.setState({
      [name] : value
    })
    // console.log(this.state.KycAddress);
  }
  handleonclick = async () =>{
    await this.kyc.methods.SetKycCompleted(this.state.KycAddress).send({from : this.accounts[0]});
    // console.log(this.kyc);
    alert('Kyc for' + this.state.KycAddress + " is completed")
  }
  sendwei = async() =>{ 
    await this.web3.eth.sendTransaction({from :this.state.KycAddress , to : this.state.Tokensaleaddress, value:this.web3.utils.toWei(this.state.Weitotransfer, 'wei')});
    alert("Payment is successful")
    this.updatetokens();
  }
  updatetokens = async() =>{
    let usertoken = await this.mygldtoken.methods.balanceOf(this.state.KycAddress).call();
    this.setState({Usertoken : usertoken})
  }


  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Ethereum Gold Tokens !</h1>
        <p>Get your own Ethereum gold tokens</p>
        <h2>KYC Whitelisting</h2>
        <p>Address to allow : <input type="text" name="KycAddress" value={this.state.KycAddress} onChange = {this.handleonchange}/>
             <button onClick={this.handleonclick}>Whitelist</button>
             </p>
        <p>
         To buy tokens transfer wei to the account : {this.state.Tokensaleaddress}
        </p>
        <p>
          At a rate of 1 token per Wei
        </p>
        <p>
          {/* From account
          <input type="text" name = "accounttotransfer" value={this.state.accounttotransfer} onChange={this.handleonchange} /> */}
          No of wei to send
          <input type="number" name = "Weitotransfer" value={this.state.Weitotransfer} onChange={this.handleonchange}/>
        </p>
        <p>
          <button onClick={this.sendwei} >Send Wei</button>
        </p>
        <p>
          No of Gold tokens you have : {this.state.Usertoken}
        </p>
      </div>
    );
  }
}

export default App;
