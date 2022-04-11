import { Listing } from '.prisma/client'
import { Box, Card, Chip, Typography } from '@mui/material'
import { NextLinkComposed } from '../common/Link'

interface Props {
  listing: Listing
}

export default function ListingCard({ listing }: Props) {
  return (
    <Card component={NextLinkComposed} to={`/listings/${listing.id}`} style={{ cursor: 'pointer' }}>
      <Box p={2}>
        <Typography variant="h6">{listing.title}</Typography>
        <Typography variant="body1">{listing.description}</Typography>
        {listing.category ? (
          <Box mt={2}>
            <Chip label={listing.category} style={{ textTransform: 'capitalize' }} />
          </Box>
        ) : null}
      </Box>
    </Card>
  )
}
