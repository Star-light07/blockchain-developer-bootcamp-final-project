const PinkShop = artifacts.require("PinkShop");

contract("PinkShop", (accounts) => {
  let pinkShop;
  let expectedcustomers;

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
  describe("makes an order and call the account address", async () => {
    before("make an order using[0]", async () => {
      await pinkshop.numberOfOrders(0, { from: accounts[0] });
      expectedcustomers = accounts[0];
    });

    it("can fetch the customer's order id", async () => {
      const customers = await numberOfOrders.customers(0);
      assert.equal(
        customers,
        expectedcustomers,
        "The bake for the first order first."
      );
    });
    describe("valuable assignment", async () => {
      it("checking the if the seller is refunded 3 times the deposited amount", async () => {
        const balance = seller.balance;

        const result = await pinkShop.refundstoreOwner();
        const event = result.logs[0].args;

        assert.equal(event, "");
        assert.equal(state === State.Inactive);
        assert.equal(seller.balance, balance + 3 * value);
      });
      it("is able to accept funds from customer", async () => {
        const balance = customer.transfer(value);

        await pinkShop.comfirmPurchase();
        const result = await pinkShop.comfirmPurchase();
        const event = result.logs[0].args;
        assert.equal(event, "");
        assert.equal(state === State.Inactive);
        assert.equal(customer.balance, balance + 3 * value);
      });
      it("should be able to comfirm purchase", async () => {
        const result = await pinkShop.comfirmPurchase();
        const event = result.logs[0].args;
        // assert.equal(state === state.Created);
        assert.equal(event, "purchase has been comfirmed");
      });
    });
  });
});
