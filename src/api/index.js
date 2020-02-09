import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.set('view engine', 'jade');

	api.get('/products/:search', async function (req, res) {
	data = [];
	for(i=0; i< 20 ; i++){
		res.header("Content-Type",'application/json');
		searchParameters = req.params.search;
		const response = await fetch('https://api.wegmans.io/products/search?query='+searchParameters+'&api-version=2018-10-18&subscription-key=65acb501589d4116859501e7bb190443')
		.then()
		.catch((err) => {res.status(200); res.send("Nothing matches your search");});
		products = await response.json();
		if(Boolean(products['results'][i]['sku'])){
		pNum = products['results'][i]['sku']
		}
		const price = await fetch('https://api.wegmans.io/products/'+pNum+'/prices?api-version=2018-10-18&subscription-key=65acb501589d4116859501e7bb190443')
		.then()
		.catch((err) => {res.status(200); res.send("Nothing matches your search");});
		prices = await price.json();
		console.log((price) !== 'undefined')
		try{
		if(typeof(price) != "undefined"){
		console.log(prices['stores'][i]['price'])
		value = { item_name : products['results'][i]['name'], cost: prices['stores'][i]['price']};
		data.push(value)
		}
		}catch(e){
		console.log("undefined")
		}
	}
	res.status(200)
	res.send(data)
	console.log('Out of loop')
	})

		return api;
	}
