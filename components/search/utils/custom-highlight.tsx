import React from 'react'
import { connectHighlight } from 'react-instantsearch-core'

const CustomHighlight = ({ highlight, attribute, hit, maxLength }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  })

  const highlightedText = parsedHit.map((part, index) =>
    part.isHighlighted ? (
      <mark key={index}>{part.value}</mark>
    ) : (
      <span key={index}>{part.value}</span>
    )
  )

  const truncatedText =
    highlightedText.length > maxLength
      ? `${highlightedText.slice(0, maxLength)}...`
      : highlightedText

  return <>{truncatedText}</>
}

export default connectHighlight(CustomHighlight)
