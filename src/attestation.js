import { utils, Wallet, providers, Contract} from "ethers"
import { OdisUtils } from "@celo/identity"
import { AuthenticationMethod, OdisContextName } from "@celo/identity/lib/odis/query"
import { ReactNativeBlsBlindingClient } from "./ReactNativeBlindingClient"

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

const NOW_TIMESTAMP = Math.floor(new Date().getTime() / 1000);

const provider = new providers.JsonRpcProvider(ALFAJORES_RPC)
const issuer = new Wallet(ISSUER_ACCOUNT_PK, provider)
const serviceContext = OdisUtils.Query.getServiceContext(OdisContextName.ALFAJORES)
const authSigner =  {
    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
    rawKey: DEK_PRIVATE_KEY,
  }

//Contracts
const accountsContract = new Contract(ACCOUNTS_PROXY_ADDRESS, ACCOUNTS_CONTRACT.abi, issuer);
const federatedAttestationsContract = new Contract(FA_PROXY_ADDRESS, FA_CONTRACT.abi, issuer );
const odisPaymentsContract = new Contract(ODIS_PAYMENTS_PROXY_ADDRESS, ODIS_PAYMENTS_CONTRACT.abi, issuer);
const stableTokenContract = new Contract(ALFAJORES_CUSD_ADDRESS, STABLE_TOKEN_CONTRACT.abi, issuer);


export const lookupAddresses = async (phoneNumber) => {

  //await checkAndTopUpODISQuota();
  const blindingFactor = ReactNativeBlsBlindingClient.generateDeterministicBlindingFactor( DEK_PRIVATE_KEY, phoneNumber)
  const RNBlsBlindingClient = new ReactNativeBlsBlindingClient(serviceContext.odisPubKey, blindingFactor)

  // get identifier from phone number using ODIS
  const obfuscatedIdentifier = (
    await OdisUtils.Identifier.getObfuscatedIdentifier(
      phoneNumber,
      OdisUtils.Identifier.IdentifierPrefix.PHONE_NUMBER,
      issuer.address,
      authSigner,
      serviceContext,
      blindingFactor,
      undefined,
      RNBlsBlindingClient,
    )).obfuscatedIdentifier
  console.log(`Identifier: ${obfuscatedIdentifier}`)

  // query onchain mappings
  const attestations = await federatedAttestationsContract.lookupAttestations(
      obfuscatedIdentifier, 
      TRUSTED_ISSUERS
    );
    
  return attestations.accounts;
}

export const  checkAndTopUpODISQuota = async () => {
  const { remainingQuota } = await OdisUtils.Quota.getPnpQuotaStatus(
    issuer.address,
    authSigner,
    serviceContext
  );

  console.log("remaining ODIS quota", remainingQuota);
  if (remainingQuota < 1) {
    const ONE_CENT_CUSD_WEI = utils.parseEther("0.01");
    let enoughAllowance = false;

    // give odis payment contract permission to use cUSD
    const currentAllowance = await stableTokenContract.allowance(
      issuer.address,
      odisPaymentsContract.address
    );
    console.log("current allowance:", currentAllowance.toString());
  
    if (ONE_CENT_CUSD_WEI.gt(currentAllowance)) {
      const approvalTxReceipt = await stableTokenContract
        .increaseAllowance(
          odisPaymentsContract.address,
          ONE_CENT_CUSD_WEI
        );
      const TxReceipt = await approvalTxReceipt.wait()
      console.log("approval status", TxReceipt.status);
      enoughAllowance = approvalTxReceipt.status;
    } else {
      enoughAllowance = true;
    }

    //increase quota
    if (enoughAllowance) {
      const odisPayment = await odisPaymentsContract.payInCUSD(issuer.address, ONE_CENT_CUSD_WEI);
      const TxReceipt = await odisPayment.wait()
      console.log("odis payment tx status:", TxReceipt.status);
      console.log("odis payment tx hash:", TxReceipt.transactionHash);
      } else {
        throw "cUSD approval failed";
    }
  }
}