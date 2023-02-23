import type { StarknetWindowObject, ConnectedStarknetWindowObject } from "get-starknet-core"
import type { RpcMessage } from "get-starknet-core"


function updateStarknetWindowObject(
  windowObject: StarknetWindowObject,
  //provider: ProviderInterface,
  //remoteHandle: MessageExchange<StarknetMethods, {}>,
  walletAddress: string,
): ConnectedStarknetWindowObject {
  if (windowObject.isConnected) {
    return windowObject
  }

  const valuesToAssign: Pick<
    ConnectedStarknetWindowObject,
    "isConnected" | "selectedAddress"
  > = {
    isConnected: true,
    //chainId: provider.chainId,
    selectedAddress: walletAddress,
    //account: new MessageAccount(provider, walletAddress, remoteHandle),
    //provider,
  }

  return Object.assign(windowObject, valuesToAssign)
}

export function getFreshStarknetObject():StarknetWindowObject {
  const starknet: StarknetWindowObject = {
    id: "freshWebWallet",
    name: "Fresh Web Wallet",
    version: "0.1",
    icon: "",
    isConnected: false,
    request: (call: Omit<RpcMessage, "result">) => {
      console.log(call); 
      return new Promise((resolve) => { resolve(true) })
    },
    enable: async (ops) => {
      if (ops?.starknetVersion === "v3") {
        throw Error("not implemented")
      }
      console.log("enable")
      //const [selectedAddress] = await remoteHandle.call("enable")

      let selectedAddress = "0xdeadbabedeadbabedeadbabe"

      updateStarknetWindowObject(starknet, selectedAddress)
      console.log("after update")
      console.log(starknet)

      return [selectedAddress]
    },
    isPreauthorized: () => new Promise((resolve) => { resolve(true) }),
    on: () => {},
    off: () => {}
  };

  return starknet
}