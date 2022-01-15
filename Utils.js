const ALGO = 1000000;
class Utils {


    static microToAlgo(microAlgos) {
        return microAlgos / 1000000;
    }

    static printOperationFee(operation_fee, total_new_fee, reason) {
        console.log(`Added fee of ${operation_fee} microAlgos (${this.microToAlgo(operation_fee)} ALGO) for ${reason}. Total amount is now ${total_new_fee} (${this.microToAlgo(total_new_fee)} ALGO).`)
    }
}

module.exports = { Utils }