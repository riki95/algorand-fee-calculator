const { Utils } = require('./Utils');


var args = process.argv.slice(2);

// Numbers expressed in microAlgos
const gasFee = 1000;
const minimum_balance = 100000;

const assetsCount = args[0];
const receiversCount = args[1];

if (!assetsCount || !receiversCount) {
    console.error('Missing parameters');
    process.exit(0);
}

console.log(`Calculating fees to create ${assetsCount} ${assetsCount > 1 ? 'assets' : 'asset'} and sending it to ${receiversCount} ${receiversCount > 1 ? 'receivers' : 'receiver'}\n`);


let total_fee = 0;

// MINT ASSET FEE - Increase fee for each asset that we want to create. It does not care what is the total supply for the single asset.
const asset_mint_fee = gasFee * assetsCount;
total_fee += asset_mint_fee;
Utils.printOperationFee(asset_mint_fee, total_fee, `mint of ${assetsCount} ${assetsCount > 1 ? 'assets' : 'asset'}`);


// TRANSFER FUNDS TO REACH MIN BALANCE FOR RECEIVERS - Increase fee for each transfer of microAlgos that is needed to set minimum account balance to receive assets
// MINBAL_number is fixed to 100000 microAlgos to have an account valid + 100000 for each asset we have, it means that to receive an asset is required 200000 microAlgos in the balance
const account_min_balance_transfer = ((minimum_balance + minimum_balance) + gasFee) * receiversCount;
total_fee += account_min_balance_transfer;
Utils.printOperationFee(account_min_balance_transfer, total_fee, `transfering minimum balance needed to receive the asset`);