import { Order, PrismaClient } from '@prisma/client'
import { prisma } from 'backend/db/prisma'

type CreateListingPayload = {
  userId: string
  listingId: string
}

export class Orders {
  private readonly prisma: PrismaClient['order']

  constructor() {
    this.prisma = prisma['order']
  }

  async createOrder(data: CreateListingPayload): Promise<Order> {
    const result = await prisma.order.create({ data })
    return result
  }
}
