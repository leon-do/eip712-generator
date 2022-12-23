const jsTemplate = `// https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4
(async function () {
    // connect to wallet
    const from = await ethereum.request({ method: "eth_requestAccounts" });

    const msgParams = JSON.stringify({
    domain: {
        // Give a user friendly name to the specific contract you are signing for.
        name: "<NAME>", // "MyName"
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: "<VERSION>", // "1"
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: <CHAIN_ID>, // 1
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: "<VERIFYING_CONTRACT>"// "0x0000000000000000000000000000000000000000",
    },

    // Defining the message signing data content.
    message: {
        /*
        - Anything you want. Just a JSON Blob that encodes the data you want to send
        - No required fields
        - This is DApp Specific
        - Be as explicit as possible when building out the message schema.
        */
        <MESSAGE_DATA> // myValue: 123,
    },
    // Refers to the keys of the *types* object below.
    primaryType: "Message",
    types: {
        EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        ],
        // Refer to primaryType
        Message: <MESSAGE_TYPE> // [{ name: "myValue", type: "uint256" }],
    },
    });

    web3.currentProvider.sendAsync(
        {
            method: "eth_signTypedData_v4",
            params: [from[0], msgParams],
            from: from[0],
        },
        function (err, result) {
            if (err) return console.dir(err);
            if (result.error) {
            alert(result.error.message);
            }
            if (result.error) return console.error("ERROR", result);
            console.log("TYPED SIGNED:" + JSON.stringify(result.result));
            // display
            document.getElementById("signedTypedData").innerHTML = result.result;
        }
    );
})()
`;
