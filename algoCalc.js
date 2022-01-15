const { Utils } = require('./Utils');


var args = process.argv.slice(2);

// Numbers expressed in microAlgos
const gasFee = 1000;
const minimum_balance = 100000;

const assetsCount = args[0];
const receiversCount = args[1];
const freeze = args[2];

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


// TRANSFER FUNDS TO REACH MIN BALANCE FOR RECEIVERS - Increase fee for each transfer of microAlgos equal to minimum balance that is needed to set minimum account balance to receive assets. Need to add also tx fee.
// MINBAL_number is fixed to 100000 microAlgos to have an account valid + 100000 for each asset we have, it means that to receive an asset is required 200000 microAlgos in the balance
const account_min_balance_transfer = ((minimum_balance + minimum_balance) + gasFee) * receiversCount;
total_fee += account_min_balance_transfer;
Utils.printOperationFee(account_min_balance_transfer, total_fee, `transfering minimum balance needed to receive the asset`);


// OPT IN FOR RECEIVERS - Increase fee for each opt in tx that must be done to opt in for the asset. It is multiplied by the number of receivers.
const receivers_opt_in = gasFee * receiversCount;
total_fee += receivers_opt_in;
Utils.printOperationFee(receivers_opt_in, total_fee, `opting in ${receiversCount} ${receiversCount > 1 ? 'receivers' : 'receiver'} to the asset`);


// ASSET TRANSFER - Increase fee for each transfer of the asset.
const transfer_asset = gasFee * receiversCount;
total_fee += transfer_asset;
Utils.printOperationFee(transfer_asset, total_fee, `transfering ${assetsCount} ${assetsCount > 1 ? 'assets' : 'asset'} to ${receiversCount} ${receiversCount > 1 ? 'receivers' : 'receiver'}`);


// (optional) FREEZE ASSET TO RECEIVERS - it is possible that the creator wants to freeze the asset sent to receiver. This is another tx cost to consider.
if (freeze === 'true') {
    const freeze_asset = gasFee * receiversCount;
    total_fee += freeze_asset;
    Utils.printOperationFee(freeze_asset, total_fee, `freezing asset to ${receiversCount} ${receiversCount > 1 ? 'receivers' : 'receiver'}`);
}



// TOTAL
console.log(`\n\nTotal fee: ${total_fee} microalgos (${Utils.microToAlgo(total_fee)})`);