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

const searchClient = instantMeiliSearch('https://thrift-search.onrender.com')

const Search = () => {
  const [show, setShow] = useState(false)
  const searchRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    document.addEventListener('mousedown', hide)
    return () => document.addEventListener('mousedown', hide)
  }, [])
  const hide = (e: Event) => {
    if (searchRef.current && searchRef.current !== e.target) {
      setShow(false)
    }
  }
  return (
    <InstantSearch indexName="products" searchClient={searchClient}>
      <div className="absolute top-0 flex flex-col z-1000 items-center  mt-4 left-[50%] translate-x-[-50%]">
        <span ref={searchRef}>
          <SearchBox onClick={() => setShow(true)} />
        </span>
        <Hits
          hitComponent={Hit}
          style={{ display: show ? 'block' : 'none' }}
          onClick={() => setShow(false)}
          className="p-8 border relative top-0 rounded-md w-[80vw] h-[80vh] bg-background overflow-y-scroll"
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
    >
      <h1 className="font-bold text-lg">
        <Highlight attribute="title" hit={hit} key={hit.product_id} />
      </h1>
      <Snippet attribute="description" hit={hit} key={hit.product_id} />
    </article>
  )
}

export default Search
