function createUrlBuff(paged = 1, page_size = 80) {
	return `https://buff.163.com/api/market/goods/buying?game=csgo&page_num=${paged}&page_size=${page_size}&sort_by=price.desc`;
	//return `https://buff.163.com/api/market/goods?game=csgo&page_num=${paged}&min_price=1&max_price=100&page_size=${page_size}&sort_by=price.desc`;
}

async function getDataBuff(url){
	const response = await fetch(url);
	var result = await response.json();
	var data = [];

	/*item.name,
	item.sell_min_price,
	item.buy_max_price*/
	if(result.code == "OK") {
		$.each(result.data.items, function(index, item){
			var tmp = {
				'name' 				: item.name,
				'price' 			: item.sell_min_price,
			};
			data.push(tmp);
		});

		if(localStorage.getItem(cb_buff_store) == null){
			localStorage.setItem(cb_buff_store, JSON.stringify(data));
     	} else {	
     		var oldData = $.parseJSON(localStorage.getItem(cb_buff_store));
     		var merData = [...oldData, ...data];
     		localStorage.setItem(cb_buff_store, JSON.stringify(merData));
     	}
     	return result.data.total_page;
	} else {
		return -1;
	}
}

async function searchCsgoroll(name){
	try {
	  	const response = await fetch(`https://api.csgoroll.com/graphql?operationName=ItemVariantList&variables={"first":50,"minValue":0.01,"name":"${name}","orderBy":"VALUE_DESC","distinctValues":true,"usable":true,"obtainable":true,"withdrawable":true}&extensions={"persistedQuery":{"version":1,"sha256Hash":"f52769449b71d7e80961cc95fd22a368eb309a40442809953b9181d3428cfa03"}}`, {
		  "headers": {
		    "accept": "application/json, text/plain, */*",
		    "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6",
		    "ngsw-bypass": "true",
		    "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
		    "sec-ch-ua-mobile": "?0",
		    "sec-ch-ua-platform": "\"Windows\"",
		    "sec-fetch-dest": "empty",
		    "sec-fetch-mode": "cors",
		    "sec-fetch-site": "same-site"
		  },
		  "referrer": "https://www.csgoroll.com/",
		  "referrerPolicy": "strict-origin-when-cross-origin",
		  "body": null,
		  "method": "GET",
		  "mode": "cors",
		  "credentials": "include"
		});
		var result = await response.json();

		if(response.status == 200) {
			var data = [];
			if(result?.data?.itemVariants?.edges.length > 0) {
				$.each(result.data.itemVariants.edges, function(index, item){
					var tmp = {
						'name' 				: item.node.externalId,
						'price' 			: item.node.value,
					};
					data.push(tmp);
				});
			} else {
				var tmp = {
					'name' 				: name,
					'price' 			: 0,
				};
				data.push(tmp);
			}

			if(localStorage.getItem(cb_csgoroll_store) == null){
				localStorage.setItem(cb_csgoroll_store, JSON.stringify(data));
		 	} else {	
		 		var oldData = $.parseJSON(localStorage.getItem(cb_csgoroll_store));
		 		var merData = [...oldData, ...data];
		 		localStorage.setItem(cb_csgoroll_store, JSON.stringify(merData));
		 	}
		}
	} catch(err) {
	  	console.log(err.message)
	}
}