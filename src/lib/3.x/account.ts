import { signer } from "./signer";
import { provider } from "./provider";
const {
  getChainId,
  callContract,
  getBlock,
  getCode,
  getClassAt,
  getClassHashAt,
  getClassByHash,
  getNonceForAddress,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  deployAccountContract,
  invokeFunction,
  declareContract,
  getEstimateFee,
  getInvokeEstimateFee,
  getDeclareEstimateFee,
  getDeployAccountEstimateFee,
  waitForTransaction
} = provider;

import type {
  Signature,
  Call,
  EstimateFeeDetails,
  Abi,
  InvocationsDetails,
  EstimateFee,
  GetTransactionResponse,
  InvokeFunctionResponse,
  EstimateFeeResponse,
  DeclareContractResponse,
  MultiDeployContractResponse,
  DeployContractUDCResponse,
  DeclareDeployUDCResponse,
  DeployContractResponse,
  DeployAccountContractPayload,
  DeclareDeployContractPayload,
  UniversalDeployerContractPayload,
  DeclareContractPayload,
  EstimateFeeAction
} from "starknet";

import { 
  AccountInterface, 
  number,
  constants,
  typedData 
} from "starknet";

import { 
  sendMessage, 
  waitForMessage, 
  getKey 
} from "../shared/message";

export type EstimateFeeRequest = {
  calls: Call | Call[];
  estimateFeeDetails: EstimateFeeDetails;
};

type EstimateFeeType =
  | {
      type: "account_EstimateFee";
      data: EstimateFeeRequest;
    }
  | {
      type: "account_EstimateFeeResponse";
      data: EstimateFee;
      exception?: string;
    };

export type ExecuteRequest = {
  transactions: Call | Call[];
  abis?: Abi[];
  transactionsDetail?: InvocationsDetails;
};

type ExecuteType =
  | {
      type: "account_Execute";
      data: ExecuteRequest;
    }
  | {
      type: "account_ExecuteResponse";
      data: GetTransactionResponse;
      exception?: string;
    };

export const execute = async (
  transactions: Call | Call[],
  abis?: Abi[],
  transactionsDetail?: InvocationsDetails
): Promise<InvokeFunctionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_Execute",
      data: {
        transactions,
        abis,
        transactionsDetail,
      },
    },
    key
  );
  const response = await waitForMessage("account_ExecuteResponse", key);
  return response;
};

export type SignMessageRequest = {
  typedData: typedData.TypedData;
};

type SignMessageType =
  | {
      type: "account_SignMessage";
      data: SignMessageRequest;
    }
  | {
      type: "account_SignMessageResponse";
      data: Signature;
      exception?: string;
    };

export const signMessage = async (typedData: typedData.TypedData): Promise<Signature> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_SignMessage",
      data: typedData,
    },
    key
  );
  return await waitForMessage("account_SignMessageResponse", key);
};

export type HashMessageRequest = {
  typedData: typedData.TypedData;
};

type HashMessageType =
  | {
      type: "account_HashMessage";
      data: HashMessageRequest;
    }
  | {
      type: "account_HashMessageResponse";
      data: string;
      exception?: string;
    };

export const hashMessage = async (typedData: typedData.TypedData): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_HashMessage",
      data: typedData,
    },
    key
  );
  return await waitForMessage("account_HashMessageResponse", key);
};

export type VerifyMessageRequest = {
  typedData: typedData.TypedData;
  signature: Signature;
};

type VerifyMessageType =
  | {
      type: "account_VerifyMessage";
      data: VerifyMessageRequest;
    }
  | {
      type: "account_VerifyMessageResponse";
      data: boolean;
      exception?: string;
    };

export const verifyMessage = async (
  typedData: typedData.TypedData,
  signature: Signature
): Promise<boolean> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_VerifyMessage",
      data: {
        typedData,
        signature,
      },
    },
    key
  );
  return await waitForMessage("account_VerifyMessageResponse", key);
};

export type VerifyMessageHashRequest = {
  hash: number.BigNumberish;
  signature: Signature;
};

type VerifyMessageHashType =
  | {
      type: "account_VerifyMessageHash";
      data: VerifyMessageHashRequest;
    }
  | {
      type: "account_VerifyMessageHashResponse";
      data: boolean;
      exception?: string;
    };

export const verifyMessageHash = async (
  hash: number.BigNumberish,
  signature: Signature
): Promise<boolean> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_VerifyMessageHash",
      data: {
        hash,
        signature,
      },
    },
    key
  );
  return await waitForMessage("account_VerifyMessageHashResponse", key);
};

type GetNonceType =
  | {
      type: "account_GetNonce";
    }
  | {
      type: "account_GetNonceResponse";
      data: string;
      exception?: string;
    };

const getNonce = async (): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "account_GetNonce",
    },
    key
  );
  return await waitForMessage("account_GetNonceResponse", key);
};

const estimateFee = async (
  calls: Call | Call[], 
  estimateFeeDetails?: EstimateFeeDetails
): Promise<EstimateFeeResponse> => {
  return Promise.reject();
};

const estimateInvokeFee = async (
  calls: Call | Call[], 
  estimateFeeDetails?: EstimateFeeDetails
): Promise<EstimateFeeResponse> => {
  return Promise.reject();
};
const estimateDeclareFee = async (
  contractPayload: DeclareContractPayload, 
  estimateFeeDetails?: EstimateFeeDetails
): Promise<EstimateFeeResponse> => {
  return Promise.reject();
};
const estimateAccountDeployFee = async (
  contractPayload: DeployAccountContractPayload, 
  estimateFeeDetails?: EstimateFeeDetails
): Promise<EstimateFeeResponse> => {
  return Promise.reject();
};
const estimateDeployFee = async (
  deployContractPayload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], 
  transactionsDetail?: InvocationsDetails
): Promise<EstimateFeeResponse> => {
  return Promise.reject();
};

const declare = async(
  contractPayload: DeclareContractPayload, 
  transactionsDetail?: InvocationsDetails
): Promise<DeclareContractResponse> => {
  return Promise.reject();
};
const deploy = async(
  payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], 
  details?: InvocationsDetails | undefined
): Promise<MultiDeployContractResponse> => {
  return Promise.reject();
};
const deployContract = async(
  payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], 
  details?: InvocationsDetails | undefined
): Promise<DeployContractUDCResponse> => {
  return Promise.reject();
};
const declareDeploy = async(
  payload: DeclareDeployContractPayload, 
  details?: InvocationsDetails | undefined
): Promise<DeclareDeployUDCResponse> => {
  return Promise.reject();
};
const deployAccount = async(
  contractPayload: DeployAccountContractPayload, 
  transactionsDetail?: InvocationsDetails
): Promise<DeployContractResponse> => {
  return Promise.reject();
};

const getSuggestedMaxFee = async(
  estimateFeeAction: EstimateFeeAction, 
  details: EstimateFeeDetails): Promise<number.BigNumberish> => {
    return Promise.reject();
  };

export type AccountMessage =
  | EstimateFeeType
  | ExecuteType
  | SignMessageType
  | HashMessageType
  | VerifyMessageType
  | VerifyMessageHashType
  | GetNonceType;

export const account: AccountInterface = {
  address: "",
  signer,
  estimateFee,
  estimateInvokeFee,
  estimateDeclareFee,
  estimateAccountDeployFee,
  estimateDeployFee,
  execute,
  declare,
  deploy,
  deployContract,
  declareDeploy,
  deployAccount,
  signMessage,
  hashMessage,
  verifyMessage,
  verifyMessageHash,
  getNonce,
  getSuggestedMaxFee,

  chainId: constants.StarknetChainId.TESTNET,
  getChainId,
  callContract,
  getBlock,
  getCode,
  getClassAt,
  getClassHashAt,
  getClassByHash,
  getNonceForAddress,
  getStorageAt,
  getTransaction,
  getTransactionReceipt,
  deployAccountContract,
  invokeFunction,
  declareContract,
  getEstimateFee,
  getInvokeEstimateFee,
  getDeclareEstimateFee,
  getDeployAccountEstimateFee,
  waitForTransaction
};
