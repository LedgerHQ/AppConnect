import { useRouter } from "next/router"
import Image from 'next/image'
import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import { usePenpalParent } from '@weblivion/react-penpal';

interface ModalProps {
  defaultLoggedIn?: boolean
  defaultEmail?: string
  defaultMode?: "light" | "dark"
  [key: string]: unknown
}

export default function Modal({
  defaultLoggedIn,
  defaultEmail,
  defaultMode,
}: ModalProps) {
  const navigate = useRouter()

  const { parentMethods, connection } = usePenpalParent({
    methods: {
      multiply(num1: number, num2: number) {
        return num1 * num2;
      },
      divide(num1: number, num2: number) {
        // Return a promise if the value being
        // returned requires asynchronous processing.
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(num1 / num2);
          }, 1000);
        });
      }
    },
  });

  /*useEffect(() => {
    if (connection) {
      let total = parentMethods.connect()
      console.log(total)
    }
  }, [connection, parentMethods]);*/

  async function handleClick(){
    if (connection) {
      await parentMethods.connect()
    }
  }

  const darkmode = (navigate.query["darkmode"] || defaultMode) === "true"

  return (
    <div>
      <button onClick={handleClick}>
      <Image
        src="/LEDGER-WORDMARK-BLACK-RGB.svg"
        alt="Ledger Logo"
        width={100}
        height={24}
        priority
      /></button>
    </div>
  )
}
