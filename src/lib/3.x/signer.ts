import { SignerInterface } from "starknet";

import { typedData } from "starknet";
import type {
  Signature,
  Abi,
  Invocation,
  InvocationsSignerDetails,
  DeployAccountSignerDetails,
  DeclareSignerDetails
} from "starknet";
import { number } from "starknet";
import { sendMessage, waitForMessage, getKey } from "../shared/message";

type GetPubKeyType =
  | {
      type: "signer_GetPubKey";
    }
  | {
      type: "signer_GetPubKeyResponse";
      data: string;
      exception?: string;
    };

export const getPubKey = async (): Promise<string> => {
  const key = getKey();
  sendMessage(
    {
      type: "signer_GetPubKey",
    },
    key
  );
  return await waitForMessage("signer_GetPubKeyResponse", key);
};

export type SignMessageRequest = {
  typedData:typedData.TypedData;
  accountAddress: string;
};

type SignMessageType =
  | {
      type: "signer_SignMessage";
      data: SignMessageRequest;
    }
  | {
      type: "signer_SignMessageResponse";
      data: Signature;
      exception?: string;
    };

export const signMessage = async (
  typedData: typedData.TypedData,
  accountAddress: string
): Promise<Signature> => {
  const key = getKey();
  sendMessage(
    {
      type: "signer_SignTransaction",
      data: {
        typedData,
        accountAddress,
      },
    },
    key
  );
  return await waitForMessage("signer_SignTransactionResponse", key);
};

export type SignTransactionRequest = {
  hash: number.BigNumberish;
  signature: Signature;
};

type SignTransactionType =
  | {
      type: "signer_SignTransaction";
      data: SignTransactionRequest;
    }
  | {
      type: "signer_SignTransactionResponse";
      data: Signature;
      exception?: string;
    };

export const signTransaction = async (
  transactions: Invocation[],
  transactionsDetail: InvocationsSignerDetails,
  abis?: Abi[]
): Promise<Signature> => {
  const key = getKey();
  sendMessage(
    {
      type: "signer_SignTransaction",
      data: {
        transactions,
        transactionsDetail,
        abis,
      },
    },
    key
  );
  return await waitForMessage("signer_SignTransactionResponse", key);
};

const signDeployAccountTransaction = async (
  transaction: DeployAccountSignerDetails
): Promise<Signature> => {
  const response: string[] = ["0x0"];
  return Promise.resolve(response);
};

const signDeclareTransaction = async (
  transaction: DeclareSignerDetails
): Promise<Signature> => {
  const response: string[] = ["0x0"];
  return Promise.resolve(response);
};

export type SignerMessage =
  | GetPubKeyType
  | SignTransactionType
  | SignMessageType;

export const signer: SignerInterface = {
  getPubKey,
  signTransaction,
  signMessage,
  signDeployAccountTransaction,
  signDeclareTransaction
};
