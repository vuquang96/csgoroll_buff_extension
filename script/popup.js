chrome.storage.sync.get(["cb_conversionprice_csgoroll", "cb_conversionprice_buff", 'cb_priceMin', 'cb_priceMax', 'cb_rate_bonus_csgoroll'], function(items) {
    document.getElementById("cb_conversionprice_csgoroll").value = items["cb_conversionprice_csgoroll"] || "14.5";
    document.getElementById("cb_conversionprice_buff").value = items["cb_conversionprice_buff"] || "3.7";

    document.getElementById("cb_rate_bonus_csgoroll").value = items["cb_rate_bonus_csgoroll"] || "12";

    document.getElementById("cb_priceMin").value = items["cb_priceMin"] || "100";
    document.getElementById("cb_priceMax").value = items["cb_priceMax"] || "500";

});

$("#save").click(function(){
    let cb_conversionprice_csgoroll = $("#cb_conversionprice_csgoroll").val();
    let cb_conversionprice_buff = $("#cb_conversionprice_buff").val();
    let cb_rate_bonus_csgoroll = $("#cb_rate_bonus_csgoroll").val();
    let cb_priceMin = $("#cb_priceMin").val();
    let cb_priceMax = $("#cb_priceMax").val();
    
    
    chrome.storage.sync.set({
        "cb_conversionprice_csgoroll": cb_conversionprice_csgoroll,
        "cb_conversionprice_buff": cb_conversionprice_buff,
        "cb_rate_bonus_csgoroll": cb_rate_bonus_csgoroll,
        "cb_priceMin": cb_priceMin,
        "cb_priceMax": cb_priceMax
    }, function() {
        chrome.storage.sync.set({"cb_export_market_compare": '1'});
        window.open("https://buff.163.com/");
    });
});

$("#list").click(function(){
    let cb_conversionprice_csgoroll = $("#cb_conversionprice_csgoroll").val();
    let cb_conversionprice_buff     = $("#cb_conversionprice_buff").val();

    window.open(`http://localhost:9999/serve-app/public/csgoroll-buff/product/list?buff=${cb_conversionprice_buff}&csgoroll=${cb_conversionprice_csgoroll}`);
});