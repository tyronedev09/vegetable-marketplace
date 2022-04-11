import { Box, Button, Typography } from '@mui/material'
import ErrorHandler from 'frontend/components/common/ErrorHandler'
import { NextLinkComposed } from 'frontend/components/common/Link'
import Loader from 'frontend/components/common/Loader'
import ListingList from 'frontend/components/listing/ListingList'
import MyOrders from 'frontend/components/order/MyOrders'
import { useMyListings } from 'frontend/data'
import type { NextPage } from 'next'

const Dashboard: NextPage = () => {
  const { myListings, isLoading, isError } = useMyListings()
  if (isLoading) return <Loader />
  if (isError) return <ErrorHandler error={isError} />
  return (
    <Box m={4}>
      <Typography variant="h3" gutterBottom>
        My Dashboard
      </Typography>
      <Typography variant="h4" gutterBottom>
        My listings
      </Typography>
      <ListingList listings={myListings} />
      <Button sx={{ my: 4 }} component={NextLinkComposed} to={'/createListing'} variant="contained">
        Create new listing
      </Button>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <MyOrders />
    </Box>
  )
}

export default Dashboard
