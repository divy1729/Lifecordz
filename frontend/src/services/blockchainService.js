import Web3 from 'web3';
import StemCellPayment from '../contracts/StemCellPayment.json';

class BlockchainService {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
    }

    async init() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await this.web3.eth.getAccounts();
                this.account = accounts[0];
                
                // Initialize contract
                const networkId = await this.web3.eth.net.getId();
                const deployedNetwork = StemCellPayment.networks[networkId];
                this.contract = new this.web3.eth.Contract(
                    StemCellPayment.abi,
                    deployedNetwork && deployedNetwork.address,
                );
                
                return true;
            } catch (error) {
                console.error("User denied account access");
                return false;
            }
        }
        console.error("Please install MetaMask!");
        return false;
    }

    async makePayment(planId, amount) {
        if (!this.contract) await this.init();
        
        try {
            await this.contract.methods.subscribe(planId).send({
                from: this.account,
                value: this.web3.utils.toWei(amount.toString(), 'ether')
            });
            return true;
        } catch (error) {
            console.error("Payment failed:", error);
            return false;
        }
    }

    async checkSubscription(address) {
        if (!this.contract) await this.init();
        return await this.contract.methods.checkSubscription(address).call();
    }
}

export default new BlockchainService(); 