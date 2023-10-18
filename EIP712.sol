// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract EIP712 {
    using ECDSA for bytes32;

    /*
     * getSigner(uint256 _myValue, bytes memory _signature)
     * @param _message = 123
     * @param _signature = 0x5e9714b8b78cbf84bf8e53c5967b09a7f8ee895367c0b427859ab520a79702667c8b94e6a320f88977908924bd4b57e94c52efed90e2a2c5cee601e3117e84281b
     * @return 0xdD4c825203f97984e7867F11eeCc813A036089D1
     */
    function getSigner(
        uint256 _myValue,
        bytes memory _signature
    ) public pure returns (address) {
        // EIP721 domain type
        string memory name = "MyName"; // "MyName";
        string memory version = "1"; // "1";
        uint256 chainId = 1; // 1;
        address verifyingContract = 0x0000000000000000000000000000000000000000; // address(this);

        // stringified types
        string
            memory EIP712_DOMAIN_TYPE = "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)";
        string memory MESSAGE_TYPE = "Message(uint256 myValue)"; // "Message(uint256 myValue)";

        // hash to prevent signature collision
        bytes32 DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(abi.encodePacked(EIP712_DOMAIN_TYPE)),
                keccak256(abi.encodePacked(name)),
                keccak256(abi.encodePacked(version)),
                chainId,
                verifyingContract
            )
        );

        // hash typed data
        return
            keccak256(
                abi.encodePacked(
                    "\x19\x01", // backslash is needed to escape the character
                    DOMAIN_SEPARATOR,
                    keccak256(
                        abi.encode(
                            keccak256(abi.encodePacked(MESSAGE_TYPE)),
                            _myValue // _myValue
                        )
                    )
                )
            ).recover(_signature);
    }
}
