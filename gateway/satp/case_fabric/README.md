Running Besu
From Besu25.11 bin folder: bin/besu   --data-path=/tmp/tmpDatdir   --network=dev  --miner-enabled --miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-enabled   --rpc-ws-enabled   --rpc-http-host=0.0.0.0   --rpc-ws-host=0.0.0.0   --rpc-http-cors-origins="all"   --host-allowlist="*"   --logging=DEBUG  --rpc-http-api=ETH,NET,WEB3,MINER,TXPOOL   --rpc-ws-api=ETH,NET,WEB3,MINER,TXPOOL


Besu accounts:
"Test Account 1 (address 0xfe3b557e8fb62b89f4916b721be55ceb828dbd73)"
Private key to copy :
0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63
Initial balance : 200 Eth (200000000000000000000 Wei)

"Test Account 2 (address 0x627306090abaB3A6e1400e9345bC60c78a8BEf57)"
Private key to copy :
0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
Initial balance : 90000 Eth (90000000000000000000000 Wei)

"Test Account 3 (address 0xf17f52151EbEF6C7334FAD080c5704D77216b732)"
Private key to copy :
0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
Initial balance : 90000 Eth (90000000000000000000000 Wei)

Fabric
> sudo apt-get install jq -y
> curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh
> ./install-fabric.sh docker samples binary

launching fabric chain
> cd fabric-samples/test-network
> ./network.sh down
> ./network.sh up
> ./network.sh createChannel -c <custom.-name1234>
> ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
