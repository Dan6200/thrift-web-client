import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useAtom } from 'jotai'
import { pageNumAtom } from './products'
import { styled } from '@mui/material/styles'

const StyledPagination = styled(Pagination)(() => ({
  '& .MuiPagination-ul': {
    width: 'fit', // set the desired width here
    margin: '0 auto',
  },
  '& .Mui-selected': {
    backgroundColor: 'hsl(var(--foreground))',
    color: 'hsl(var(--background))',
  },
  '& .MuiPaginationItem-page': {
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
  },
  '& .Mui-selected.MuiPaginationItem-page': {
    backgroundColor: 'hsl(var(--foreground)) !important',
    color: 'hsl(var(--background))',
    transition: 'background-color 2s ease',
  },
  '& .MuiPaginationItem-previousNext, .MuiPaginationItem-text': {
    color: 'hsl(var(--foreground))',
  },
}))

// use StyledPagination in place of Pagination

export default function Paginate({ count }: { count: number }) {
  const [page, setPage] = useAtom(pageNumAtom)

  return (
    <Stack spacing={1} className="w-full my-8 mx-auto">
      <StyledPagination
        className="mx-auto w-full h-9 flex justify-between"
        count={count}
        shape="rounded"
        page={page}
        onChange={(_, page) => setPage(page)}
        siblingCount={1}
        boundaryCount={1}
      />
    </Stack>
  )
}
