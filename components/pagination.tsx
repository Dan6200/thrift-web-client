import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function Paginate({ count }: { count: number }) {
  return (
    <Stack spacing={1} className="foreground">
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        siblingCount={3}
        boundaryCount={2}
      />
    </Stack>
  )
}
