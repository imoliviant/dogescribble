// Mint
function mintScribble() {
    var amount1 = $("#amount1").val();
    var content = "Sending transaction from: ";
    content += scribbleChef;
    $("#lang1").html(content);
    var event = contractScribble.methods.batchMint(scribbleChef, amount1).send({ from: scribbleChef, value: 25000000000000000000 * amount1 })
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
    var event = contractScribble.methods.totalSupply().call({ from: scribbleChef })
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
        var event = contractScribble.methods.balanceOf(scribbleChef).call({ from: scribbleChef })
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    var event = contractScribble.methods.tokenOfOwnerByIndex(scribbleChef, i).call({ from: scribbleChef })
        .then(function (result) {
    var event = contractScribble.methods.tokenURI(Number(result)).call()
        .then(function (result1) {
    content += "<img src=https://ipfs.io/ipfs//QmbZznsg8JgCWLT5urCtZ36aQUXUiGctMJWkQf891S4ZfQ/"+result+".png width=64 height=64>" + "<br><br>Id: " + result;
    $("#lang3").html(content);
    });
    });
    };
    });
};

// doodle wallet
function doodleWallet() {
    var content = "";
        var event = contractDoodle.methods.balanceOf(scribbleChef).call({ from: scribbleChef })
        .then(function (result) {
    balance = result;
    for(var i = 0; i < balance; i++){
    var event = contractDoodle.methods.tokenOfOwnerByIndex(scribbleChef, i).call({ from: scribbleChef })
        .then(function (result) {
    var event = contractDoodle.methods.tokenURI(Number(result)).call()
        .then(function (result1) {
    content += "<img src=https://ipfs.io/ipfs//QmbZznsg8JgCWLT5urCtZ36aQUXUiGctMJWkQf891S4ZfQ/"+result+".png width=80 height=80>" + "<br><br>Id: " + result;
    $("#lang10").html(content);
    });
    });
    };
    });
};

function sendNFT() {
    var address1 = $("#address1").val();
    var tokenId1 = $("#tokenId1").val();
    var content = "Sending transaction from: ";
    content += scribbleChef;
    $("#lang4").html(content);
    var event = contractScribble.methods.transferFrom(scribbleChef, address1, tokenId1).send({ from: scribbleChef })
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
    content += scribbleChef;
    $("#lang5").html(content);
    var event = contractScribbleStake.methods.approve("nft-ca", tokenId2).send({ from: scribbleChef })
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
    content += scribbleChef;
    $("#lang6").html(content);
    var event = contractScribbleStake.methods.stake(tokenId2).send({ from: scribbleChef, value: 5000000000000000 })
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
    content += scribbleChef;
    $("#lang8").html(content);
    var event = contractScribbleStake.methods.unstake(tokenId4).send({ from: scribbleChef, value: 5000000000000000 })
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

function stakedDoodles() {
    var event = contractDoodleStake.methods.balanceOf("stakecontract").call()
        .then(function (result) {
    var content = "Doodles Staked balance: ";
    content += JSON.stringify(result.toString());
    $("#lang11").html(content);
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
