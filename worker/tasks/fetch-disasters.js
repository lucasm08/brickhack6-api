/* eslint-disable */

const fetch = require('node-fetch')
const redis = require('redis')
const client = redis.createClient()
const { promisify } = require('util')

const setAsync = promisify(client.set).bind(client)

const baseUrl = `https://api.reliefweb.int/v1/disasters?appname=rwint-user-0&profile=list&preset=latest&slim=0&fields[include][]=country&limit=100`

async function fetchDisasters() {
  const res = await fetch(baseUrl)
  let data = await res.json()
  const disasters = data && data.data
  console.log('Got: ', disasters.length, 'disasters')
  const success = await setAsync('disasters', JSON.stringify(disasters))

  console.log({ success })
}

fetchDisasters()
module.exports = fetchDisasters
