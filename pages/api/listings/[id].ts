import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { Listings } from 'backend/models/listings'
import { Users } from 'backend/models/users'

export default withApiAuthRequired(async function handle(req, res) {
  const session = getSession(req, res)
  const users = new Users()
  if (!session) {
    res.status(401).end
    return
  }

  const { userId } = users.getUserDataFromSession(session)
  const { method, query } = req
  const listings = new Listings()

  switch (method) {
    case 'GET': {
      if (query.id) {
        const response = await listings.listListingDetails(query.id as string)

        if (response) {
          res.status(200).json(response)
        } else {
          res.status(404).json({ message: 'Listing Not Found' })
        }
      } else {
        res.status(400).json({ message: 'Bad Request' })
      }
      break
    }

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
