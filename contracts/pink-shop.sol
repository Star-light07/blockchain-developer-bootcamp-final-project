// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

/// @title PinkShop the online store
/// @author Sarah Kakoma
/// @notice  This is not an actual contract, It's a test .
/// @dev This contract has been deployed on testnet

import "@openzeppelin/contracts/access/Ownable.sol";

contract PinkShop is Ownable {
    struct Item {
        uint256 id;
        uint256 price;
        address payable buyer;
    }

    address[16] public customers;
    Item[16] public items;

    mapping(uint256 => address) itemToOwner;
    mapping(uint256 => bool) soldItems;

    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price, "not enough money send");
        _;
    }

    modifier itemNotSold(uint256 _id) {
        require(!soldItems[_id], "item already sold");
        _;
    }
    modifier itemExists(uint256 _itemId) {
        require(_itemId >= 0 && _itemId <= 15, "item doesn'T exist");
        _;
    }

    /// <LogSold event: id arg>
    event LogSold(uint256 id);

    /// buys an item
    function buyItem(uint256 _itemId, uint256 _price)
        public
        payable
        paidEnough(_price)
        itemNotSold(_itemId)
        itemExists(_itemId)
        returns (uint256)
    {
        items[_itemId] = Item({
            id: _itemId,
            price: _price,
            buyer: payable(msg.sender)
        });
        customers[_itemId] = msg.sender;
        payable(owner()).transfer(msg.value);
        emit LogSold(_itemId);
        return _itemId;
    }

    /// Retrieving the items
    function getInventory() public view onlyOwner returns (Item[16] memory) {
        return items;
    }

    /// Retrieving the customers
    function getCustomers() public view onlyOwner returns (address[16] memory) {
        return customers;
    }
}
