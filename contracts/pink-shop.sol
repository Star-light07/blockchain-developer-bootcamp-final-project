// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//import "@openzeppelin/contracts/finance/PaymentSplitter.sol";

//import "@openzeppelin/contracts/ownership/Ownable.sol";

contract PinkShop {
    enum State {
        Created,
        Locked,
        Release,
        Inactive
        /// the state variablehas a defualt value of the first mumber, `state.created`
        ///the defult value of the state variables will be created, it being the first member
    }

    State public state;

    uint256 public value;
    address payable public seller;
    address payable public customer;

    modifier onlyCustomer(address _customer) {
        require(
            msg.sender == customer,
            "only the customr can call this function"
        );
        _;
    }
    modifier onlySeller(address _seller) {
        require(msg.sender == seller, "only seller can call this function");
        _;
    }

    modifier instate(State _state) {
        require(
            state == _state,
            "When at current state this function can not be called"
        );
        _;
    }

    modifier condition() {
        require(msg.value == (2 * value));
        // payable;
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();
    event SellerRefunded();

    ///@dev Must ensure that `msg.value` is an even number.
    ///@dev If it's an odd number, the division will trancate.
    ///@dev you can check via multiplication if it was not an odd number.

    constructor() payable {
        require((2 * msg.value) / 2 == msg.value, "value is not even");

        seller = payable(msg.sender);
        value = msg.value / 2;
    }

    ///@dev It reclaims the ether and aborts the purchase
    ///@dev Can only be called by the storeOwner
    ///@dev Then locks the contract.

    function abort() external onlySeller(msg.sender) instate(State.Created) {
        emit Aborted();
        state = State.Inactive;

        ///@dev transfer here is direct
        ///@dev it is reentrancy-safe, because it is
        ///@dev the last call in this function and has
        ///@ state already been changed.

        seller.transfer(address(this).balance);
    }

    /// Comfirm the purchase as customer.
    ///@dev Transcation has to include `2 * value` ether.
    /// The ether will be locked until comfirmReceived is called.

    function comfirmPurchase() external instate(State.Created) {
        emit PurchaseConfirmed();
        customer = payable(msg.sender);
        state = State.Locked;
    }

    /// Comfirm that you (the customer) received the item.
    /// This will release the locked ether.
    function comfirmReceived()
        external
        onlyCustomer(msg.sender)
        instate(State.Locked)
    {
        emit ItemReceived();

        ///it's vital to change the state first because,
        ///the contracts called using `send` can call in again.

        state = State.Release;

        customer.transfer(value);
    }

    ///this function is called to refund the storeOwner
    ///it pays back the locked funds of the seller.
    function refundstoreOwner()
        external
        onlySeller(msg.sender)
        instate(State.Release)
    {
        emit SellerRefunded();

        state = State.Inactive;

        seller.transfer(3 * value);
    }
}
