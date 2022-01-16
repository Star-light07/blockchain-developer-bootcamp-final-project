App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load items.
    $.getJSON("../items.json", function (data) {
      var itemsRow = $("#itemsRow");
      var itemTemplate = $("#itemTemplate");

      for (i = 0; i < data.length; i++) {
        itemTemplate.find(".panel-title").text(data[i].item);
        itemTemplate.find("img").attr("src", data[i].picture);
        // itemTemplate.find(".item-breed").text(data[i].br);
        itemTemplate.find(".item-age").text(data[i].price);
        itemTemplate.find(".btn-buy").attr("data-id", data[i].id);

        itemsRow.append(itemTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("../contracts/PinkShop.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var PinkShopArtifact = data;
      App.contracts.PinkShop = TruffleContract(PinkShopArtifact);

      // Set the provider for our contract
      App.contracts.PinkShop.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the bought items
      return App.markSold();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-buy", App.handleDeal);
  },

  markSold: function () {
    var soldInstance;

    App.contracts.PinkShop.deployed()
      .then(function (instance) {
        soldInstance = instance;

        return soldInstance.getCustomers.call();
      })
      .then(function (buyers) {
        for (i = 0; i < buyers.length; i++) {
          if (buyers[i] !== "0x0000000000000000000000000000000000000000") {
            $(".panel-item")
              .eq(i)
              .find("button")
              .text("Success")
              .attr("disabled", true);
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleDeal: function (event) {
    event.preventDefault();

    var itemId = parseInt($(event.target).data("id"));
    let item;
    var soldInstance;

    $.getJSON("../items.json", function (data) {
      item = data.filter((item) => item.id === itemId)[0];
      console.log(item);
      if (item) {
        web3.eth.getAccounts(function (error, accounts) {
          if (error) {
            console.log(error);
          }

          var account = accounts[0];

          App.contracts.PinkShop.deployed()
            .then(function (instance) {
              soldInstance = instance;

              // Execute buy as a transaction by sending account
              return soldInstance
                .buyItem(itemId, item.price * 10e18, {
                  value: item.price * 10e18,
                  from: account,
                })
                .then((data) => console.log(data));
            })
            .then(function (result) {
              return App.markSold();
            })
            .catch(function (err) {
              console.log(err.message);
            });
        });
      }
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
