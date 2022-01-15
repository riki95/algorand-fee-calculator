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

console.log(`Calculating costs to create ${assetsCount} ${assetsCount > 1 ? 'assets' : 'asset'} and sending it to ${receiversCount} ${receiversCount > 1 ? 'receivers' : 'receiver'}`);