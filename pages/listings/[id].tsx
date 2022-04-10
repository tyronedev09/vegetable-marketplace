import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import ErrorHandler from 'frontend/components/common/ErrorHandler'
import Loader from 'frontend/components/common/Loader'
import ConfirmOrderDialog from 'frontend/components/listing/ConfirmOrder'
import { useCreateOrder, useListingDetails } from 'frontend/data'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const ListingDetails: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { createOrder } = useCreateOrder()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)

  const { listing, isLoading, isError } = useListingDetails(id as string)
  if (isLoading) return <Loader />
  if (isError) return <ErrorHandler error={isError} />

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    handleClose()
    if (listing?.id) {
      try {
        await createOrder(listing.id)
        enqueueSnackbar('New order successfully posted!', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('New order failed to post. Try again.', { variant: 'error' })
      }
    }
  }

  const handleClose = () => setOpen(false)

  return (
    <Grid container>
      {listing?.id ? (
        <>
          <Grid item xs={12}>
            <Box m={4}>
              <Typography variant="h3" gutterBottom>
                {listing.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {listing.description}
              </Typography>
              {listing.category ? (
                <Box mt={2}>
                  <Chip label={listing.category} style={{ textTransform: 'capitalize' }} />
                </Box>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box m={4} mt={2}>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Place Order
              </Button>
            </Box>
          </Grid>
        </>
      ) : null}
      <ConfirmOrderDialog open={open} onSubmit={submitData} handleClose={handleClose} />
    </Grid>
  )
}

export default ListingDetails
