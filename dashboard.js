// Web3 Dashboard for G3X24

const contractAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37"; // G3X24 Staking Contract
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";   // G3X24 Token

let web3;
let contract;
let tokenContract;
let user;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress);
        contract = new web3.eth.Contract(stakingABI, contractAddress);
    } else {
        alert("MetaMask not detected.");
    }
});

document.getElementById("connectWallet").onclick = async () => {
    try {
        await ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];
        document.getElementById("walletAddress").innerText = user;
        loadDashboard();
    } catch (err) {
        console.error(err);
        alert("Connection failed.");
    }
};

async function loadDashboard() {
    try {
        const balance = await tokenContract.methods.balanceOf(user).call();
        const formattedBalance = web3.utils.fromWei(balance, 'ether');
        document.getElementById("myBalance").innerText = parseFloat(formattedBalance).toFixed(4) + " G3X";

        const totalStaked = await contract.methods.totalStaked().call();
        const formattedStaked = web3.utils.fromWei(totalStaked, 'ether');
        document.getElementById("totalStaked").innerText = parseFloat(formattedStaked).toFixed(4) + " G3X";

        const rewardPool = await contract.methods.rewardPool().call();
        const formattedPool = web3.utils.fromWei(rewardPool, 'ether');
        document.getElementById("rewardPool").innerText = parseFloat(formattedPool).toFixed(4) + " G3X";
    } catch (err) {
        console.error(err);
    }
}

// ERC20 ABI (มาตรฐาน ERC20 พื้นฐาน)
const erc20ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    }
];

// stakingABI จาก abi.js (ให้แน่ใจว่า abi.js ใน repo ปัจจุบันถูกต้อง)
