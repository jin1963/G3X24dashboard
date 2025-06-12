const contractAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";  // ใช้ Smart Contract ปัจจุบัน

let web3;
let contract;
let user;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        user = accounts[0];
        document.getElementById("walletAddress").innerText = user;
        contract = new web3.eth.Contract(stakingABI, contractAddress);
        loadData();
    } else {
        alert("MetaMask not detected!");
    }
}

async function loadData() {
    try {
        const totalStaked = await contract.methods.totalStaked().call();
        const rewardPool = await contract.methods.rewardPool().call();
        const stakeCount = await contract.methods.getStakeCount(user).call();

        let myStaked = 0;
        for (let i = 0; i < stakeCount; i++) {
            const stakeInfo = await contract.methods.getStakeInfo(user, i).call();
            myStaked += parseInt(stakeInfo.amount);
        }

        document.getElementById("totalStaked").innerText = web3.utils.fromWei(totalStaked, 'ether') + " G3X";
        document.getElementById("rewardPool").innerText = web3.utils.fromWei(rewardPool, 'ether') + " G3X";
        document.getElementById("myStaked").innerText = web3.utils.fromWei(myStaked.toString(), 'ether') + " G3X";
    } catch (e) {
        console.error(e);
    }
}

document.getElementById("connectWallet").onclick = connectWallet;
