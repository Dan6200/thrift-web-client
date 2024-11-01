// cspell:ignore instantsearch, meilisearch, Meili
import React, { Dispatch, forwardRef, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { SearchIcon, X } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom } from '@/atoms'

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_SEARCH!,
  process.env.NEXT_PUBLIC_SEARCH_KEY
)

type SearchProps = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  className: string
}

const Search = forwardRef<HTMLDivElement, SearchProps>(
  ({ show, setShow, className }, searchRef) => {
    const isSmallScreen = useAtomValue(isSmallScreenAtom)
    return (
      <InstantSearch indexName="products" searchClient={searchClient}>
        <div className={className} ref={searchRef}>
          <span className="flex h-10 px-3 w-full justify-between rounded-md border border-input bg-background text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <SearchBox
              onClick={() => setShow(true)}
              submitIconComponent={SearchIcon as any}
              resetIconComponent={X as any}
              classNames={{
                root: 'w-full',
                submit: 'text-foreground my-1 order-1',
                reset: 'order-3',
                form: 'w-full flex justify-between',
                loadingIcon: 'hidden',
                input:
                  'h-9 px-3 py-1 order-2 border-r-1 w-[90%] bg-inherit focus-visible:outline-none',
              }}
            />
          </span>
          <Hits
            {...{ isSmallScreen }}
            hitComponent={Hit as any}
            style={{ display: show ? 'block' : 'none' }}
            onClick={() => setShow(false)}
            className="p-8 border relative z-1000 top-5 rounded-md w-[80vw] md:w-[50vw] h-[80vh] bg-background overflow-y-scroll"
          />
        </div>
      </InstantSearch>
    )
  }
)

Search.displayName = 'Search'

const Hit = ({ isSmallScreen, hit }: { isSmallScreen: boolean; hit: any }) => {
  const router = useRouter()
  return (
    <article
      className="my-4 p-2 rounded-md hover:bg-foreground/10"
      onClick={() => {
        router.push(`/products/${hit.product_id}`)
      }}
      key={hit.product_id}
    >
      <h1 className="font-bold text-md sm:text-lg mb-2">
        <TruncatedHighlight
          attribute="title"
          hit={hit}
          maxLength={isSmallScreen ? 50 : 100}
        />
      </h1>
      <p>{hit.description.join('.  ').slice(0, 50)}...</p>
    </article>
  )
}

const TruncatedHighlight = ({
  attribute,
  hit,
  maxLength,
}: {
  attribute: string
  hit: any
  maxLength: number
}) => {
  const { value } = hit._highlightResult[attribute]
  const truncatedHighlightText = truncateAndHighlight(value, maxLength)
  return <span dangerouslySetInnerHTML={{ __html: truncatedHighlightText }} />
}

const truncateAndHighlight = (
  text: string,
  length: number,
  highlightTag = 'mark'
) => {
  let truncatedText = text.substring(0, length)

  if (text.length > length) {
    truncatedText += '...'
  }

  return truncatedText.replace(
    new RegExp(`<${highlightTag}>(.*?)<\/${highlightTag}>`, 'g'),
    (_, p1) => {
      return `<${highlightTag}>${p1}</${highlightTag}>`
    }
  )
}

export default Search
