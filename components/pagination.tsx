//cspell: ignore jotai
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { useAtom } from 'jotai'
import { pageNumAtom } from './products'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export default function Paginate({ count }: { count: number }) {
  const [page, setPage] = useAtom(pageNumAtom)
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={10} className="w-full my-8 mx-auto">
        <Pagination
          className="w-full h-9 flex justify-between"
          count={count}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(_, page) => setPage(page)}
          siblingCount={1}
          boundaryCount={1}
        />
      </Stack>
    </ThemeProvider>
  )
}
