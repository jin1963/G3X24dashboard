const stakingAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";
let web3;
let contract;
let userAddress;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(stakingABI, stakingAddress);
    } else {
        alert("Please install MetaMask to use this app.");
    }
});

async function connectWallet() {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    userAddress = accounts[0];
    document.getElementById("wallet").innerText = userAddress;
    loadDashboard();
}

async function loadDashboard() {
    const token = new web3.eth.Contract([
        {"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"}
    ], tokenAddress);

    const balance = await token.methods.balanceOf(userAddress).call();
    const formattedBalance = web3.utils.fromWei(balance, 'ether');
    document.getElementById("balance").innerText = formattedBalance;

    const totalStaked = await contract.methods.totalStaked().call();
    document.getElementById("totalStaked").innerText = web3.utils.fromWei(totalStaked, 'ether');

    const rewardPool = await contract.methods.rewardPool().call();
    document.getElementById("rewardPool").innerText = web3.utils.fromWei(rewardPool, 'ether');
}
