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

  async listOrders(): Promise<Order[]> {
    const orders = await prisma.order.findMany()
    return orders
  }

  async listMyOrders(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { listing: true },
    })
    return orders
  }
}
