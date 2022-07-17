// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "./Crowdsale.sol";
import "./Kyccontract.sol";
contract Mytokensale is Crowdsale {

    Kyccontract Kyc;
    constructor (
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        Kyccontract _kyc
    )

    Crowdsale(rate, wallet, token){
        Kyc = _kyc;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view virtual override{
       super._preValidatePurchase(beneficiary,weiAmount);
       require(Kyc.KycCompleted(msg.sender),"KYC not completed , puchase not allowed");
    }
}
// For purchasing the tokens only and need kyc also to do that transactions