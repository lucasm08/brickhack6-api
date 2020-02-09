import redis from 'redis'
import { promisify } from 'util'
import { Router } from 'express'
import { Server } from 'http'
import searchValue from '../../server'

const client = redis.createClient()

const getAsync = promisify(client.get).bind(client)

const router = Router()

const getProducts = async (req, res) => {
    searchParameters = searchValue
    console.log(searchParameters)
  
  try {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/') // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    const products = await getAsync('products')
    res.status(200).json({ data: JSON.parse(products) })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const getProduct = async (req, res) => {}  

router.route('/').get(getProducts)
router.route('/:search').get(getProduct)

export default router
