# blockchain-developer-bootcamp-final-project

This project is online store that sales pink items, a variety of products, It's hard for pink lover to find a store where they can get all their wonderful products in one place, This is the kind of store. 

## a walk through

1. when the customer opens the site, they'll be prompted to connect to their metamask wallet
2. Then they'll be able to see a page diplaying all the products in stock,
3. once the customer clicks the buy button to select a product of choice, this intialises a transcation
4. If the selected product is in stock, it will check if the money deposited is enough or not
5. Then proccess a transction, if the product are not in stock and the money is not enough, it won't be proccessed

This project is a work in progress, here are the necessary improvements to be made in future

-build in functions to tell how many produts are left in stock
-will be used to advertise new products for the next stock items


## Directory structure

1. client: src contains the project's frontend .
2. contracts: Smart contracts .
3. migrations: Migration files for deploying contracts in contracts directory.
4. test: Tests for smart contracts.

## Resources

1. Ethereum address: 0x0F4745483175f2B627E163c0c0ABaD36fbbdA31a
2. My walk over video : https://www.loom.com/share/56c5333f820f4200903cc44793e4b1ac
3. Link to the app: https://sparkling-sky-6927.on.fleek.co

## How to access the app on a local machine

1. clone the repository
2. Install NodeJS (anything above 0.8.2 )  then run :` npm install`
3. install truffle : `npm install -g truffle`
4. install ganache GUI and CLI : `npm install -g ganache-cli`
5. config the host in "truffle.config"


## Getting the app ready:

1.To compile and migrate the contracts, run

`truffle compile`
`truffle migrate`

2. Then start the DApp via
   ` npm run dev`

3. If this doesn't work, try to open the "index.html" file with live server

### Running unit tests:

`truffle test`
## For late submission:
I actually submitted and hour earlier but my network was down. It took a whole hour of loading to upload. I hope you bare with me.
