import { expect, use } from 'chai';
import { Contract } from 'ethers';
import { deployContract, MockProvider, solidity } from 'ethereum-waffle';
import Greeter from '../build/Greeter.json';

use(solidity);

describe('Greeter', function () {
  const [wallet, walletTo] = new MockProvider().getWallets();
  let greeter: Contract;

  beforeEach(async () => {
    greeter = await deployContract(wallet, Greeter, [1000]);
  });

  it(`Should return the new greeting once it's changed`, async function () {
    await greeter.setGreeting('Hello, world!');
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });
});
