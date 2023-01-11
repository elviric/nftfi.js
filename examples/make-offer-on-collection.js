import NFTfi from '@nftfi/js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  // Init the NFTfi SDK
  const nftfi = await NFTfi.init({
    config: {
      api: { key: process.env.NFTFI_SDK_DEMO_API_KEY }
    },
    ethereum: {
      account: { privateKey: process.env.NFTFI_SDK_ETHEREUM_LENDER_ACCOUNT_PRIVATE_KEY },
      provider: { url: process.env.NFTFI_SDK_ETHEREUM_PROVIDER_URL }
    }
  });
  // Define collection to make offer on
  const nft = {
    address: process.env.NFTFI_SDK_EXAMPLE_NFT_ADDRESS
  };
  // Get the balance of the given account
  const currency = nftfi.config.erc20.weth.address;
  const symbol = nftfi.config.erc20.weth.symbol;
  const balance = await nftfi.erc20.balanceOf({
    token: { address: currency }
  });
  // Construct the loan terms
  const contractName = nftfi.config.loan.fixed.collection.v2.name;
  const principal = balance / 3;
  const apr = 31.42;
  const days = 30;
  const repayment = nftfi.utils.calcRepaymentAmount(principal, apr, days);
  const duration = 86400 * days; // Number of days (loan duration) in seconds
  const terms = {
    principal,
    repayment,
    duration,
    currency
  };
  // Approve principal with NFTfi contracts
  await nftfi.erc20.approve({
    token: { address: currency },
    nftfi: { contract: { name: contractName } },
    amount: principal
  });
  console.log(`[INFO] balance of ${symbol} in account ${nftfi.account.getAddress()} is ${balance}`);
  console.log('[INFO] setting allowance on NFTfi contract.');
  // Create the offer on the NFT
  const result = await nftfi.offers.create({
    terms,
    nft,
    nftfi: {
      contract: {
        name: contractName
      }
    }
  });
  if (result.errors) {
    console.log(`[ERROR] could not create collection offer with the following: ${JSON.stringify(terms)}.`);
    console.log(`[ERROR] validation errors are: ${JSON.stringify(result.errors)}.`);
  } else {
    const currency = result.result.terms.loan.currency;
    const [ticker] = Object.keys(nftfi.config.erc20).filter(key => nftfi.config.erc20[key].address === currency);
    const unit = nftfi.config.erc20[ticker]?.unit;
    const duration = Math.floor(result.result.terms.loan.duration / 86400);
    const repayment = nftfi.utils.formatUnits(result.result.terms.loan.repayment, unit);
    const principal = nftfi.utils.formatUnits(result.result.terms.loan.principal, unit);
    const apr = nftfi.utils.calcApr(principal, repayment, duration).toFixed(2);
    console.log(`[INFO] made collection offer on ${nft.address}`);
    console.log(
      `[INFO] tokenId: ${result.result.nft.id} duration: ${duration} days; principal: ${principal} ${ticker}; repayment: ${repayment} ${ticker}; APR: ${apr}%`
    );
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
