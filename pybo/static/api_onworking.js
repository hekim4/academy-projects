function formating_us(vars){
    vars = Number(vars);
    vars = vars.toFixed(2);
    vars = vars.toLocaleString();
    vars = String(vars);
    return vars;
}

function formating_kr(vars){
    vars = Number(vars).toLocaleString();
    vars = String(vars);
    return vars;
}

function chk_rate(prev_price, now_price) {
    prev_price = Number(prev_price);
    now_price = Number(now_price);
    price_rate = (now_price-prev_price)/prev_price*100
    price_rate = price_rate.toFixed(2);
    price_rate = String(price_rate);
    if (now_price > prev_price){
        return "▲"+price_rate+"%";
    }
    else{
        if (now_price == prev_price){
            return "=0.00%";
        }
        else{
            return "▼"+price_rate+"%";
        }
    }
}


setInterval(function loading() {
    // 빗썸의 7개 코인 시세(json데이터는{status, data{}}의 형태이므로 data.data.object구조로 호출)
    $.getJSON('https://api.bithumb.com/public/ticker/BTC_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pbtc").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/ETH_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_peth").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/LTC_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pltc").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/LINK_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_plink").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/DOT_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pdot").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/EOS_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_peos").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/XRP_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pxrp").html(result);
    });

    // 업비트의 7개 코인 시세(주의: JSON Array 안에 들어있으므로 data호출 시, 인덱스번호 필요!)
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-BTC', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pbtc").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-ETH', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_peth").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-LTC', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pltc").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-LINK', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_plink").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-DOT', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pdot").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-EOS', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_peos").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-XRP', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pxrp").html(result);
    });

    // 폴로닉스(미화기준 _ 코인원, 고팍스, 코빗 등은 CORS Policy가 걸려있어서 빠른 구현이 어려움..)
    $.getJSON('https://poloniex.com/public?command=returnTicker', function(data) {
        var text1 = `${data.USDT_BTC.last}`
        var text11 = `${data.USDT_BTC.lowestAsk}`
        var text12 = `${data.USDT_BTC.highestBid}`
        text1 = formating_us(text1);
        text11 = formating_us(text11);
        text12 = formating_us(text12);
        text1 = text1 + " ( - )<br>" + text11 + "/" + text12;

        var text2 = `${data.USDT_ETH.last}`
        var text21 = `${data.USDT_ETH.lowestAsk}`
        var text22 = `${data.USDT_ETH.highestBid}`
        text2 = formating_us(text2);
        text21 = formating_us(text21);
        text22 = formating_us(text22);
        text2 = text2 + " ( - )<br>" + text21 + "/" + text22;
 
        var text3 = `${data.USDT_LTC.last}`
        var text31 = `${data.USDT_LTC.lowestAsk}` 
        var text32 = `${data.USDT_LTC.highestBid}`
        text3 = formating_us(text3);
        text31 = formating_us(text31);
        text32 = formating_us(text32);
        text3 = text3 + " ( - )<br>" + text31 + "/" + text32;

        var text4 = `${data.USDT_LINK.last}`
        var text41 = `${data.USDT_LINK.lowestAsk}` 
        var text42 = `${data.USDT_LINK.highestBid}`
        text4 = formating_us(text4);
        text41 = formating_us(text41);
        text42 = formating_us(text42);
        text4 = text4 + " ( - )<br>" + text41 + "/" + text42;

        var text5 = `${data.USDT_DOT.last}`
        var text51 = `${data.USDT_DOT.lowestAsk}` 
        var text52 = `${data.USDT_DOT.highestBid}` 
        text5 = formating_us(text5);
        text51 = formating_us(text51);
        text52 = formating_us(text52);
        text5 = text5 + " ( - )<br>" + text51 + "/" + text52;

        var text6 = `${data.USDT_EOS.last}`
        var text61 = `${data.USDT_EOS.lowestAsk}`
        var text62 = `${data.USDT_EOS.highestBid}`
        text6 = formating_us(text6);
        text61 = formating_us(text61);
        text62 = formating_us(text62);
        text6 = text6 + " ( - )<br>" + text61 + "/" + text62;

        var text7 = `${data.USDT_XRP.last}`
        var text71 = `${data.USDT_XRP.lowestAsk}` 
        var text72 = `${data.USDT_XRP.highestBid}` 
        text7 = formating_us(text7);
        text71 = formating_us(text71);
        text72 = formating_us(text72);
        text7 = text7 + " ( - )<br>" + text71 + "/" + text72;

        $(".pol_pbtc").html(text1);
        $(".pol_peth").html(text2); 
        $(".pol_pltc").html(text3); 
        $(".pol_plink").html(text4); 
        $(".pol_pdot").html(text5); 
        $(".pol_peos").html(text6);
        $(".pol_pxrp").html(text7);  
    });
    // 페이지 새로 고침
    //setTimeout('location.reload()',30000); //30초마다 페이지 새로고침, 10000은 10초임.
},10000)


function loading() {
    // 빗썸의 7개 코인 시세(json데이터는{status, data{}}의 형태이므로 data.data.object구조로 호출)
    $.getJSON('https://api.bithumb.com/public/ticker/BTC_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pbtc").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/ETH_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_peth").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/LTC_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pltc").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/LINK_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_plink").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/DOT_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pdot").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/EOS_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_peos").html(result);
    });
    $.getJSON('https://api.bithumb.com/public/ticker/XRP_KRW', function(data) {
        var text = `${data.data.closing_price}`
        var text11 = `${data.data.max_price}`
        var text12 = `${data.data.min_price}`
        var text13 = `${data.data.prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".bth_pxrp").html(result);
    });

    // 업비트의 7개 코인 시세(주의: JSON Array 안에 들어있으므로 data호출 시, 인덱스번호 필요!)
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-BTC', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pbtc").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-ETH', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_peth").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-LTC', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pltc").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-LINK', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_plink").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-DOT', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pdot").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-EOS', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_peos").html(result);
    });
    $.getJSON('https://api.upbit.com/v1/ticker?markets=KRW-XRP', function(data) {
        var text = `${data[0].trade_price}`
        var text11 = `${data[0].high_price}`
        var text12 = `${data[0].low_price}`
        var text13 = `${data[0].prev_closing_price}`
        n_text = formating_kr(text);
        n_text11 = formating_kr(text11);
        n_text12 = formating_kr(text12);
        n_text13 = chk_rate(text13, text);
        result = n_text + " ("+ n_text13 + ")<br>" + n_text11 + "/" + n_text12;
        $(".ubt_pxrp").html(result);
    });

    // 폴로닉스(미화기준 _ 코인원, 고팍스, 코빗 등은 CORS Policy가 걸려있어서 빠른 구현이 어려움..)
    $.getJSON('https://poloniex.com/public?command=returnTicker', function(data) {
        var text1 = `${data.USDT_BTC.last}`
        var text11 = `${data.USDT_BTC.lowestAsk}`
        var text12 = `${data.USDT_BTC.highestBid}`
        text1 = formating_us(text1);
        text11 = formating_us(text11);
        text12 = formating_us(text12);
        text1 = text1 + " ( - )<br>" + text11 + "/" + text12;

        var text2 = `${data.USDT_ETH.last}`
        var text21 = `${data.USDT_ETH.lowestAsk}`
        var text22 = `${data.USDT_ETH.highestBid}`
        text2 = formating_us(text2);
        text21 = formating_us(text21);
        text22 = formating_us(text22);
        text2 = text2 + " ( - )<br>" + text21 + "/" + text22;

        var text3 = `${data.USDT_LTC.last}`
        var text31 = `${data.USDT_LTC.lowestAsk}`
        var text32 = `${data.USDT_LTC.highestBid}`
        text3 = formating_us(text3);
        text31 = formating_us(text31);
        text32 = formating_us(text32);
        text3 = text3 + " ( - )<br>" + text31 + "/" + text32;

        var text4 = `${data.USDT_LINK.last}`
        var text41 = `${data.USDT_LINK.lowestAsk}`
        var text42 = `${data.USDT_LINK.highestBid}`
        text4 = formating_us(text4);
        text41 = formating_us(text41);
        text42 = formating_us(text42);
        text4 = text4 + " ( - )<br>" + text41 + "/" + text42;

        var text5 = `${data.USDT_DOT.last}`
        var text51 = `${data.USDT_DOT.lowestAsk}`
        var text52 = `${data.USDT_DOT.highestBid}`
        text5 = formating_us(text5);
        text51 = formating_us(text51);
        text52 = formating_us(text52);
        text5 = text5 + " ( - )<br>" + text51 + "/" + text52;

        var text6 = `${data.USDT_EOS.last}`
        var text61 = `${data.USDT_EOS.lowestAsk}`
        var text62 = `${data.USDT_EOS.highestBid}`
        text6 = formating_us(text6);
        text61 = formating_us(text61);
        text62 = formating_us(text62);
        text6 = text6 + " ( - )<br>" + text61 + "/" + text62;

        var text7 = `${data.USDT_XRP.last}`
        var text71 = `${data.USDT_XRP.lowestAsk}`
        var text72 = `${data.USDT_XRP.highestBid}`
        text7 = formating_us(text7);
        text71 = formating_us(text71);
        text72 = formating_us(text72);
        text7 = text7 + " ( - )<br>" + text71 + "/" + text72;

        $(".pol_pbtc").html(text1);
        $(".pol_peth").html(text2);
        $(".pol_pltc").html(text3);
        $(".pol_plink").html(text4);
        $(".pol_pdot").html(text5);
        $(".pol_peos").html(text6);
        $(".pol_pxrp").html(text7);
    });
    // 페이지 새로 고침
    //setTimeout('location.reload()',30000); //30초마다 페이지 새로고침, 10000은 10초임.
}
//함수 호출
loading()
