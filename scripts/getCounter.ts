

import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "@ton/ton";
import {Counter} from "../wrappers/Counter"; // this is the interface class we just implemented

export async function run() {
    // initialize ton rpc client on testnet
    // const endpoint = await getHttpEndpoint({ network: "testnet" });
    const endpoint = await getHttpEndpoint({ network: "mainnet" });
    const client = new TonClient({ endpoint });

    // open Counter instance by address
    const counterAddress = Address.parse("UQBh9Y3W5lYVU8j3qfj5MZkgA6OiFldgcQFo9DV2ubHViEVC"); // replace with your address from step 8
    const counter = new Counter(counterAddress);
    const counterContract = client.open(counter);

    // call the getter on chain
    const counterValue = await counterContract.getCounter();
    console.log("value:", counterValue.toString());
}
