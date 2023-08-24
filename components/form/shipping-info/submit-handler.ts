import ShippingInfo from '@/components/shipping-info/types'
import { useSetAtom } from 'jotai'
import { ShippingInfoFormType } from './types'

type SetShippingInfo = ReturnType<
  typeof useSetAtom<ShippingInfo | null, any[], any>
>

export default async (
  setShippingInfo: SetShippingInfo,
  formData: ShippingInfoFormType
) => {
  const { delivery_instructions, ...newFormData } = formData
  setShippingInfo({
    ...newFormData,
    delivery_instructions: delivery_instructions
      ? delivery_instructions.split('\n')
      : null,
  })
}
