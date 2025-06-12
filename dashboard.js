let web3;
let contract;
let tokenContract;
let user;

const stakingAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";

window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
    } else {
        alert("Please install MetaMask to use this dApp.");
    }
});

async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        user = accounts[0];
        document.getElementById("walletAddress").innerText = user;

        contract = new web3.eth.Contract(stakingABI, stakingAddress);
        tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

        await updateDashboard();
    } catch (err) {
        console.error(err);
        alert("Connection failed.");
    }
}

async function updateDashboard() {
    try {
        const balance = await tokenContract.methods.balanceOf(user).call();
        const totalStaked = await contract.methods.totalStaked().call();
        const rewardPool = await contract.methods.rewardPool().call();

        document.getElementById("totalStaked").innerText = (totalStaked / 1e18).toLocaleString();
        document.getElementById("rewardPool").innerText = (rewardPool / 1e18).toLocaleString();
    } catch (err) {
        console.error(err);
    }
}
