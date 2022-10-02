// Mint
function mintScribble() {
    var amount1 = $("#amount1").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang1").html(content);
    var event = contractScribble.methods.batchMint(zombieMaster, amount1).send({ from: zombieMaster, value: 15000000000000000000 * amount1 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
            //alert("Done!");
    content += JSON.stringify(receipt.transactionHash);
    $("#lang1").html(content);
        });;
  };

function supply() {
    var content = "";
    var event = contractScribble.methods.totalSupply().call({ from: zombieMaster })
        .then(function (result) {
            console.log(result);
    var content = "Already minted: ";
    content += result;
    $("#lang2").html(content);
    });
};

// Wallet
function wallet() {
    var content = "";
        var event = contractScribble.methods.balanceOf(zombieMaster).call({ from: zombieMaster })
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    var event = contractScribble.methods.tokenOfOwnerByIndex(zombieMaster, i).call({ from: zombieMaster })
        .then(function (result) {
    var event = contractScribble.methods.tokenURI(Number(result)).call()
        .then(function (result1) {
    content += "<img src=https://ipfs.io/ipfs//QmQ7b3DrPZVSHxkWEok6ZkPnz1veKPDGsm8msGUUoSW17j/"+result+".png width=256 height=256 border-radius=50%>" + " Id: " + result;
    $("#lang3").html(content);
    });
    });
    };
    });
};

function sendNFT() {
    var address1 = $("#address1").val();
    var tokenId1 = $("#tokenId1").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang4").html(content);
    var event = contractScribble.methods.transferFrom(zombieMaster, address1, tokenId1).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
            //alert("Done!");
    content += JSON.stringify(receipt.transactionHash);
    $("#lang4").html(content);
        });;
};

// Stake Scribble NFT
function approveS() {
    var tokenId2 = $("#tokenId2").val();
    var content = "Approving transaction from: ";
    content += zombieMaster;
    $("#lang5").html(content);
    var event = contractScribbleStake.methods.approve("0xf77DBC9d03428980db5EF78D5d9C3D6a55F29829", tokenId2).send({ from: zombieMaster })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Approved!: ";
            //alert("Done. You can stake it now!")
    content += JSON.stringify(receipt.transactionHash);
    $("#lang5").html(content);
        });;
};

function stakeNFT() {
    var tokenId2 = $("#tokenId2").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang6").html(content);
    var event = contractScribbleStake.methods.stake(tokenId2).send({ from: zombieMaster, value: 5000000000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent!: ";
            //alert("Done.");
    content += JSON.stringify(receipt.transactionHash);
    $("#lang6").html(content);
        });;
};
    
function calculateReward() {
    var tokenId3 = $("#tokenId3").val();
    var event = contractScribbleStake.methods.calculateTokens(tokenId3).call()
        .then(function (result) {
    var content = "INVADERS amount: ";
            //alert(result/100000000);
    content += JSON.stringify(result.toString()/1000000000000000000);
    $("#lang7").html(content);
        });;
};
    
function unstakeNFT() {
    var tokenId4 = $("#tokenId4").val();
    var content = "Sending transaction from: ";
    content += zombieMaster;
    $("#lang8").html(content);
    var event = contractScribbleStake.methods.unstake(tokenId4).send({ from: zombieMaster, value: 5000000000000000 })
        .then(function (receipt) {
            console.log(receipt);
    var content = "Transaction sent! ";
            //alert("Done.");
    content += JSON.stringify(receipt.transactionHash);
    $("#lang8").html(content);
        });;
};

function balanceToken() {
    var event = contractWDOGE.methods.balanceOf("stakecontract").call()
        .then(function (result) {
    var content = "WDOGE balance: ";
            //alert(result/100000000);
    content += JSON.stringify(result.toString()/1000000000000000000);
    $("#lang9").html(content);
        });;
};

function ownerToken() {
    var tokenId5 = $("#tokenId5").val();
    var event = contractScribble.methods.tokenOwnerOf(tokenId5).call()
        .then(function (result) {
    var content = "Address: ";
            //alert(result);
    content += JSON.stringify(result.toString());
    $("#lang10").html(content);
        });;
};
