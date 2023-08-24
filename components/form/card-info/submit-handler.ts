import { CardInfo } from '@/components/card-info/types'
import { useSetAtom } from 'jotai'
import { CardInfoFormType } from './types'

type SetCardInfo = ReturnType<typeof useSetAtom<CardInfo | null, any[], any>>

export default async (setCardInfo: SetCardInfo, formData: CardInfoFormType) =>
  setCardInfo(formData)
