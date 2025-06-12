const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";
const contractAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";

let web3;
let contract;
let user;

window.addEventListener("load", async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
    } else {
        alert("Please install MetaMask.");
    }
});

document.getElementById("connectWallet").onclick = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        user = accounts[0];
        document.getElementById("walletAddress").innerText = user;

        contract = new web3.eth.Contract(stakingABI, contractAddress);

        await updateDashboard();
    } catch (err) {
        console.error(err);
        alert("Connection failed.");
    }
};

async function updateDashboard() {
    try {
        const balance = await getTokenBalance();
        document.getElementById("balance").innerText = balance;

        const totalStaked = await contract.methods.totalStaked().call();
        document.getElementById("totalStaked").innerText = web3.utils.fromWei(totalStaked, 'ether');

        const rewardPool = await contract.methods.rewardPool().call();
        document.getElementById("rewardPool").innerText = web3.utils.fromWei(rewardPool, 'ether');
    } catch (err) {
        console.error("Dashboard update failed:", err);
    }
}

async function getTokenBalance() {
    const tokenABI = [
        { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "type": "function" }
    ];
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(user).call();
    return web3.utils.fromWei(balance, 'ether');
}
