import redis from 'redis'
import { promisify } from 'util'
import { Router } from 'express'

const client = redis.createClient()

const getAsync = promisify(client.get).bind(client)

const router = Router()

const getDisasters = async (req, res) => {
  try {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    const disasters = await getAsync('disasters')
    res.status(200).json({ data: JSON.parse(disasters) })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const getDisaster = async (req, res) => {}

router.route('/').get(getDisasters)
router.route('/:id').get(getDisaster)

export default router
