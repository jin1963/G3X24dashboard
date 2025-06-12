const contractAddress = "0x4436a07606de10ea23dac531672d855ec4b9de37";
const tokenAddress = "0x65e47d9bd03c73021858ab2e1acb2cab38d9b039";

window.addEventListener("load", async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            user = accounts[0];
            document.getElementById("wallet").innerText = `Wallet: ${user}`;
            contract = new web3.eth.Contract(stakingABI, contractAddress);
            token = new web3.eth.Contract(erc20ABI, tokenAddress);
            loadDashboard();
        } catch (err) {
            console.error("User denied account access", err);
            alert("❌ Connection failed.");
        }
    } else {
        alert("⚠️ Please install MetaMask or Web3 wallet");
    }
});

async function loadDashboard() {
    try {
        const balance = await token.methods.balanceOf(user).call();
        const formattedBalance = (balance / 1e18).toFixed(2);
        document.getElementById("balance").innerText = `${formattedBalance} G3X`;

        const totalStaked = await contract.methods.totalStaked().call();
        const formattedTotal = (totalStaked / 1e18).toFixed(2);
        document.getElementById("totalStaked").innerText = `${formattedTotal} G3X`;

        const rewardPool = await contract.methods.rewardPool().call();
        const formattedPool = (rewardPool / 1e18).toFixed(2);
        document.getElementById("rewardPool").innerText = `${formattedPool} G3X`;
    } catch (error) {
        console.error("Error loading dashboard:", error);
        alert("⚠️ Failed to load data.");
    }
}
