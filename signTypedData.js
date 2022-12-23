// https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4
async function signTypedData() {
  // user input
  const name = "MyName";
  const version = "1";
  const chainId = 1;
  const verifyingContract = "0x0000000000000000000000000000000000000000";
  const message = [
    {
      type: "uint256",
      name: "myValue",
      value: 123,
    },
  ];

  // replace js template with user input
  const jsCode = jsTemplate
    .replace("<NAME>", name)
    .replace("<VERSION>", version)
    .replace("<CHAIN_ID>", chainId)
    .replace("<VERIFYING_CONTRACT>", verifyingContract)
    .replace("<MESSAGE_DATA>", message.map((val) => `${val.name}: ${val.value},`).toString()) // myValue: 123,
    .replace("<MESSAGE_TYPE>", JSON.stringify(message.map((val) => ({ name: val.name, type: val.type })))); //  [{ name: "myValue", type: "uint256" }]

  // replace solidity template with user input
  const solidityCode = solidityTemplate
    .replace("<NAME>", name)
    .replace("<VERSION>", version)
    .replace("<CHAIN_ID>", chainId)
    .replace("<VERIFYING_CONTRACT>", verifyingContract)
    .replace("<MESSAGE_ARGS>", message.map((val) => `${val.type} _${val.name},`).toString()) // uint256 _myValue,
    .replace(
      "<MESSAGE_TYPE>",
      message
        .map((val) => `${val.type} ${val.name},`)
        .toString()
        .slice(0, -1)
    )
    .replace(
      "<MESSAGE_ARGS>",
      message
        .map((val) => `_${val.name},`)
        .toString()
        .slice(0, -1)
    );

  // display
  document.getElementById("jsCode").innerHTML = jsCode;
  document.getElementById("solidityCode").innerHTML = solidityCode;
  // popup metamask to sign
  eval(jsCode);
}
