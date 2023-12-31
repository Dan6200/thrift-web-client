import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useAtom, useAtomValue } from 'jotai'
import { styled } from '@mui/material/styles'
import { isSmallScreenAtom, pageNumAtom } from '@/atoms'

const StyledPagination = styled(Pagination)(() => ({
  '& .MuiPagination-ul': {
    minWidth: '4rem', // set the desired width here
    justifyContent: 'space-between',
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
    transition: 'background-color .5s ease',
  },
  '& .MuiPaginationItem-previousNext, .MuiPaginationItem-text': {
    color: 'hsl(var(--foreground))',
  },
}))

// use StyledPagination in place of Pagination

export default function Paginate({ count }: { count: number }) {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const [page, setPage] = useAtom(pageNumAtom)

  return (
    <Stack spacing={0} className="w-full my-8 mx-auto">
      <StyledPagination
        className="mx-auto w-full h-9 flex justify-between"
        count={count}
        shape="rounded"
        page={page}
        size={isSmallScreen ? 'medium' : 'large'}
        onChange={(_, page) => setPage(page)}
        siblingCount={isSmallScreen ? 0 : 2}
        boundaryCount={isSmallScreen ? 1 : 2}
      />
    </Stack>
  )
}
