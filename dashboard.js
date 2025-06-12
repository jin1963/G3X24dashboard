const contractAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";

let web3;
let contract;
let user;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await web3.eth.getAccounts();
            user = accounts[0];
            contract = new web3.eth.Contract(stakingABI, contractAddress);
            document.getElementById("userAddress").innerText = user;
            document.getElementById("dashboard").classList.remove("hidden");
            loadDashboard();
        } catch (err) {
            alert("Connection failed.");
        }
    } else {
        alert("MetaMask not detected.");
    }
}

async function loadDashboard() {
    try {
        const totalStaked = await contract.methods.totalStaked().call();
        const rewardPool = await contract.methods.rewardPool().call();

        document.getElementById("totalStaked").innerText = web3.utils.fromWei(totalStaked, "ether");
        document.getElementById("rewardPool").innerText = web3.utils.fromWei(rewardPool, "ether");
    } catch (err) {
        alert("Error loading data.");
    }
}

document.getElementById("connectWallet").addEventListener("click", connectWallet);
