import { toNano } from '@ton/core';
import { Counter } from '../wrappers/Counter';
import { compile, NetworkProvider } from '@ton/blueprint';


export const WALLET_MNEMONIC='physical fall pull business fashion visit flame advice black first fade taste nothing bag polar thrive then gauge stay photo check dish scheme supply'
export const WALLET_VERSION='V4R2'


export async function run(provider: NetworkProvider) {
    const counter = provider.open(
        Counter.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('Counter')
        )
    );

    await counter.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(counter.address);

    console.log('ID', await counter.getID());
    console.log('Counter', await counter.getCounter());
}
