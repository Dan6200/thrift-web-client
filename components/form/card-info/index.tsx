'use client'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '../../ui/form'
import { Name, ExpDate, CardNumber, SecurityCode } from './form-fields'
import { CardInfoFormType } from './types'
import submitHandler from './submit-handler'
import useFormProps from './use-form-props'
import { Fragment } from 'react'
import { shippingInfoAtom } from '@/atoms/index'
import { useSetAtom } from 'jotai'
import { Check } from 'lucide-react'

export function ShippingInfoForm() {
  const setShippingInfo = useSetAtom(shippingInfoAtom)
  const form = useForm<CardInfoFormType>(useFormProps)
  const { handleSubmit } = form
  const submit: SubmitHandler<CardInfoFormType> = submitHandler.bind(
    null,
    setShippingInfo
  )

  return (
    <Fragment>
      <Form {...form}>
        <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
          <div className="w-full space-x-0 flex flex-col md:flex-row md:justify-between">
            <Name form={form} />
            <CardNumber form={form} />
          </div>
          <div className="w-full space-x-0 flex flex-col md:flex-row md:justify-between">
            <ExpDate form={form} />
            <SecurityCode form={form} />
          </div>
          <Button className="w-fit mx-auto mt-4 mb-8" type="submit">
            Save <Check className="w-6" />
          </Button>
        </form>
      </Form>
    </Fragment>
  )
}
