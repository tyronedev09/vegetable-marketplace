import { Box, Card, Stack, Typography } from '@mui/material'
import { useMyOrders } from 'frontend/data'
import { NextPage } from 'next'
import ErrorHandler from '../common/ErrorHandler'
import Loader from '../common/Loader'

const MyOrders: NextPage = () => {
  const { myOrders, isLoading, isError } = useMyOrders()
  if (isLoading) return <Loader />
  if (isError) return <ErrorHandler error={isError} />

  return (
    <Stack spacing={2}>
      {myOrders &&
        myOrders.map((order) => (
          <Card key={order.id}>
            <Box p={2}>
              <Typography variant="h6">{order.listing.title}</Typography>
              <Typography variant="body1">{order.listing.description}</Typography>
            </Box>
          </Card>
        ))}
    </Stack>
  )
}

export default MyOrders
