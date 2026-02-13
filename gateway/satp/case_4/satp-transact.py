
import requests
import json

def execute_transact(params):
    """
    Calls the /api/v1/@hyperledger/cactus-plugin-satp-hermes/transact endpoint
    with the given params as JSON body.

    Args:
        params (dict): The JSON payload to send.

    Returns:
        dict: The JSON response from the endpoint.
    """
    url = f"http://localhost:4010/api/v1/@hyperledger/cactus-plugin-satp-hermes/transact"
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, json=params, headers=headers)
    response.raise_for_status()
    return response.json()


def transact():
    """
    Calls the /api/v1/@hyperledger/cactus-plugin-satp-hermes/transact endpoint
    with the given file as JSON body.

    Returns:
        dict: The JSON response from the endpoint.
    """
    req_params = {
        "contextID": 'mockContext',
        "sourceAsset": {
            "id": "ExampleAsset",
            "referenceId": "SATP-ERC20-BESU",
            "owner": "0xf17f52151EbEF6C7334FAD080c5704D77216b732", # the user's address
            "contractName": "SATPTokenContract",
            "contractAddress": "0xa50a51c09a5c451C52BB714527E1974b686D8e77", # the SATP contract address
            "networkId": {
                "id": "BesuLedgerTestNetwork",
                "ledgerType": "BESU_2X",
            },
            "tokenType": "NONSTANDARD_FUNGIBLE",
            "amount": "100"
        },
        "receiverAsset": {
            "id": "ExampleAsset",
            "referenceId": "SATP-ERC20-ETHEREUM",
            "owner": "0x71bE63f3384f5fb98995898A86B02Fb2426c5788", # the user's address
            "contractName": "SATPTokenContract",
            "contractAddress": "0xfbfbfDdd6e35dA57b7B0F9a2C10E34Be70B3A4E9", # the SATP contract address
            "networkId": {
                "id": "EthereumLedgerTestNetwork",
                "ledgerType": "ETHEREUM",
            },
            "tokenType": "NONSTANDARD_FUNGIBLE",
            "amount": "100"
        }
    }

    return execute_transact(req_params)

if __name__ == "__main__":
    try:
        update_response = transact()
        # Print only the SESSION_ID if present, else print the whole response
        if isinstance(update_response, dict) and 'SESSION_ID' in update_response:
            print(json.dumps({'SESSION_ID': update_response['SESSION_ID']}))
        else:
            print(json.dumps(update_response))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
