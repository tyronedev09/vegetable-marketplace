import { Prisma } from '@prisma/client'
export type OrderWithListing = Prisma.OrderGetPayload<{
  include: { listing: true }
}>
