import type { StarknetWindowObject } from "get-starknet-core"
import type { RpcMessage } from "get-starknet-core"

export function getFreshStarknetObject():StarknetWindowObject {
  let starknet: StarknetWindowObject = {
    id: "",
    name: "",
    version: "",
    icon: "",
    isConnected: false,
    request: (call: Omit<RpcMessage, "result">) => {
      console.log(call); 
      return new Promise((resolve) => { resolve(true) })
    },
    enable: () => new Promise((resolve) => resolve(new Array<string>())), 
    isPreauthorized: () => new Promise((resolve) => { resolve(true) }),
    on: () => {},
    off: () => {}
  };

  return starknet
}