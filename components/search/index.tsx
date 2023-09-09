import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet,
} from 'react-instantsearch'
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'
import { SearchIcon, X } from 'lucide-react'

const searchClient = instantMeiliSearch('https://thrift-search.onrender.com')

const Search = () => {
  const [show, setShow] = useState(false)
  const searchRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    document.addEventListener('mousedown', hide)
    return () => document.addEventListener('mousedown', hide)
  }, [])
  const hide = (e: Event) => {
    if (searchRef.current && !searchRef.current.contains(e.target as any)) {
      console.log(e.target)
      setShow(false)
    }
  }
  return (
    <InstantSearch indexName="products" searchClient={searchClient}>
      <div
        className="absolute top-0 w-96 flex flex-col z-1000 items-center  mt-4 left-[50%] translate-x-[-50%]"
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
              loadingIcon: 'w-4 h-4',
              input:
                'h-9 px-3 py-1 order-2 border-r-1 w-[90%] bg-inherit focus-visible:outline-none',
            }}
          />
        </span>
        <Hits
          hitComponent={Hit}
          style={{ display: show ? 'block' : 'none' }}
          onClick={() => setShow(false)}
          className="p-8 border relative z-1000 top-5 rounded-md w-[50vw] h-[80vh] bg-background overflow-y-scroll"
        />
      </div>
    </InstantSearch>
  )
}

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
      <h1 className="font-bold text-lg mb-2">
        <Highlight attribute="title" hit={hit} />
      </h1>
      <p>{hit.description.join('.  ').slice(0, 150)}...</p>
    </article>
  )
}

export default Search
