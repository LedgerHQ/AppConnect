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

  const darkmode = (navigate.query["darkmode"] || defaultMode) === "true"

  return (
    <div>
      Connect Fresh Web Wallet by
      <Image
        src="/LEDGER-WORDMARK-BLACK-RGB.svg"
        alt="Ledger Logo"
        width={100}
        height={24}
        priority
      />
      <div>
      <button>Connect</button>
      </div>
    </div>
  )
}
