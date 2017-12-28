import {
    mapObjectToArray
} from 'store/helpers';

class TransactionsFakeRepository {
    constructor() {
        this.transactions = {
            "5940c14b9016401068713131": {
                "1513057612025": {
                    "_id": "1513057612025",
                    "type": "transfer",
                    "date": new Date('2017-12-11'),
                    "value": 1000,
                    "accountSource": "5a16640ebaee2b17692e9eb4",
                    "accountDestination": "5a1f92db8b9a904c2bc11954",
                    "note": "На черный день"
                },
                "1513057937766": {
                    "_id": "1513057937766",
                    "type": "income",
                    "date": new Date('2017-12-10'),
                    "value": 100000,
                    "accountSource": "5a16640ebaee2b17692e9eb4",
                    "category": "5a0dc66aab52690bda13e194",
                    "note": "ЗП"
                },
                "1513058283247": {
                    "_id": "1513058283247",
                    "type": "expense",
                    "date": new Date('2017-12-12'),
                    "value": 500,
                    "accountSource": "5a1f92db8b9a904c2bc11954",
                    "category": "5a0e691ab9e5a80babdc116f",
                    "note": "Закуски"
                }
            }
        };
    }

    getList(projectId) {
        return Promise.resolve(mapObjectToArray(this.transactions[projectId]));
    }

    create(projectId, transactionData) {
        this.transactions[projectId] = this.transactions[projectId] || {};

        const transactionId = Date.now().toString();
        const transaction = {
            _id: transactionId,
            ...transactionData
        };

        this.transactions[projectId][transactionId] = transaction;

        return Promise.resolve(transaction);
    }

    update(projectId, transactionId, transactionData) {
        this.transactions[projectId] = this.transactions[projectId] || {};

        const originTransaction = this.transactions[projectId][transactionId] || {};
        const updatedTransaction = {
            ...originTransaction,
            ...transactionData
        };

        this.transactions[projectId][transactionId] = updatedTransaction;

        return Promise.resolve(updatedTransaction);
    }

    remove(projectId, transactionId) {
        this.transactions[projectId] = this.transactions[projectId] || {};

        delete this.transactions[projectId][transactionId];

        return Promise.resolve();
    }
}

export default TransactionsFakeRepository;
