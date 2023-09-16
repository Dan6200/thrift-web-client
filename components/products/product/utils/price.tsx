import { Product } from '../../types'

export const Price = ({
  netPrice,
  listPrice,
}: {
  netPrice: string | number
  listPrice: string | number
}) =>
  typeof netPrice === 'string' && typeof listPrice === 'string' ? (
    <div className="w-full flex justify-between">
      <p>
        price:{'\u00A0'.repeat(4)}
        {parseFloat(netPrice).toLocaleString('en-NG', {
          currency: 'NGN',
          style: 'currency',
        })}
      </p>
      {parseFloat(netPrice).toFixed(2) !== parseFloat(listPrice).toFixed(2) && (
        <p className="mb-4 line-through text-foreground/40">
          {parseFloat(listPrice).toLocaleString('en-NG', {
            currency: 'NGN',
            style: 'currency',
          })}
        </p>
      )}
    </div>
  ) : (
    <div className="w-full flex justify-between">
      <p>
        price:{'\u00A0'.repeat(4)}
        {netPrice.toLocaleString('en-NG', {
          currency: 'NGN',
          style: 'currency',
        })}
      </p>
      {(netPrice as number).toFixed(2) !== (listPrice as number).toFixed(2) && (
        <p className="mb-4 line-through dark:text-gray-700">
          {listPrice.toLocaleString('en-NG', {
            currency: 'NGN',
            style: 'currency',
          })}
        </p>
      )}
    </div>
  )
