/* eslint-disable */
import searchValue from '../../server'

const fetch = require('node-fetch')
const redis = require('redis')
const client = redis.createClient()
const { promisify } = require('util')

const setAsync = promisify(client.set).bind(client)

async function fetchProducts() {
    searchParameters = searchValue
    console.log(searchParameters)
    data = [];
    for(i=0; i< 20 ; i++){
        searchParameters = req.params.search;
        const res = await fetch('https://api.wegmans.io/products/search?query='+searchParameters+'&api-version=2018-10-18&subscription-key=65acb501589d4116859501e7bb190443')
        .then()
        .catch((err) => {res.status(200); res.send("Nothing matches your search");});
        products = await res.json();

        if(Boolean(products['results'][i]['sku'])){
            pNum = products['results'][i]['sku']
        }

        const price = await fetch('https://api.wegmans.io/products/'+pNum+'/prices?api-version=2018-10-18&subscription-key=65acb501589d4116859501e7bb190443')
        .then()
        .catch((err) => {res.status(200); res.send("Nothing matches your search");});
        prices = await price.json();
        
        try{
            if(typeof(price) != "undefined"){
                value = { item_name : products['results'][i]['name'], cost: prices['stores'][i]['price']};
                data.push(value)
            }
        }catch(e){
            console.log("undefined")
        }
    }
    const success = await setAsync('products', JSON.stringify(data))
}

fetchProducts()
module.exports = fetchProducts
