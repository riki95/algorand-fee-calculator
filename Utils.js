const axios = require('axios').default;

const ALGO = 1000000;
const API_Price_URL = 'https://api.cryptonator.com/api/ticker';

class Utils {

    static microToAlgo(microAlgos) {
        return microAlgos / 1000000;
    }

    static printOperationFee(operation_fee, total_new_fee, reason) {
        console.log(`Added fee of ${operation_fee} microAlgos (${this.microToAlgo(operation_fee)} ALGO) for ${reason}. Total amount is now ${total_new_fee} (${this.microToAlgo(total_new_fee)} ALGO -> ${ALGORAND_CURRENT_PRICE} $).`)
    }

    static async getCryptoCurrentInfo(cryptoID) {
        return new Promise((resolve, reject) => {
            axios.get(`${API_Price_URL}/${cryptoID}-usd`).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
}

module.exports = { Utils }