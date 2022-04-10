import { Listing, Order } from '.prisma/client'
import useSWR, { useSWRConfig } from 'swr'
import { OrderWithListing } from 'types/order'
import { creater, fetcher } from './helpers'

export function useListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings`, fetcher)
  return {
    listings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useMyListings() {
  const { data, error } = useSWR<Listing[], Error>(`/api/listings?myListings=true`, fetcher)
  return {
    myListings: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useListingDetails(id: string) {
  const { data, error } = useSWR<Listing, Error>(id ? `/api/listings/${id}` : null, fetcher)
  return {
    listing: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCreateListing() {
  const { mutate } = useSWRConfig()
  const createListing = async (
    title: string,
    description: string,
    category: string,
  ): Promise<Listing> => {
    const body = { title, description, category }
    const response = await creater<Listing>('/api/listings/', body)

    mutate(`/api/listings`)
    mutate(`/api/listings?myListings=true`)
    return response
  }
  return { createListing }
}

export function useCreateOrder() {
  const { mutate } = useSWRConfig()
  const createOrder = async (listingId: string): Promise<Order> => {
    const body = { listingId }
    const response = await creater<Order>('/api/orders', body)

    return response
  }
  return { createOrder }
}

export function useMyOrders() {
  const { data, error } = useSWR<OrderWithListing[], Error>(`/api/orders?myOrders=true`, fetcher)
  return {
    myOrders: data,
    isLoading: !error && !data,
    isError: error,
  }
}
