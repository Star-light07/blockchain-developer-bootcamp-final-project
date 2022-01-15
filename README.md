# blockchain-developer-bootcamp-final-project
This project is  online store that sales pink items, any products. Due to the fact that people buy stuff online with no gurantee of weather they'll receive the item or not, I've decided to adopt this idea where both the customer and the owner of the store deposits double the amount of a certain item and when the customer receives the item, they'll comfirm they have received. this will automatically cause the smart contract to refund half the amount the customer paid and three times more the amount the owner paid. If the customer doesn't comfirm, they both lose the money forever.

### a walk through
1. when the customer opens the site, they'll be prompted to connect to their metamask wallet
2. Then they'll be able to see a page diplaying all the products in stock,
3. once the customer clicks the buy button, this intialises a transcation
4. The selected

This project is a work in progress, here are the necessary improvements to be made in future

-build in functions to tell how many produts are left in stock
-will be used to advertise new products for the next stock items


How to access the app on a local machine

1. clone the repository
2. Install NodeJS (version )
3. install truffle : npm install -g truffle
3.install ganache GUI and CLI : npm install -g ganache-cli

4. config the host in "truffle.config"
5 then run : npm install

Getting the app ready:
To compile and migrate the contracts, run
truffle compile
truffle migrate
Then start the DApp via
npm run dev
If this doesn't work, try to open the "index.html" file with live server.
Running unit tests:
truffle tests
