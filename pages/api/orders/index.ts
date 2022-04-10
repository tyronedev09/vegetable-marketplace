import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { Orders } from 'backend/models/orders'
import { Users } from 'backend/models/users'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  const users = new Users()
  if (!session) {
    res.status(401).end
    return
  }

  const { userId } = users.getUserDataFromSession(session)
  const { method } = req
  const orders = new Orders()

  switch (method) {
    case 'POST':
      const order = await orders.createOrder({ ...req.body, userId })
      res.json(order)
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
