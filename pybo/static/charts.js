setInterval(function timeset(){
    function loadndraw1(){
        $.getJSON('https://api.bithumb.com/public/transaction_history/BTC_KRW', function(data) {
        var price1 = `${data.data[1].price}`
        var price2 = `${data.data[2].price}`
        var price3 = `${data.data[3].price}`
        var price4 = `${data.data[4].price}`
        var price5 = `${data.data[5].price}`
        var price6 = `${data.data[6].price}`
        var price7 = `${data.data[7].price}`         

            // 여기부턴 차트 그리기 코드
            var ctx = document.getElementById('myChart1').getContext('2d');
            var chart = new Chart(ctx, {
            //차트 종류
            type: 'line',
            //차트 데이터 로딩
            data: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                    label: 'BTC',
                    borderColor: 'lightgray',
                    fill: true,
                    data: [price1, price2, price3, price4, price5, price6, price7]
                }]
            },
            //옵션 https://www.chartjs.org/samples/latest/scales/gridlines-display.html 참조
            options: {
                maintainAspectRatio: false, //차트높이div구속(출처: https://surhommejk.tistory.com/421)
                labels: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                            //drawBorder: true, //x,y 축 표시 여부(기본값 true)
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            //drawBorder: false,
                            drawOnChartArea: false,
                            drawTicks: false, //x, y 축 눈금자 표기여부
                            stepSize: 0
                        },
                        ticks: {    //dataset값(y축) 스케일(눈금) 조절, x축은 라벨임.
                            display: false,
                            //min: 0, //눈금 최대 값
                            //max: 10, //눈금 최소 값
                            //stepSize: 1 //눈금 간격
                        }
                    }]
                },
                legend: {
                    display: false
                },
                // title: {     //그래프 전체의 Title 설정 관련 옵션
                //     display: false,
                //     text: 'BTC 추이'
                // }
            }
            });
        });
    }
    function loadndraw2(){
        $.getJSON('https://api.bithumb.com/public/transaction_history/ETH_KRW', function(data) {
        var price1 = `${data.data[1].price}`
        var price2 = `${data.data[2].price}`
        var price3 = `${data.data[3].price}`
        var price4 = `${data.data[4].price}`
        var price5 = `${data.data[5].price}`
        var price6 = `${data.data[6].price}`
        var price7 = `${data.data[7].price}`           

            var ctx = document.getElementById('myChart2').getContext('2d');
            var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                    label: 'ETH',
                    borderColor: 'lightgray',
                    fill: true,
                    data: [price1, price2, price3, price4, price5, price6, price7]
                }]
            },
            options: {
                maintainAspectRatio: false,
                labels: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
                legend: {
                    display: false
                },
            }
            });
        });
    }
    function loadndraw3(){
        $.getJSON('https://api.bithumb.com/public/transaction_history/LTC_KRW', function(data) {
        var price1 = `${data.data[1].price}`
        var price2 = `${data.data[2].price}`
        var price3 = `${data.data[3].price}`
        var price4 = `${data.data[4].price}`
        var price5 = `${data.data[5].price}`
        var price6 = `${data.data[6].price}`
        var price7 = `${data.data[7].price}`           

            var ctx = document.getElementById('myChart3').getContext('2d');
            var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                    label: 'LTC',
                    borderColor: 'lightgray',
                    fill: true,
                    data: [price1, price2, price3, price4, price5, price6, price7]
                }]
            },
            options: {
                maintainAspectRatio: false,
                labels: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                        ticks: { 
                            display: false,
                        }
                    }]
                },
                legend: {
                    display: false
                },
            }
            });
        });
    }
    loadndraw1();
    loadndraw2();
    loadndraw3();

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
            return "+"+price_rate+"%";
        }
        else{
            if (now_price == prev_price){
                return "±0%";
            }
            else{
                return price_rate+"%";
            }
        }
    }

    function chart_text1() {
        $.getJSON('https://api.bithumb.com/public/ticker/BTC_KRW', function(data) {
            var text1 = `${data.data.closing_price}`
            //var text2 = `${data.data.prev_closing_price}`
            n_text1 = formating_kr(text1);
            //n_text2 = chk_rate(text2, text1);
            //result = "<br>"+"비트코인&nbsp;BTC/KRW<br>"+n_text1+"원<br>"+n_text2;
            $(".btcprice").html("&nbsp;"+n_text1+"원");
        });
        $.getJSON('https://api.bithumb.com/public/transaction_history/BTC_KRW', function(data) {
            var price6 = `${data.data[6].price}`
            var price7 = `${data.data[7].price}`   
            n_price = chk_rate(price6, price7);
            $(".btcrate").html(n_price);
        });
    }
    function chart_text2() {
        $.getJSON('https://api.bithumb.com/public/ticker/ETH_KRW', function(data) {
            var text1 = `${data.data.closing_price}`
            //var text2 = `${data.data.prev_closing_price}`
            n_text1 = formating_kr(text1);
            //n_text2 = chk_rate(text2, text1);
            //result = "<br>"+"비트코인&nbsp;BTC/KRW<br>"+n_text1+"원<br>"+n_text2;
            $(".ethprice").html("&nbsp;"+n_text1+"원");
        });
        $.getJSON('https://api.bithumb.com/public/transaction_history/ETH_KRW', function(data) {
            var price6 = `${data.data[6].price}`
            var price7 = `${data.data[7].price}`   
            n_price = chk_rate(price6, price7);
            $(".ethrate").html(n_price);
        });
    }
    function chart_text3() {
        $.getJSON('https://api.bithumb.com/public/ticker/LTC_KRW', function(data) {
            var text1 = `${data.data.closing_price}`
            //var text2 = `${data.data.prev_closing_price}`
            n_text1 = formating_kr(text1);
            //n_text2 = chk_rate(text2, text1);
            //result = "<br>"+"비트코인&nbsp;BTC/KRW<br>"+n_text1+"원<br>"+n_text2;
            $(".ltcprice").html("&nbsp;"+n_text1+"원");
        });
        $.getJSON('https://api.bithumb.com/public/transaction_history/LTC_KRW', function(data) {
            var price6 = `${data.data[6].price}`
            var price7 = `${data.data[7].price}`   
            n_price = chk_rate(price6, price7);
            $(".ltcrate").html(n_price);
        });
    }
    chart_text1();
    chart_text2();
    chart_text3();

    //setTimeout('location.reload()',15000); //15초마다 페이지 새로고침, 10000은 10초임.
},8000)

function timeset(){
    function loadndraw1(){
        $.getJSON('https://api.bithumb.com/public/transaction_history/BTC_KRW', function(data) {
        var price1 = `${data.data[1].price}`
        var price2 = `${data.data[2].price}`
        var price3 = `${data.data[3].price}`
        var price4 = `${data.data[4].price}`
        var price5 = `${data.data[5].price}`
        var price6 = `${data.data[6].price}`
        var price7 = `${data.data[7].price}`

            // 여기부턴 차트 그리기 코드
            var ctx = document.getElementById('myChart1').getContext('2d');
            var chart = new Chart(ctx, {
            //차트 종류
            type: 'line',
            //차트 데이터 로딩
            data: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                    label: 'BTC',
                    borderColor: 'lightgray',
                    fill: true,
                    data: [price1, price2, price3, price4, price5, price6, price7]
                }]
            },
            //옵션 https://www.chartjs.org/samples/latest/scales/gridlines-display.html 참조
            options: {
                maintainAspectRatio: false, //차트높이div구속(출처: https://surhommejk.tistory.com/421)
                labels: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                            //drawBorder: true, //x,y 축 표시 여부(기본값 true)
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            //drawBorder: false,
                            drawOnChartArea: false,
                            drawTicks: false, //x, y 축 눈금자 표기여부
                            stepSize: 0
                        },
                        ticks: {    //dataset값(y축) 스케일(눈금) 조절, x축은 라벨임.
                            display: false,
                            //min: 0, //눈금 최대 값
                            //max: 10, //눈금 최소 값
                            //stepSize: 1 //눈금 간격
                        }
                    }]
                },
                legend: {
                    display: false
                },
                // title: {     //그래프 전체의 Title 설정 관련 옵션
                //     display: false,
                //     text: 'BTC 추이'
                // }
            }
            });
        });
    }
    function loadndraw2(){
        $.getJSON('https://api.bithumb.com/public/transaction_history/ETH_KRW', function(data) {
        var price1 = `${data.data[1].price}`
        var price2 = `${data.data[2].price}`
        var price3 = `${data.data[3].price}`
        var price4 = `${data.data[4].price}`
        var price5 = `${data.data[5].price}`
        var price6 = `${data.data[6].price}`
        var price7 = `${data.data[7].price}`

            var ctx = document.getElementById('myChart2').getContext('2d');
            var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                    label: 'ETH',
                    borderColor: 'lightgray',
                    fill: true,
                    data: [price1, price2, price3, price4, price5, price6, price7]
                }]
            },
            options: {
                maintainAspectRatio: false,
                labels: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
                legend: {
                    display: false
                },
            }
            });
        });
    }
    function loadndraw3(){
        $.getJSON('https://api.bithumb.com/public/transaction_history/LTC_KRW', function(data) {
        var price1 = `${data.data[1].price}`
        var price2 = `${data.data[2].price}`
        var price3 = `${data.data[3].price}`
        var price4 = `${data.data[4].price}`
        var price5 = `${data.data[5].price}`
        var price6 = `${data.data[6].price}`
        var price7 = `${data.data[7].price}`

            var ctx = document.getElementById('myChart3').getContext('2d');
            var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [{
                    label: 'LTC',
                    borderColor: 'lightgray',
                    fill: true,
                    data: [price1, price2, price3, price4, price5, price6, price7]
                }]
            },
            options: {
                maintainAspectRatio: false,
                labels: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            drawOnChartArea: false,
                            drawTicks: false,
                            stepSize: 0
                        },
                        ticks: {
                            display: false,
                        }
                    }]
                },
                legend: {
                    display: false
                },
            }
            });
        });
    }
    loadndraw1();
    loadndraw2();
    loadndraw3();

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
            return "+"+price_rate+"%";
        }
        else{
            if (now_price == prev_price){
                return "±0%";
            }
            else{
                return price_rate+"%";
            }
        }
    }

    function chart_text1() {
        $.getJSON('https://api.bithumb.com/public/ticker/BTC_KRW', function(data) {
            var text1 = `${data.data.closing_price}`
            //var text2 = `${data.data.prev_closing_price}`
            n_text1 = formating_kr(text1);
            //n_text2 = chk_rate(text2, text1);
            //result = "<br>"+"비트코인&nbsp;BTC/KRW<br>"+n_text1+"원<br>"+n_text2;
            $(".btcprice").html("&nbsp;"+n_text1+"원");
        });
        $.getJSON('https://api.bithumb.com/public/transaction_history/BTC_KRW', function(data) {
            var price6 = `${data.data[6].price}`
            var price7 = `${data.data[7].price}`
            n_price = chk_rate(price6, price7);
            $(".btcrate").html(n_price);
        });
    }
    function chart_text2() {
        $.getJSON('https://api.bithumb.com/public/ticker/ETH_KRW', function(data) {
            var text1 = `${data.data.closing_price}`
            //var text2 = `${data.data.prev_closing_price}`
            n_text1 = formating_kr(text1);
            //n_text2 = chk_rate(text2, text1);
            //result = "<br>"+"비트코인&nbsp;BTC/KRW<br>"+n_text1+"원<br>"+n_text2;
            $(".ethprice").html("&nbsp;"+n_text1+"원");
        });
        $.getJSON('https://api.bithumb.com/public/transaction_history/ETH_KRW', function(data) {
            var price6 = `${data.data[6].price}`
            var price7 = `${data.data[7].price}`
            n_price = chk_rate(price6, price7);
            $(".ethrate").html(n_price);
        });
    }
    function chart_text3() {
        $.getJSON('https://api.bithumb.com/public/ticker/LTC_KRW', function(data) {
            var text1 = `${data.data.closing_price}`
            //var text2 = `${data.data.prev_closing_price}`
            n_text1 = formating_kr(text1);
            //n_text2 = chk_rate(text2, text1);
            //result = "<br>"+"비트코인&nbsp;BTC/KRW<br>"+n_text1+"원<br>"+n_text2;
            $(".ltcprice").html("&nbsp;"+n_text1+"원");
        });
        $.getJSON('https://api.bithumb.com/public/transaction_history/LTC_KRW', function(data) {
            var price6 = `${data.data[6].price}`
            var price7 = `${data.data[7].price}`
            n_price = chk_rate(price6, price7);
            $(".ltcrate").html(n_price);
        });
    }
    chart_text1();
    chart_text2();
    chart_text3();

    //setTimeout('location.reload()',15000); //15초마다 페이지 새로고침, 10000은 10초임.
}
timeset();