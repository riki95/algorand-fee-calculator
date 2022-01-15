var args = process.argv.slice(2);

// Numbers expressed in microAlgos
const gasFee = 1000;
const ALGO = 1000000;

const assetsCount = args[0];
const receiversCount = args[1];

if (!assetsCount || !receiversCount) {
    console.error('Missing parameters');
    process.exit(0);
}

console.log(`Calculating fees to create ${assetsCount} ${assetsCount > 1 ? 'assets' : 'asset'} and sending it to ${receiversCount} ${receiversCount > 1 ? 'receivers' : 'receiver'}\n`);


let total_fee = 0;

const nft_mint_fee = gasFee * assetsCount;
total_fee += nft_mint_fee; // FEE - Increase fee for each nft asset that we want to create. It does not care what is the amount for the single nft.
printOperationFee(nft_mint_fee, total_fee, `mint of ${assetsCount} ${assetsCount > 1 ? 'assets' : 'asset'}`);


function printOperationFee(operation_fee, total_new_fee, reason) {
    console.log(`Added fee of ${operation_fee} for ${reason}. Total amount is now ${total_new_fee}.`)
}