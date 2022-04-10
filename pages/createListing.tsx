import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { NextLinkComposed } from 'frontend/components/common/Link'
import { useCreateListing } from 'frontend/data'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const categories = ['tomato', 'potato', 'cabbage', 'other']

const Dashboard: NextPage = () => {
  const { createListing } = useCreateListing()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('other')
  const [description, setDescription] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await createListing(title, description, category)
      router.push('/dashboard')
      enqueueSnackbar('New listing successfully posted!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('New listing failed to post. Try again.', { variant: 'error' })
    }
  }

  return (
    <>
      <Box m={4} maxWidth={400}>
        <form onSubmit={submitData}>
          <Typography variant="h6">New Listing</Typography>
          <TextField
            margin="normal"
            fullWidth
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <TextField
            margin="normal"
            fullWidth
            maxRows={4}
            minRows={4}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={8}
            value={description}
          />
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item, i) => (
                <MenuItem
                  key={`category-${i + 1}`}
                  value={item}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box my={2} display="flex">
            <Box mr={2}>
              <Button variant="contained" type="submit" disabled={!description || !title}>
                Create
              </Button>
            </Box>
            <Button variant="outlined" type="submit" component={NextLinkComposed} to="/dashboard">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default Dashboard
