'use client'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '../../ui/form'
import {
  Address,
  RecipientFirstName,
  RecipientLastName,
  City,
  State,
  DeliveryContact,
  DeliveryInstructions,
} from '../shipping-info/form-fields'
import { ShippingInfoFormType } from './types'
import submitHandler from './submit-handler'
import useFormProps from './use-form-props'
import { Fragment } from 'react'
import { shippingInfoAtom } from '@/atoms/index'
import { useSetAtom } from 'jotai'
import { Check } from 'lucide-react'

export function ShippingInfoForm() {
  const setShippingInfo = useSetAtom(shippingInfoAtom)
  const form = useForm<ShippingInfoFormType>(useFormProps)
  const { handleSubmit } = form
  const submit: SubmitHandler<ShippingInfoFormType> = submitHandler.bind(
    null,
    setShippingInfo
  )

  return (
    <Fragment>
      <Form {...form}>
        <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
          <div className="w-full space-x-0 flex flex-col md:flex-row md:justify-between">
            <RecipientFirstName form={form} />
            <RecipientLastName form={form} />
          </div>
          <div className="w-full space-x-0 flex flex-col md:flex-row md:justify-between">
            <Address form={form} />
            <City form={form} />
          </div>
          <div className="w-full space-x-0 flex flex-col md:flex-row md:justify-between">
            <State form={form} />
            <DeliveryContact form={form} />
          </div>
          <DeliveryInstructions form={form} />
          <Button className="w-fit mx-auto mt-4 mb-8" type="submit">
            Save <Check className="w-6" />
          </Button>
        </form>
      </Form>
    </Fragment>
  )
}
