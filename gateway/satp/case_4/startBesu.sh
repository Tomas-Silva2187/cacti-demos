echo "Clear old Besu Data"
cd && cd Downloads/besu-25.11.0/tmpDatadir/ && rm -rf ./*

echo Starting new Besu Ledger
cd .. && bin/besu   --data-path=./tmpDatadir  --network=dev  --miner-enabled --miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-enabled   --rpc-ws-enabled   --rpc-http-host=0.0.0.0   --rpc-ws-host=0.0.0.0   --rpc-http-cors-origins="all"   --host-allowlist="*"  --rpc-http-api=ETH,NET,WEB3,MINER,TXPOOL   --rpc-ws-api=ETH,NET,WEB3,MINER,TXPOOL