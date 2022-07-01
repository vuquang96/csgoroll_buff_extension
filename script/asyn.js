
function saveBuff(){
	var data_store = localStorage.getItem(cb_buff_store);
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/cb/market/buff", 
		type : 'post',
		data : {
			'data_store' 	: data_store
		},
		success: function(result){
		 	localStorage.removeItem(cb_buff_store);
		 	
		 	setTimeout(function(){
		 		var time = new Date().getTime();
	 			window.location.href = `https://www.csgoroll.com/en/top-up/steam/csgo?asyn=${time}`;
		 	}, 5000);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function getInventory(){
	var data_store = $.parseJSON(localStorage.getItem(cb_conversionprice_store));

	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/cb/market/list/inventory", 
		type : 'get',
		data : {
			'price_min' : data_store.cb_priceMin,
			'price_max' : data_store.cb_priceMax,
		},
		success: function(result){
		 	localStorage.setItem(cb_inventory_store, JSON.stringify(result));
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}

function saveCsgoroll(){
	console.log('saveCsgoroll')

	var data_store = localStorage.getItem(cb_csgoroll_store);
	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/cb/market/csgoroll", 
		type : 'post',
		data : {
			'data_store' 	: data_store
		},
		success: function(result){
		 	localStorage.removeItem(cb_csgoroll_store);
		 	localStorage.removeItem(cb_inventory_store);

			setTimeout(function(){
    			downloadData();
    		}, 2000);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}


function downloadData(){
	console.log('downloadData')
	var data_store = $.parseJSON(localStorage.getItem(cb_conversionprice_store));

	$.ajax({
		url: "http://localhost:9999/serve-app/public/api/v1/cb/market/download-data", 
		type : 'get',
		data : {
			'buff' : data_store.cb_conversionprice_buff,
			'csgoroll' : data_store.cb_conversionprice_csgoroll,
			'rate_bonus_csgoroll' : data_store.cb_rate_bonus_csgoroll,
		},
		success: function(result){
		 	var data = [];
		 	$.each(result, function(index, item){
		 		let buff = (item.buff == null) ? '' : item.buff; 
		 		let csgoroll = (item.csgoroll == null) ? '' : item.csgoroll; 
		 		let rate = (item.rate == null) ? '' : item.rate; 

		 		let tmp = [
					item.name,
					buff,
					csgoroll,
					rate
				];
				data.push(tmp);
		 	});
		 	var headers = [
				'Ten do',
				`Buff(*${data_store.cb_conversionprice_buff})`,
				`Csgoroll(*${data_store.cb_conversionprice_csgoroll} * ${data_store.cb_rate_bonus_csgoroll}%)`,
				'So sanh (%)'
			];
			data.unshift(headers);
		 	downloadBlob(arrayToCsv(data), getTime() + '_buff_vs_csgoroll.csv', 'text/csv;charset=utf-8;');

		 	setTimeout(function(){
    			window.close();
    		}, 5000);
	  	},
	  	error: function(result){
		  	ajaxError();
	    },
	});
}