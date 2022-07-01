jQuery(document).ready(function(){
	
	async function run(){
		console.log(
	        "%cTạo Dữ Liệu! " + location.hostname,
	        "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
	  	);

		if(location.hostname == 'buff.163.com') {
	     	var buffPages = 1;
	     	for (var i = 1; i <= buffPages; i++) {
	     		console.log(i +'/'+ buffPages);

	     		buffPages = await getDataBuff(createUrlBuff(i));
	     		$(".progress-buff .progress__bar").css('width', percentage(i, buffPages) + '%');

	     		//await sleep(getRandomInt(2) * 1000);
	     	}
	     	saveBuff();
	    }

		if(location.hostname == 'www.csgoroll.com') {
			$(".progress-buff .progress__bar").css('width', '100%');

			getInventory();
			await sleep(6000);

			var inventory = $.parseJSON(localStorage.getItem(cb_inventory_store));
			var inventoryLength = inventory.length;


	     	for (var i = 0; i < inventoryLength; i++) {
	     		console.log(i +'/'+ inventoryLength);
	     		await searchCsgoroll(inventory[i].name);
	     		$(".progress-csgoroll .progress__bar").css('width', percentage(i, inventoryLength) + '%');

	     		if(i != 0) {
					if(i % 5 == 0) {
						await sleep(1000);
					}
		     		if(i % 10 == 0) {
						await sleep(2000);
					}
					if(i % 100 == 0) {
						await sleep(10000);
					}
					if(i % 500 == 0) {
						await sleep(20000);
						console.clear();
					}
	     		}
	     	}
			saveCsgoroll();	
	    }
	}


	$(function(){
		if(window.location.hostname == 'buff.163.com') {
			chrome.storage.sync.get(["cb_export_market_compare"], function (obj) {
			    if(obj.cb_export_market_compare !== undefined && obj.cb_export_market_compare == 1){
			    	chrome.storage.sync.set({"cb_export_market_compare": '0'});

					localStorage.removeItem(cb_buff_store);
			    	createLoading();
			    	setTimeout(function(){
						run();
					}, 2000);
		    		
			    }
			});
		}

    	if(window.location.hostname == 'www.csgoroll.com') {
    		var asyn 			= getParam('asyn');
    		if(asyn) {
				var time = new Date().getTime();
				time -= asyn;
				if(time < 60 * 1000) {
					localStorage.removeItem(cb_inventory_store);
					localStorage.removeItem(cb_csgoroll_store);

					createLoading();
					setTimeout(function(){
						$("cw-message-list").remove();
						changeurl(`?asyn=0`, 'www.csgoroll.com');
						chrome.storage.sync.get(["cb_conversionprice_csgoroll", "cb_conversionprice_buff", "cb_priceMin", "cb_priceMax", "cb_desired_ratio", "cb_rate_bonus_csgoroll"], function (obj) {
						    var data = {
						    	'cb_conversionprice_csgoroll' 	: obj.cb_conversionprice_csgoroll,
						    	'cb_conversionprice_buff' 		: obj.cb_conversionprice_buff,
						    	'cb_desired_ratio' 				: obj.cb_desired_ratio,
						    	'cb_rate_bonus_csgoroll' 				: obj.cb_rate_bonus_csgoroll,
						    	'cb_priceMin' 					: obj.cb_priceMin,
						    	'cb_priceMax' 					: obj.cb_priceMax
						    };
						    localStorage.setItem(cb_conversionprice_store, JSON.stringify(data));
						});
						
						setTimeout(function(){
							run();
						}, 2000);
					}, 2000);
				}
    		}
    	}
	});


	setTimeout(function(){
	
		chrome.storage.sync.get(["cb_conversionprice_csgoroll", "cb_conversionprice_buff", "cb_priceMin", "cb_priceMax", "cb_desired_ratio", "cb_rate_bonus_csgoroll"], function (obj) {
					    var data = {
					    	//'cb_conversionprice_csgoroll' 	: obj.cb_conversionprice_csgoroll,
					    	'cb_conversionprice_csgoroll' 	: 14.5,
					    	'cb_conversionprice_buff' 		: obj.cb_conversionprice_buff,
					    	//'cb_desired_ratio' 				: obj.cb_desired_ratio,
					    	//'cb_rate_bonus_csgoroll' 				: obj.cb_rate_bonus_csgoroll,
					    	'cb_desired_ratio' 				: 5,
					    	'cb_rate_bonus_csgoroll' 				: 12,
					    	'cb_priceMin' 					: obj.cb_priceMin,
					    	'cb_priceMax' 					: obj.cb_priceMax
					    };
					    localStorage.setItem(cb_conversionprice_store, JSON.stringify(data));
					});
		
		setTimeout(function(){
			downloadData();
		}, 1500);
		//console.log(searchCsgoroll('Sticker | ANGE1 (Gold) | Katowice 2019'))
	}, 2000);

});

