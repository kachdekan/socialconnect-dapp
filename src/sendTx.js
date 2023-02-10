import { utils, Wallet, providers, Contract} from "ethers"

import { 
  ACCOUNTS_CONTRACT, 
  FA_CONTRACT, 
  ODIS_PAYMENTS_CONTRACT, 
  STABLE_TOKEN_CONTRACT,
  ACCOUNTS_PROXY_ADDRESS,
  FA_PROXY_ADDRESS,
  ODIS_PAYMENTS_PROXY_ADDRESS,
  ALFAJORES_CUSD_ADDRESS,
  ALFAJORES_RPC,
  ISSUER_ACCOUNT_PK,
  DEK_PRIVATE_KEY,
  TRUSTED_ISSUERS
} from "./constants"


const provider = new providers.JsonRpcProvider(ALFAJORES_RPC)
const issuer = new Wallet(ISSUER_ACCOUNT_PK, provider)
const stableTokenContract = new Contract(ALFAJORES_CUSD_ADDRESS, STABLE_TOKEN_CONTRACT.abi, issuer);

export const sendToAccount = async (account, amount) => {
  try {
    const amountInWei = utils.parseEther(amount.toString());
    const tx = await stableTokenContract.transfer( account, amountInWei );
    return tx.wait()
  } catch (error) {
    throw `Failed to send funds: ${error}`;
  }
}
