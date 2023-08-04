import { FC, ReactNode } from 'react'

interface priceProps {
  netPrice: string | number
  listPrice: string | number
}

export const Price: FC<priceProps> = ({ netPrice, listPrice }) => {
  if (typeof netPrice === 'string' && typeof listPrice === 'string')
    return (
      <>
        <p className="">
          {parseFloat(netPrice).toLocaleString('en-NG', {
            currency: 'NGN',
            style: 'currency',
          })}
        </p>
        {((parseFloat(listPrice) - parseFloat(netPrice)) /
          parseFloat(listPrice)) *
          100 >
          5 && (
          <p className="">
            {Math.ceil(
              ((parseFloat(listPrice) - parseFloat(netPrice)) /
                parseFloat(listPrice)) *
                100
            )}
            % off
          </p>
        )}
      </>
    )
  if (typeof netPrice !== 'number' || typeof listPrice !== 'number')
    throw new Error('Invalid price type')
  return (
    <>
      <p className="">
        {netPrice.toLocaleString('en-NG', {
          currency: 'NGN',
          style: 'currency',
        })}
      </p>
      {((listPrice - netPrice) / listPrice) * 100 > 5 && (
        <p className="">
          {Math.ceil(((listPrice - netPrice) / listPrice) * 100)}% off
        </p>
      )}
    </>
  )
}
