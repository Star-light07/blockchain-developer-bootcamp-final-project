const PinkShop = artifacts.require("PinkShop");

contract("PinkShop", (accounts) => {
  let pinkShop;
  let originalBalanceOwner;
  let originalBalanceBuyer;

  before(async () => {
    pinkShop = await PinkShop.deployed();
  });

  //test the contract's deployment
  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = pinkShop.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  //testing the
  //Testing the buy-function: buy the item with id 0 and assign it to the account 0
  //Should return the expected customer
  describe("buying an Item and retrieving account addresses", async () => {
    before("buy an item using accounts[1]", async () => {
      originalBalanceOwner = await web3.eth.getBalance(accounts[0]);
      originalBalanceBuyer = await web3.eth.getBalance(accounts[1]);
      console.log("orignialBuyer", originalBalanceBuyer);

      await pinkShop.buyItem(0, 1, { from: accounts[1], value: 1 });
      buyer = accounts[1];
    });

    it("should transfer the money to account of owner", async () => {
      let newBalanceOwner = await web3.eth.getBalance(accounts[0]);
      let newBalanceBuyer = await web3.eth.getBalance(accounts[1]);
      assert.equal(
        parseInt(originalBalanceOwner.toString()) + 1,
        newBalanceOwner.toString()
      );
      // assert.equal(
      //   parseInt(originalBalanceBuyer.toString()) - 1,
      //   newBalanceBuyer.toString()
      // );
    });

    it("can fetch the address of a customer by item id", async () => {
      const customer = await pinkShop.customers(0);
      assert.equal(
        customer,
        buyer,
        "The owner of the item should be the account at index one."
      );
    });

    //Call the customer's smart contract method to see the address of the customer who buyed the item with Id 0
    // Then we test the retrieval of all customers who bought an item and compare the contract adress with the one whe should find
    it("can fetch the collection of all items", async () => {
      const items = await pinkShop.getInventory();
      assert.equal(
        items[0].buyer,
        buyer,
        "The owner of the item should be saved for the item."
      );
    });

    // Test that item cant be sold twice
    it("should not sell an item twice", async () => {
      await pinkShop
        .buyItem(0, 1, { from: accounts[0], value: 1 })
        .catch((error) => {
          assert.equal(
            error.message,
            "Returned error: VM Exception while processing transaction: revert"
          );
        });
    });

    // //Test if enough money was payed
    it("should not sell if not enough money is send", async () => {
      await pinkShop
        .buyItem(1, 1, { from: accounts[0], value: 0 })
        .catch((error) => {
          assert.equal(
            error.message,
            "Returned error: VM Exception while processing transaction: revert not enough money send -- Reason given: not enough money send."
          );
        });
    });

    //Test if item exists
    it("should revert if item doenst exist", async () => {
      await pinkShop
        .buyItem(16, 1, { from: accounts[0], value: 1 })
        .catch((error) => {
          assert.equal(
            error.message,
            "Returned error: VM Exception while processing transaction: revert item doesn'T exist -- Reason given: item doesn'T exist."
          );
        });
    });

    // Get back the number of buyings, should not be more than 6
    it("should return the number of items", async () => {
      const items = await pinkShop.getInventory();
      // assert.equal(items, 16);
      assert.equal(items.length, 16);
    });

    // Get back the number of buyings, should not be more than 6
    it("should return the max number of customers", async () => {
      const customers = await pinkShop.getCustomers();
      // assert.equal(customers, 16);
      assert.equal(customers.length, 16);
    });
  });
});
