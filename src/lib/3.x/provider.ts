import { BN, BN__default } from "bn.js";
import { constants, number } from "starknet";
import { ProviderInterface } from "starknet";
import {
  GetContractAddressesResponse,
  GetTransactionStatusResponse,
  GetTransactionReceiptResponse,
  GetCodeResponse,
  CallContractResponse,
  GetBlockResponse,
  GetTransactionResponse,
  InvokeFunctionResponse,
  ContractClass,
  DeployContractResponse,
  DeployAccountContractPayload,
  InvocationsDetailsWithNonce,
  DeclareContractResponse,
  DeclareContractTransaction,
  EstimateFeeResponse,
  DeployAccountContractTransaction
} from "starknet";
import type { Call, Invocation, DeployContractPayload } from "starknet";

import { sendMessage, waitForMessage, getKey } from "../shared/message";

const getChainId = async (): Promise<constants.StarknetChainId> => {
  const key = getKey();
  return await waitForMessage("provider_getChainId", key);
}

type CallContractRequest = {
  transactions: Call | Call[];
  options: { blockIdentifier?: number.BigNumberish };
};

type CallContractType =
  | {
      type: "provider_CallContract";
      data: CallContractRequest;
    }
  | {
      type: "provider_CallContractResponse";
      data: CallContractResponse;
      exception?: string;
    };

const callContract = async (
  invokeTransaction: Call,
  options: { blockIdentifier?: number.BigNumberish }
): Promise<CallContractResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_CallContract",
      data: {
        transactions: invokeTransaction,
        options,
      },
    },
    key
  );
  let me = await waitForMessage("provider_CallContractResponse", key);
  return me;
};

type GetBlockRequest = {
  blockIdentifier: number.BigNumberish;
};

type GetBlockType =
  | {
      type: "provider_GetBlock";
      data: GetBlockRequest;
    }
  | {
      type: "provider_GetBlockResponse";
      data: GetBlockResponse;
      exception?: string;
    };

const getBlock = async (
  blockIdentifier: number.BigNumberish = "pending"
): Promise<GetBlockResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetBlock",
      data: blockIdentifier,
    },
    key
  );
  const output = await waitForMessage("provider_GetBlockResponse", key);
  return output;
};

type GetStorageAtRequest = {
  contractAddress: string;
  key: number.BigNumberish;
  blockHashOrTag?: string | number | BN;
};

type GetStorageAtType =
  | {
      type: "provider_GetStorageAt";
      data: GetStorageAtRequest;
    }
  | {
      type: "provider_GetStorageAtResponse";
      data: number.BigNumberish;
      exception?: string;
    };

const getStorageAt = async (
  contractAddress: string,
  key: number.BigNumberish,
  blockIdentifier?: number.BigNumberish
): Promise<object> => {
  const idKEY = getKey();
  sendMessage(
    {
      type: "provider_GetStorageAt",
      data: {
        contractAddress,
        key,
        blockIdentifier,
      },
    },
    idKEY
  );
  return await waitForMessage("provider_GetStorageAtResponse", idKEY);
};

type GetTransactionRequest = {
  transactionHash: number.BigNumberish;
};

type GetTransactionType =
  | {
      type: "provider_GetTransaction";
      data: GetTransactionRequest;
    }
  | {
      type: "provider_GetTransactionResponse";
      data: GetTransactionResponse;
      exception?: string;
    };

const getTransaction = async (
  transactionHash: number.BigNumberish
): Promise<GetTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetTransaction",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider_GetTransactionResponse", key);
};

type GetTransactionReceiptRequest = {
  transactionHash: number.BigNumberish;
};

type GetTransactionReceiptType =
  | {
      type: "provider_GetTransactionReceipt";
      data: GetTransactionReceiptRequest;
    }
  | {
      type: "provider_GetTransactionReceiptResponse";
      data: TransactionReceiptResponse;
      exception?: string;
    };

const getTransactionReceipt = async (
  transactionHash: number.BigNumberish
): Promise<GetTransactionReceiptResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetTransactionReceipt",
      data: transactionHash,
    },
    key
  );
  return await waitForMessage("provider_GetTransactionReceiptResponse", key);
};

type InvokeFunctionRequest = {
  invocation: Invocation;
};

type InvokeFunctionType =
  | {
      type: "provider_InvokeFunction";
      data: InvokeFunctionRequest;
    }
  | {
      type: "provider_InvokeFunctionResponse";
      data: InvokeFunctionResponse;
      exception?: string;
    };

const invokeFunction = async (
  invocation: Invocation
): Promise<InvokeFunctionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider3x_InvokeFunction",
      data: {
        invocation,
        details: {},
      },
    },
    key
  );
  return await waitForMessage("provider3x_InvokeFunctionResponse", key);
};

type DeployContractRequest = {
  payload: DeployContractPayload;
};

type DeployContractType =
  | {
      type: "provider3x_DeployContract";
      data: DeployContractRequest;
    }
  | {
      type: "provider3x_DeployContractResponse";
      data: AddTransactionResponse;
      exception?: string;
    };

const deployContract = async (
  payload: DeployContractPayload
): Promise<AddTransactionResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_DeployContract",
      data: payload,
    },
    key
  );
  return await waitForMessage("provider_DeployContractResponse", key);
};

type WaitForTransactionRequest = {
  txHash: number.BigNumberish;
  retryInterval?: number;
};

type WaitForTransactionType =
  | {
      type: "provider_WaitForTransaction";
      data: WaitForTransactionRequest;
    }
  | {
      type: "provider_WaitForTransactionResponse";
      exception?: string;
    };

const waitForTransaction = async (
  txHash: number.BigNumberish,
  retryInterval?: number
): Promise<GetTransactionReceiptResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_WaitForTransaction",
      data: {
        txHash,
        retryInterval,
      },
    },
    key
  );
  return await waitForMessage("provider_WaitForTransactionResponse", key);
};

type GetContractAddressesType =
  | {
      type: "provider_GetContractAddresses";
    }
  | {
      type: "provider_GetContractAddressesResponse";
      data: GetContractAddressesResponse;
      exception?: string;
    };

export const getContractAddresses =
  async (): Promise<GetContractAddressesResponse> => {
    const key = getKey();
    sendMessage(
      {
        type: "provider_GetContractAddresses",
      },
      key
    );
    return await waitForMessage("provider_GetContractAddressesResponse", key);
  };

type GetTransactionStatusRequest = {
  txHash: number.BigNumberish;
};

type GetTransactionStatusType =
  | {
      type: "provider_GetTransactionStatus";
      data: GetTransactionStatusRequest;
    }
  | {
      type: "provider_GetTransactionStatusResponse";
      data: GetTransactionStatusResponse;
      exception?: string;
    };

export const getTransactionStatus = async (
  txHash: number.BigNumberish
): Promise<GetTransactionStatusResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetTransactionStatus",
      data: { txHash },
    },
    key
  );
  return await waitForMessage("provider_GetTransactionStatusResponse", key);
};

type GetCodeRequest = {
  contractAddress: string;
  blockIdentifier?: number.BigNumberish;
};

type GetCodeType =
  | {
      type: "provider_GetCode";
      data: GetCodeRequest;
    }
  | {
      type: "provider_GetCodeResponse";
      exception?: string;
    };

export const getCode = async (
  contractAddress: string,
  blockIdentifier?: number.BigNumberish
): Promise<GetCodeResponse> => {
  const key = getKey();
  sendMessage(
    {
      type: "provider_GetCode",
      data: { contractAddress, blockIdentifier },
    },
    key
  );
  return await waitForMessage("provider_GetCodeResponse", key);
};

const getClassAt = async (
  contractAddress: string,
  blockIdentifier?: number.BigNumberish
): Promise<ContractClass> => {
  return Promise.reject();
};

const getClassHashAt = async (
  contractAddress: string,
  blockIdentifier?: number.BigNumberish
): Promise<string> => {
  return Promise.reject();
};

const getClassByHash = async (
  classHash: string
): Promise<ContractClass> => {
  return Promise.reject();
};

const getNonceForAddress = async (
  contractAddress: string,
  blockIdentifier?: number.BigNumberish
): Promise<number.BigNumberish> => {
    return Promise.resolve(0);
};

const deployAccountContract = async (
  payload: DeployAccountContractPayload,
  details: InvocationsDetailsWithNonce
): Promise<DeployContractResponse> => {

  const response: DeployContractResponse = {
    contract_address: "0x0",
    transaction_hash: "0x0",
  }

  return Promise.resolve(response);  
};

const declareContract = async (
  transaction: DeclareContractTransaction,
  details: InvocationsDetailsWithNonce
): Promise<DeclareContractResponse> => {

  const response: DeclareContractResponse = {
    transaction_hash: "0x0",
    class_hash: "0x0",
  }
  return Promise.resolve(response);
};

const getEstimateFee = async (
  invocation: Invocation,
  details: InvocationsDetailsWithNonce,
  blockIdentifier: number.BigNumberish
): Promise<EstimateFeeResponse> => {
  const response: EstimateFeeResponse = {
    overall_fee: BN__default
  };
  return Promise.resolve(response);
};

const getInvokeEstimateFee = async (
  invocation: Invocation,
  details: InvocationsDetailsWithNonce,
  blockIdentifier?: number.BigNumberish
): Promise<EstimateFeeResponse> => {
  const response: EstimateFeeResponse = {
    overall_fee: BN__default
  };
  return Promise.resolve(response);
};

const getDeclareEstimateFee = async (
  transaction: DeclareContractTransaction,
  details: InvocationsDetailsWithNonce,
  blockIdentifier?: number.BigNumberish
): Promise<EstimateFeeResponse> => {
  const response: EstimateFeeResponse = {
    overall_fee: BN__default
  };
  return Promise.resolve(response);
};

const getDeployAccountEstimateFee = async (
  transaction: DeployAccountContractTransaction,
  details: InvocationsDetailsWithNonce,
  blockIdentifier?: number.BigNumberish
): Promise<EstimateFeeResponse> => {
  const response: EstimateFeeResponse = {
    overall_fee: BN__default
  };
  return Promise.resolve(response);
};

export type ProviderMessage =
  | CallContractType
  | DeployContractType
  | GetBlockType
  | GetCodeType
  | GetContractAddressesType
  | GetStorageAtType
  | GetTransactionReceiptType
  | GetTransactionStatusType
  | GetTransactionType
  | InvokeFunctionType
  | WaitForTransactionType;

export const provider: ProviderInterface = {
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
