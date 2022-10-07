// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";

contract DOGEPUNKS is ERC721Enumerable, Ownable, ERC721Burnable, ERC721Pausable {

    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdTracker;

    uint256 public constant maxSupply = 10000;
    uint256 public PRICE = 100000000000000000000;
    uint256 public maxPerMint = 10;
    bool mintOwnersEnabled = true;
    bool mintEnabled;
    uint256 countMint;
    string public baseTokenURI;
    mapping(uint => bool) created;
    mapping(uint => uint) items; 
    FuckingRug rugPunks = FuckingRug(0x8ECf0f93F0B46da9659C694C78D7c5cCD4fd09e3); //fucking rugPunks contract

    event CreateDOGEPUNKS(uint256 indexed id);

    constructor() ERC721("DOGEPUNKS", "PUNKS") {}

    modifier saleIsOpen {
        require(_totalSupply() <= maxSupply, "Sale end");
        if (_msgSender() != owner()) {
            require(!paused(), "Pausable: paused");
        }
        _;
    }

    function _totalSupply() internal view returns (uint) {
        return _tokenIdTracker.current();
    }

    function totalMint() public view returns (uint256) {
        return _totalSupply();
    }

    function mintOwners() public saleIsOpen {
        address _to = msg.sender;
        uint256 _count = rugPunks.balanceOf(msg.sender);
        if(_count > 20){
            _count = 20;
        }
        uint256 total = _totalSupply();
        require(total + _count <= maxSupply, "Max limit");
        require(total <= maxSupply, "Sale end");
        require(_count != 0, "Amount must be greater than 0");
        require(mintOwnersEnabled, "Minting is not live yet, hold on punks.");
        require(!mintEnabled, "Minting is not live yet, hold on punks.");

        for(uint256 j = 0; j < _count; j++){ // get old ids. first 20
            items[j] = rugPunks.tokenOfOwnerByIndex(_to, j)-1;
        }
        for (uint256 i = 0; i < _count; i++) {
            created[items[i]] = true;
            rugPunks.transferFrom(_to, address(this), items[i]+1);
            _mintAnElement(_to, items[i]);
        }
    }

    function mint(uint256 _amount) public payable saleIsOpen {
        address _to = msg.sender;
        uint256 _count = _amount;
        require(_count != 0, "Amount must be greater than 0");
        require(!mintOwnersEnabled, "Minting is not live yet, hold on punks.");
        require(mintEnabled, "Minting is not live yet, hold on punks.");
        uint256 total = _totalSupply();
        require(total + _count <= maxSupply, "Max limit");
        require(total <= maxSupply, "Sale end");
        require(_count <= maxPerMint, "Exceeds number");
        require(msg.value >= price(_count), "Value below price");
        uint256 _countMint = countMint;

        for (uint256 i = _countMint; i < maxSupply; i++) {
            _countMint++; 
            if(created[i] == false){
                _count--;
                created[i] = true;
                _mintAnElement(_to, i);
                if(_count == 0){
                    break;
                }
            }
        }
        countMint = _countMint;
    }

    function _mintAnElement(address _to, uint _idMint) private {
        uint id = _idMint;
        _tokenIdTracker.increment();
        _safeMint(_to, id);
        emit CreateDOGEPUNKS(id);
    }

    function changeMinting() public onlyOwner {
        mintOwnersEnabled = !mintOwnersEnabled;
        mintEnabled = !mintEnabled;
    }

    function setPrice(uint256 _price) public onlyOwner {
        PRICE = _price;
    }

    function setMaxPerMint(uint256 _max) public onlyOwner {
        maxPerMint = _max;
    }

    function price(uint256 _count) public view returns (uint256) {
        return PRICE.mul(_count);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        baseTokenURI = baseURI;
    }

    function walletOfOwner(address _owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function start(bool val) public onlyOwner {
        if (val == true) {
            _pause();
            return;
        }
        _unpause();
    }

    function withdrawAll() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0);
        _widthdraw(owner(), address(this).balance);
    }

    function _widthdraw(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        require(success, "Transfer failed.");
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable, ERC721Pausable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
}

interface FuckingRug { //fucking rugPunks interface
    function balanceOf(address account) external view returns (uint);
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);
    function transferFrom(address from, address to, uint256 tokenId) external;
}
