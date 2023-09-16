// cspell:ignore instantsearch, meilisearch, Meili
import React, { Dispatch, forwardRef, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { SearchIcon, X } from 'lucide-react'

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_SEARCH!,
  process.env.NEXT_PUBLIC_SEARCH_KEY
)

type SearchProps = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const Search = forwardRef<HTMLDivElement, SearchProps>(
  ({ show, setShow }, searchRef) => {
    return (
      <InstantSearch indexName="products" searchClient={searchClient}>
        <div
          className="absolute top-0 sm:top-0 w-80 sm:w-[25rem] flex flex-col z-1000 items-center  mt-[.75rem] left-[50%] translate-x-[-50%]"
          ref={searchRef}
        >
          <span className="flex h-10 px-3 w-full justify-between rounded-md border border-input bg-background text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
            <SearchBox
              onClick={() => setShow(true)}
              submitIconComponent={SearchIcon as any}
              resetIconComponent={X as any}
              classNames={{
                root: 'w-96 ',
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
            hitComponent={Hit}
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

const Hit = ({ hit }: { hit: any }) => {
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
        <Highlight attribute="title" hit={hit} />
      </h1>
      {/* Change this to custom, does not show incremental highlight */}
      <p>{hit.description.join('.  ').slice(0, 150)}...</p>
    </article>
  )
}

export default Search
