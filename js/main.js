
var allData = [];

$(document).ready(function(){
    $('.awesome-tooltip').tooltip({
        placement: 'left'
    });

    $(window).bind('scroll',function(e){
        dotnavigation();
    });

    function dotnavigation(){

        var numSections = $('section').length;

        $('#dot-nav li a').removeClass('active').parent('li').removeClass('active');
        $('section').each(function(i,item){
            var ele = $(item), nextTop;

            // console.log(ele.next().html());

            if (typeof ele.next().offset() != "undefined") {
                nextTop = ele.next().offset().top;
            }
            else {
                nextTop = $(document).height();
            }

            if (ele.offset() !== null) {
                thisTop = ele.offset().top - ((nextTop - ele.offset().top) / numSections);
            }
            else {
                thisTop = 0;
            }

            var docTop = $(document).scrollTop();

            if(docTop >= thisTop && (docTop < nextTop)){
                $('#dot-nav li').eq(i).addClass('active');
            }
        });
    }

    /* get clicks working */
    $('#dot-nav li').click(function(){

        var id = $(this).find('a').attr("href"),
            posi,
            ele,
            padding = 0;

        ele = $(id);
        posi = ($(ele).offset()||0).top - padding;

        $('html, body').animate({scrollTop:posi}, 'slow');

        return false;
    });

    /* end dot nav */
});




// Start application by loading the data
globalData();

function loadLiveData() {
    // console.log("loadData called")
    var proxy = 'http://michaeloppermann.com/proxy.php?format=xml&url=';
    var url = 'https://venmo.com/api/v5/public';
    var proxyUrl = proxy + url;

    $.getJSON(proxyUrl, function(jsonData){
        // console.log("getting here");
        // console.log(jsonData);
        // jsonData.station.forEach(function(d){
            // d.lastCommWithServer = +d.lastCommWithServer;
            // d.lat = +d.lat;
            // d.latestUpdateTime = +d.latestUpdateTime;
            // d.long = +d.long;
            // d.nbBikes = +d.nbBikes;
            // d.nbEmptyDocks = +d.nbEmptyDocks;
            // allData.push(d);
        // })
    });
    //
    // $.getJSON(url)
    //     .done(function( data ) {
    //         console.log(data);
    //         $("#live-feed").innerHTML(data);
    //         // $.each( data.items, function( i, item ) {
    //         //     $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
    //         //     if ( i === 3 ) {
    //         //         return false;
    //         //     }
    //         // });
    //     });
}


var ticker_rows = [
    '<tr id="ticker-row"><td scope="row">2017-12-07T18:09:51Z</td><td scope="row"><img class="sample-img" src="https://venmopics.appspot.com/u/v3/m/9e191a86-e829-4cca-9f4b-fdf6f7d8a77b" />Tara Kavanaugh</td><td><img class="sample-img" src="https://venmopics.appspot.com/u/v1/m/dee345b1-b3c7-45d8-b93f-6123f771524e" />Chelsea Mackay</td><td>💦🔌🔥</td><td>payment</td></tr>',
    '<tr id="ticker-row"><td scope="row">2017-12-07T18:14:08Z</td><td scope="row"><img class="sample-img" src="https://venmopics.appspot.com/u/v1/m/79bada51-a895-4e94-b5a4-bcc273bab8fb" />Mallory Sico</td><td><img class="sample-img" src="https://venmopics.appspot.com/u/v2/n/ce0a19dc-7fbf-4e8b-b55e-070f3ea0a7e6" />Madeline Jasper</td><td>Bus- Krakow to Budapest</td><td>charge</td></tr>',
    '<tr id="ticker-row"><td scope="row">2017-12-07T18:14:50Z</td><td scope="row"><img class="sample-img" src="https://venmopics.appspot.com/u/v2/m/07ff1c03-4ca5-4342-a46b-59b97f139adc" />Cedrice Webber</td><td><img class="sample-img" src="https://venmopics.appspot.com/u/v2/m/27a7f6c7-f48f-42b5-be18-e62088515aae" />Sarah Knapp</td><td>December 2017 Rent</td><td>payment</td></tr>',
    '<tr id="ticker-row"><td scope="row">2017-12-07T18:14:50Z</td><td scope="row"><img class="sample-img" src="https://venmopics.appspot.com/u/v2/m/0dcca12c-07b6-4ad3-a17b-6a7f3ce1f791" />Timmy Mahaney</td><td><img class="sample-img" src="https://s3.amazonaws.com/venmo/no-image.gif" />Matt Brock</td><td>Losing fantasy 🏈</td><td>payment</td></tr>',
    '<tr id="ticker-row"><td scope="row">2017-12-07T18:15:52Z</td><td scope="row"><img class="sample-img" src="https://venmopics.appspot.com/u/v1/m/dac1e43b-afad-497d-a24e-db3f9c95085e" />Christa Roeh</td><td><img class="sample-img" src="https://venmopics.appspot.com/u/v1/m/492168f0-e13e-4b14-b20a-10575a101e8c" />Anna Joy Buegel</td><td>Babysitting :) thank you!</td><td>payment</td></tr>'
]
var ticker_index = 1;
function ticker(){
    $('#ticker-row')
        .children('td, th')
        .animate({ padding: 0 })
        .wrapInner('<div />')
        .children()
        .slideUp(function() { $(this).closest('tr').remove(); });
    $(ticker_rows[ticker_index % ticker_rows.length]).hide().appendTo("#ticker-body").slideDown(1000);
    ticker_index += 1;
    setTimeout(ticker, 2000);
}

ticker();


function globalData(){
    // parse the date / time, ie. 2017-12-07T18:14:23Z
    var parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");
    var formatTime = d3.timeFormat("%d/%m/%Y, %H:%M:%S");

    // set the ranges
    var margin = {top: 20, right: 10, bottom: 20, left: 10};
    var width = $("#global-data").width() - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    var svg = d3.select("#global-data").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleTime().range([0, width - margin.left  - margin.right]);

    var div = d3.select("body").append("div")
        .attr("class", "tooltip2")
        .style("opacity", 0);

    var filters = [
            "Rent",
            "deposit",
            "Utilities",
            "Comcast",
            "Xfinity",
            "PSEG",
            "Internet",
            "RCN",
            "Wifi",
            "Water",
            "Gas",
            "Airbnb",
            "Hotel",
            "splitwise.com",
            "Electric",
            "Heat",
            "Air conditioning",
            "Electricity",
            "💻💸",
            "Renters",
            "Broker",
            "Apt",
            "Apartment",
            "Utility",
            "1F50C",
            "1F4B8",
            "Insurance",
            "🔌",
            "🏠",
            "🏡",
            "⚡🔌💡💸",
            "Con ed"];

    var weak_filters = [
        "December",
        "January",
        "November",
        "💸",
        "Bill",
        "Fee ",
        "YoutubeRed",
        "Spotify",
        "Family plan",
        "Month",
        "⚡",
    ];

    var food_filters = [
        "food",
        "fud",
        "foooo",
        "lunch","grill","chicken","sandwich",
        "breakfast",
        "dinner",
        "cafe", "tea","drink","grocer","dunkin","fila",
        "🍏",
        "🍎",
        "🍐",
        "🍊",
        "🍋",
        "🍌",
        "🍉",
        "🍇",
        "🍓",
        "🍈",
        "🍒",
        "🍑",
        "🍍",
        "🥝",
        "🥑","🍅","🍆","🥒","🥕","🌽","🌶","🥔","🍠","🌰","🥜","🍯","🥐","🍞","🥖","🧀","🥚","🍳","🥓","🥞","🍤","🍗","🍖","🍕","🌭","🍔","🍟","🥙","🌮","🌯","🥗","🥘","🍝","🍜","🍲","🍥","🍣","🍱","🍛","🍚","🍙","🍘","🍢","🍡","🍧","🍨","🍦","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🥛","🍼","☕","🍵","🍶","🍺","🍻","🥂","🍷","🥃","🍸","🍹","🍾","🥄","🍴","🍽"
    ]

    function loadData(){
        var data = [];
        d3.csv("venmo_scraper_test.csv", function(d){
            d.forEach(function(row){
                row.time = parseTime(row.time);
                data.push(row);
                x.domain(d3.extent(data.map(function(d){ return d.time; })));
            });

            data.forEach(function(row){
                var arrow = row.type == "charge" ? 'left' : 'right';
                var markup = '<tr><td scope="row">' + formatTime(row.time) + '</td>'
                    + '<td>' + row.actor + '</td>'
                    + '<td><span class="glyphicon glyphicon-arrow-' + arrow + '"></span></td>'
                    + '<td>' + row.target  + '</td>'
                    + '<td class="message-row">' + row.message + '</td>'
                    + '</tr>';
                $("#table-feed").append(markup);
            });

            var totals0 = 0;
            var totals1 = 0;
            var totals2 = 0;
            var totals3 = 0;

            // console.log(data.length);
            data.forEach(function(d){
                if (filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                    totals0 += 1;
                }
                else if (weak_filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                    totals1 += 1;
                }
                else if (food_filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                    totals2 += 1;
                }
                else { totals3 += 1; }
            });
            // console.log(totals0,totals1, totals2, totals3);

            svg.append("g").selectAll("circle-public")
                .data(data)
                .enter()
                .append("circle")
                .attr("r",10)
                .attr("opacity",0.3)
                .attr("cy",function(d){
                    var dist = 90;
                    var offset = 10;
                    if (filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                        return offset + dist*1;
                    }
                    else if (weak_filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                        return offset + dist*2;
                    }
                    else if (food_filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                        return offset + dist*3;
                    }
                    else { return offset + dist*4; }
                })
                .attr("cx", function(d){ return x(d.time);})
                .attr("fill",function(d){
                    if (filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                        return "#CF123F";
                    }
                    else if (weak_filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                        return "#FF528F";
                    }
                    else if (food_filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                        return "#FFC85B";
                    }
                    else { return "rgba(16,166,130,0.2)"; }
                })
                .attr("class","circle-public")
                .on("mouseover", function(d) {
                    var arrow = d.type == "charge" ? 'left' : 'right';

                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html('<span class="tooltip-message">' + d.message + "</span><br/>" + d.actor + '<span class="glyphicon glyphicon-arrow-' + arrow + '"></span>' + d.target )
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });

            svg.append('g').selectAll("text")
                .data([[10,"Likely Housemates"],[70,"Potential Housemates"],[130,"Food Payments"],[190,"Other"]])
                .enter()
                .append("text")
                .attr("font-family", "Roboto Mono")
                .attr("x",-10)
                .attr("y",function(d,i){ return i*90 + 10 + 60;})
                .text(function(d){ return d[1];});

            totals3 = totals3*0.5;
            var allTotals = totals0 + totals1 + totals2 + totals3;
            var bubbleData = [[totals0,"Likely Housemates"],[totals1,"Potential Housemates"],[totals2,"Food Payments"],[totals3,"Other"]];
            var svg2 = d3.select("#bubble-data").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height - 200 + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg2.append('g').selectAll(".bubble")
                .data(bubbleData)
                .enter()
                .append("circle")
                .attr("r",function(d){ return height/5 * d[0]/allTotals; })
                .attr("cx",function(d,i){ return i * 300;})
                .attr("cy", 90)
                .attr("opacity",0.8)
                .attr("fill",function(d,i){ return ["#CF123F","#FF528F","#FFC85B","rgba(16,166,130,0.8)"][i]; })
                .attr("class","bubble")

            svg2.append('g').selectAll("text")
                .data(bubbleData)
                .enter()
                .append("text")
                .attr("font-family", "Roboto Mono")
                .attr("font-weight","800")
                .attr("y",0)
                .attr("x",function(d,i){ return i*290;})
                .text(function(d){ return d[1] });

            svg2.append('g').selectAll("text")
                .data(bubbleData)
                .enter()
                .append("text")
                .attr("font-family", "Roboto Mono")
                .attr("y",30)
                .attr("x",function(d,i){ return i*290;})
                .text(function(d){ return d[0] + " transactions" });
        });

    }

    loadData();
}


google.charts.load('current', {'packages':['sankey']});
google.charts.setOnLoadCallback(drawChart);
var transactions = {};

function drawChart() {
    var files = ["vishva-mehta","christina-sun","niki-tubacki","valerie-peng","sarah-wright","lynn-takeshita"];
    files.forEach(function(d){ transactions[d] = []; });
    files.forEach(function(name){
        d3.csv("data/" + name + ".csv", function(dataAll){
            var totals = {};
            var rows = [];
            dataAll.forEach(function(d){
                var suffix = d.payer.toLowerCase()!= name.replace("-"," ") ? " " : "";
                var hash = d.payer + suffix + d.charger;
                if (hash in totals){
                    totals[hash] += 1;
                }
                else {
                    totals[hash] = 1;
                    if (d.payer.toLowerCase()!= name.replace("-"," ")){
                        rows.push([d.payer + suffix, d.charger, 0])
                    }
                    else {
                        rows.push([d.payer, d.charger, 0])
                    }
                }
            });
            rows.forEach(function(d){
                d[2] = totals[d[0]+d[1]];
                d.push(null);
            });

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'From');
            data.addColumn('string', 'To');
            data.addColumn('number', 'Weight');
            data.addColumn({type: 'string', role: 'style'});
            data.addRows(rows);

            var customwidth = $(name).width();
            // var colors = ['#a6cee3',
            //     '#b2df8a',
            //     '#fb9a99',
            //     '#fdbf6f',
            //     '#cab2d6',
            //     '#ffff99'];

            // Sets chart options.
            var options = {
                width: customwidth,

                sankey: {
                    node: {
                        label: { fontName: 'Roboto Mono'},
                        width: 30
                    }
                //         colors: colors
                //     },
                //     link: {
                //         colorMode: 'gradient',
                //         colors: colors
                //     }
                }
            };

            // Instantiates and draws our chart, passing in some options.
            var chart = new google.visualization.Sankey(document.getElementById(name));
            chart.draw(data, options);

            google.visualization.events.addListener(chart, 'onmouseover', function(e) {
                if ("name" in e){
                    showTransactions(name, e.name);
                }
            });
            google.visualization.events.addListener(chart, 'onmouseout', function(e) {
                if ("name" in e){
                    showTransactionsOut(name, e.name);
                }
            });

        })
    })

}

function mapColors(file,nodePerson){
    if (file == "vishva-mehta" && nodePerson == "Roba Adnew"){
        return "green";
    }
    return "blue";
}


function showTransactions(mainPerson, otherPerson){
    if (mainPerson !== "undefined" && otherPerson !== "undefined"){
        mainPerson = mainPerson.replace("-"," ").trim();
        otherPerson = otherPerson.replace("-"," ").trim();
        // console.log(mainPerson, otherPerson);
    }
    // d3.selectAll(".individual-circle").transition()
    //     .duration(200)
    //     .attr("opacity",0);
    d3.selectAll(".individual-circle-text").transition()
        .duration(200)
        .attr("opacity",0)
    d3.selectAll("." + getKey(mainPerson,otherPerson))
        .transition()
        .duration(200)
        .attr("opacity",1);
}

function showTransactionsOut(mainPerson, otherPerson){
    if (mainPerson !== "undefined" && otherPerson !== "undefined"){
        mainPerson = mainPerson.replace("-"," ").trim();
        otherPerson = otherPerson.replace("-"," ").trim();
        // console.log(mainPerson, otherPerson);
    }
    d3.selectAll("." + getKey(mainPerson,otherPerson))
        .transition()
        .duration(200)
        .attr("opacity",0.1);
    // d3.selectAll(".individual-circle").transition()
    //     .duration(200)
    //     .attr("opacity",0.1);
    d3.selectAll(".individual-circle-text").transition()
        .duration(200)
        .attr("opacity",0.1);
}


function getKey(name1, name2){
    name1 = name1.replace(" ","").replace("-","").toLowerCase();
    name2 = name2.replace(" ","").replace("-","").toLowerCase();
    names = (name1 + name2).split('').sort().join('');
    return names.trim();
}

var files = ["vishva-mehta","christina-sun","niki-tubacki","valerie-peng","sarah-wright","lynn-takeshita"];
var roommates = {
    "vishva-mehta": ["Roba Adnew", "Neil Shah","Ellina Cho"],
    "christina-sun": ["Kiran Wattamwar", "Niki Tubacki", "Sarah Wright"],
    "niki-tubacki": ["Sarah Wright", "Christina Sun"],
    "valerie-peng": ["Kiran Wattamwar", "Niki Tubacki"],
    "sarah-wright": ["Amanda Figueroa", "Kiran Wattamwar", "Christina Sun", "Niki Tubacki"],
    "lynn-takeshita": ["E Young", "Tara Lee"]
}
files.forEach(function(name){
    var filters = [
        "Rent",
        "deposit",
        "Utilities",
        "Comcast",
        "Xfinity",
        "PSEG",
        "Internet",
        "RCN",
        "Wifi",
        "Water",
        "Gas",
        "Airbnb",
        "Hotel",
        "splitwise.com",
        "Electric",
        "Heat",
        "Air conditioning",
        "Electricity",
        "💻💸",
        "Renters",
        "Broker",
        "Apt",
        "Apartment",
        "Utility",
        "1F50C",
        "1F4B8",
        "Insurance",
        "🔌",
        "🏠",
        "🏡",
        "⚡🔌💡💸",
        "Con ed"];


    d3.csv("data/" + name + ".csv", function(data) {
        var div = d3.select("body").append("div")
            .attr("class", "tooltip2")
            .style("opacity", 0);

        var appearances = [];

        // parse the date / time, ie. 2017-12-07T18:14:23Z
        var parseTime = d3.timeParse("%B %-e %Y");
        var formatTime = d3.timeFormat("%B %e");

        // set the ranges
        var margin = {top: 20, right: 10, bottom: 20, left: 0};
        var customWidth = $("#individual-transactions-"+name).width();
        // var customHeight = $("#individual-transactions-"+name).width();
        var customHeight = 600;
        var width =  customWidth- margin.left - margin.right,
            height = customHeight - margin.top - margin.bottom;
        var svg2 = d3.select("#individual-transactions-"+name).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var y = d3.scaleTime().range([customHeight - margin.top  - margin.bottom, 0]);

        data.forEach(function(row){
            row.time = parseTime(row.time.trim() + " 2017");
        });
        y.domain(d3.extent(data.map(function(d){ return d.time; })));

        svg2.append("g")
            .selectAll(".individual-circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r",5)
            .attr("cx",30)
            .attr("cy",function(d){ return y(d.time);})
            .attr("opacity",0.1)
            .attr("class",function(d){ return "individual-circle "+ getKey(d.payer, d.charger); })
            .attr("fill", function(d){
                if (filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                    if (d.payer.toLowerCase().trim() !== name.replace("-"," ")) {appearances.push(d.payer.trim()); }
                    if (d.charger.toLowerCase().trim() !== name.replace("-"," ")) {appearances.push(d.charger.trim()); }
                    return "red";
                }
                if ((roommates[name].indexOf(d.payer.trim()) >= 0) || (roommates[name].indexOf(d.charger.trim()) >= 0 )){
                    return "rgba(16,166,130,1)";
                }
                return "gray";
            })
            .on("mouseover", function(d) {
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("r",10);
                // var arrow = d.charger.trim().toLowerCase() == name.replace("-"," ").trim().toLowerCase() == "charge" ? 'left' : 'right';
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html('<span class="tooltip-message">' + formatTime(d.time)+', <br>' + d.message + "</span><br/>" + d.charger + '<span class="glyphicon glyphicon-arrow-' + "left" + '"></span>' + d.payer )
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("r",5);
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg2.append("g")
            .selectAll(".individual-circle-text")
            .data(data)
            .enter()
            .append("text")
            // .text(function(d){ return d.payer + " paid " + d.charger + " for " + d.message; })
            .text(function(d){ return d.message; })
            .attr("font-family","Roboto Mono, monospace")
            .attr("x",50)
            .attr("y",function(d){ return y(d.time);})
            .attr("opacity",0.1)
            .attr("class",function(d){ return "individual-circle-text "+ getKey(d.payer, d.charger); })
            .attr("fill", function(d){
                if (filters.some(function(e){ return d.message.toLowerCase().includes(e.toLowerCase()); })){
                    return "red";
                }
                if ((roommates[name].indexOf(d.payer.trim()) >= 0) || (roommates[name].indexOf(d.charger.trim()) >= 0 )){
                    return "rgba(16,166,130,1)";
                }
                return "gray";
            })
            .on("mouseover", function(d) {
                // var arrow = d.charger.trim().toLowerCase() == name.replace("-"," ").trim().toLowerCase() == "charge" ? 'left' : 'right';
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html('<span class="tooltip-message">' + formatTime(d.time)+', <br>' + d.message + "</span><br/>" + d.charger + '<span class="glyphicon glyphicon-arrow-' + "left" + '"></span>' + d.payer )
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });
});

function networkGraph(){
    //create somewhere to put the force directed graph
    // set the ranges
    var margin = {top: 20, right: 10, bottom: 20, left: 0};
    var customWidth = $("#network-graph").width();
    // var customHeight = $("#individual-transactions-"+name).width();
    var customHeight = 600;
    var width =  customWidth- margin.left - margin.right,
        height = customHeight - margin.top - margin.bottom;
    var svg = d3.select("#network-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var div = d3.select("body").append("div")
        .attr("class", "tooltip3")
        .style("opacity", 0);

    //find the node index
    function find(f){
        var i = -1
        nodes_data.forEach(function(node, index){
            if(node.name == f)
                i = index;
        });
        // console.log(i);
        return i;
    }

    var radius = 15;
    // var nodes_data = [];
    // d3.csv("data/nodes.csv", function(d){
    //     d.forEach(function(row){
    //         row.name = row.name.trim();
    //         row.apt = +row.apt;
    //         nodes_data.push(row);
    //     })
    // });
    //
    // var links_data = [];
    // d3.csv("data/links.csv", function(d){
    //     d.forEach(function(row){
    //        row.source = row.source.trim();
    //        row.target = row.target.trim();
    //        links_data.push(row);
    //     });
    // });

    // //set the source and target index
    // links_data.forEach(function(d){
    //     d.source = find(d.source);
    //     d.target = find(d.target);
    // });


    var links_data = [
            {"source":'Vishva Mehta',"target":'Roba Adnew',"house":'y'},
            {"source":'Vishva Mehta',"target":'Neil Shah',"house":'y'},
            {"source":'Vishva Mehta',"target":'Jerry Chan',"house":'n'},
            {"source":'Vishva Mehta',"target":'Maria Gonalez',"house":'n'},
            {"source":'Vishva Mehta',"target":'Alice Lu',"house":'n'},
            {"source":'Vishva Mehta',"target":'Paul Ampofo',"house":'n'},
            {"source":'Vishva Mehta',"target":'Vicky Shi',"house":'n'},
            {"source":'Vishva Mehta',"target":'Aparmna Ramarathnam',"house":'n'},
            {"source":'Vishva Mehta',"target":'Manoj Kumar',"house":'n'},
            {"source":'Vishva Mehta',"target":'Ellina Cho',"house":'n'},
            {"source":'Vishva Mehta',"target":'Dennis Tran',"house":'n'},
            {"source":'Vishva Mehta',"target":'James Shen',"house":'n'},
            {"source":'Vishva Mehta',"target":'Nisha Chikhale',"house":'n'},
            {"source":'Vishva Mehta',"target":'Sarah Ng',"house":'n'},
            {"source":'Vishva Mehta',"target":'Waqas Salam',"house":'n'},
            {"source":'Vishva Mehta',"target":'Sarona Isaac',"house":'n'},
            {"source":'Vishva Mehta',"target":'Chirag Munim',"house":'n'},
            {"source":'Chirag Munim',"target":'Vishva Mehta',"house":'n'},
            {"source":'Vishva Mehta',"target":'Unnati Mehta',"house":'n'},
            {"source":'Vishva Mehta',"target":'Kai-Li Liang',"house":'n'},
            {"source":'Vishva Mehta',"target":'Michelle Philip',"house":'n'},
            {"source":'Vishva Mehta',"target":'Raveena Dhruve',"house":'n'},
            {"source":'Vishva Mehta',"target":'Diana Destin',"house":'n'},
            {"source":'Vishva Mehta',"target":'Jessica Ma',"house":'n'},
            {"source":'Vishva Mehta',"target":'John Gillick',"house":'n'},
            {"source":'Vishva Mehta',"target":'Sapna Virdy',"house":'n'},
            {"source":'Vishva Mehta',"target":'Robert Weir',"house":'n'},
            {"source":'Vishva Mehta',"target":'Robert Schill',"house":'n'},
            {"source":'Vishva Mehta',"target":'Robert Vechiola',"house":'n'},
            {"source":'Vishva Mehta',"target":'Michael Rodas',"house":'n'},
            {"source":'Valerie Peng',"target":'Isabel Chien',"house":'n'},
            {"source":'Valerie Peng',"target":'Gina Li',"house":'n'},
            {"source":'Valerie Peng',"target":'Nadia Lucas',"house":'n'},
            {"source":'Valerie Peng',"target":'Kiran Wattamwar',"house":'y'},
            {"source":'Valerie Peng',"target":'Niki Tubacki',"house":'y'},
            {"source":'Valerie Peng',"target":'Teresa DeFigueiredo',"house":'n'},
            {"source":'Valerie Peng',"target":'Ying Cai',"house":'n'},
            {"source":'Valerie Peng',"target":'Omo Salewa',"house":'n'},
            {"source":'Valerie Peng',"target":'Daniel Zuo',"house":'n'},
            {"source":'Valerie Peng',"target":'Katherine Mizrahi',"house":'n'},
            {"source":'Valerie Peng',"target":'Rebecca Kurfess',"house":'n'},
            {"source":'Valerie Peng',"target":'Tate DeWeese',"house":'n'},
            {"source":'Valerie Peng',"target":'Adrian Mora',"house":'n'},
            {"source":'Valerie Peng',"target":'Arlette Reyes',"house":'n'},
            {"source":'Valerie Peng',"target":'Danielle Barillas',"house":'n'},
            {"source":'Valerie Peng',"target":'Thalia Estrella',"house":'n'},
            {"source":'Valerie Peng',"target":'Patricia Das',"house":'n'},
            {"source":'Valerie Peng',"target":'Rachel Adenekan',"house":'n'},
            {"source":'Valerie Peng',"target":'Przemyslaw Pasich',"house":'n'},
            {"source":'Valerie Peng',"target":'Eric Wong',"house":'n'},
            {"source":'Valerie Peng',"target":'Madeline Moore',"house":'n'},
            {"source":'Valerie Peng',"target":'Renee Zhao',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Upasana Unni',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Tara Lee',"house":'y'},
            {"source":'Lynn Takeshita',"target":'Jessica Li',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Niki Tubacki',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Malhar Patel',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Sam Morton',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Aaron Molloy',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Liza O Connor',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Michelle Tai',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Daryl Neubieser',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Hannah Levy',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Yasuko Mano',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Alexandra Ivanov',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Jessica Chen',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Jordan Hurwitz',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Emily Keeley',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Leona Motomochi',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Christina Sun',"house":'n'},
            {"source":'Lynn Takeshita',"target":'E Young',"house":'y'},
            {"source":'Lynn Takeshita',"target":'Rachel Wang',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Shirley Chen',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Cristie Contreras',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Daphne Superville',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Claire Lazar',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Chloe Nobuhara',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Kevin Yang',"house":'n'},
            {"source":'Lynn Takeshita',"target":'David Zhang',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Cathy Choi',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Kiera Gavin',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Abby Bertics',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Jack Serrino',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Kyle Bridburg',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Siva Nagarajan',"house":'n'},
            {"source":'Lynn Takeshita',"target":'Stephanie Li',"house":'n'},
            {"source":'Christina Sun',"target":'Angela Ma',"house":'n'},
            {"source":'Christina Sun',"target":'Sarah Wright',"house":'y'},
            {"source":'Christina Sun',"target":'Niki Tubacki',"house":'y'},
            {"source":'Christina Sun',"target":'Kiran Wattamwar',"house":'y'},
            {"source":'Christina Sun',"target":'Jessica Li',"house":'n'},
            {"source":'Christina Sun',"target":'Jin Kang',"house":'n'},
            {"source":'Christina Sun',"target":'Eric Chiu',"house":'n'},
            {"source":'Christina Sun',"target":'Sabrina Weng',"house":'n'},
            {"source":'Christina Sun',"target":'Jennifer Lai',"house":'n'},
            {"source":'Christina Sun',"target":'Nora Tan',"house":'n'},
            {"source":'Christina Sun',"target":'Billy Moses',"house":'n'},
            {"source":'Christina Sun',"target":'Kim Veldee',"house":'n'},
            {"source":'Christina Sun',"target":'Yasyf Mohamedali',"house":'n'},
            {"source":'Christina Sun',"target":'Sarah Caso',"house":'n'},
            {"source":'Christina Sun',"target":'Bryan Cai',"house":'n'},
            {"source":'Christina Sun',"target":'Jessie Lu',"house":'n'},
            {"source":'Christina Sun',"target":'Larry Zhang',"house":'n'},
            {"source":'Christina Sun',"target":'David Zhang',"house":'n'},
            {"source":'Christina Sun',"target":'Rose Wang',"house":'n'},
            {"source":'Christina Sun',"target":'Deepti Raghavan',"house":'n'},
            {"source":'Christina Sun',"target":'Kim Feng',"house":'n'},
            {"source":'Christina Sun',"target":'Kyle Bridburg',"house":'n'},
            {"source":'Christina Sun',"target":'Jason Priest',"house":'n'},
            {"source":'Christina Sun',"target":'Kira Palmer',"house":'n'},
            {"source":'Christina Sun',"target":'Alberto Vladimir Castillo Ventura',"house":'n'},
            {"source":'Christina Sun',"target":'Jack Serrino',"house":'n'},
            {"source":'Christina Sun',"target":'Rumya Raghavan',"house":'n'},
            {"source":'Christina Sun',"target":'Krista Opsahl-Ong',"house":'n'},
            {"source":'Christina Sun',"target":'Katherine Ho',"house":'n'},
            {"source":'Christina Sun',"target":'Parshwa Khambhati',"house":'n'},
            {"source":'Christina Sun',"target":'Michelle Tai',"house":'n'},
            {"source":'Christina Sun',"target":'Krystal Lai',"house":'n'},
            {"source":'Christina Sun',"target":'Alexandra Ivanov',"house":'n'},
            {"source":'Christina Sun',"target":'Katie Gohres',"house":'n'},
            {"source":'Christina Sun',"target":'Yasuko Mano',"house":'n'},
            {"source":'Sarah Wright',"target":'Kiran Wattamwar',"house":'y'},
            {"source":'Sarah Wright',"target":'Amanda Figueroa',"house":'n'},
            {"source":'Sarah Wright',"target":'Niki Tubacki',"house":'y'},
            {"source":'Sarah Wright',"target":'Christopher Neil',"house":'n'},
            {"source":'Niki Tubacki',"target":'David Zhang', "house":'n'},
            {"source":'Niki Tubacki',"target":'Christian Richardson', "house":'n'},
            {"source":'Niki Tubacki',"target":'Jack Serrino', "house":'n'},
            {"source":'Niki Tubacki',"target":'Nalini Singh', "house":'n'},
            {"source":'Niki Tubacki',"target":'Erica Green', "house":'n'},
            {"source":'Niki Tubacki',"target":'Kiran Wattamwar',"house":'y'},
            {"source":'Niki Tubacki',"target":'Kyle Bridburg', "house":'n'},
            {"source":'Niki Tubacki',"target":'Sarah Pihl', "house":'n'},
            {"source":'Niki Tubacki',"target":'Yasyf Mohamedali', "house":'n'},
            {"source":'Niki Tubacki',"target":'Sravya Vishnubhatla', "house":'n'},
            {"source":'Niki Tubacki',"target":'Cyndia Cao', "house":'n'},
            {"source":'Niki Tubacki',"target":'Deepti Raghavan', "house":'n'},
            {"source":'Niki Tubacki',"target":'Amy Huang', "house":'n'},
            {"source":'Niki Tubacki',"target":'Bryan Cai', "house":'n'},
            {"source":'Niki Tubacki',"target":'Jessica Li', "house":'n'},
            {"source":'Niki Tubacki',"target":'Larry Zhang', "house":'n'},
            {"source":'Niki Tubacki',"target":'Margaret Tian', "house":'n'},
            {"source":'Niki Tubacki',"target":'Cody Ma', "house":'n'},
            {"source":'Niki Tubacki',"target":'Fernando Sanchez', "house":'n'},
            {"source":'Niki Tubacki',"target":'Kim Feng', "house":'n'},
            {"source":'Niki Tubacki',"target":'Valerie Peng', "house":'n'},
            {"source":'Niki Tubacki',"target":'Billy Moses', "house":'n'},
            {"source":'Niki Tubacki',"target":'Dheevesh Arulmani', "house":'n'},
            {"source":'Niki Tubacki',"target":'Katherine Ho', "house":'n'},
            {"source":'Niki Tubacki',"target":'David Doan', "house":'n'}
    ]
    var nodes_data =  [{"name":'Vishva Mehta',"apt":'1'},
        {"name":'Chirag Munim',"apt":'0'},
        {"name":'Valerie Peng',"apt":'2'},
        {"name":'Lynn Takeshita',"apt":'3'},
        {"name":'Christina Sun',"apt":'2'},
        {"name":'Sarah Wright',"apt":'2'},
        {"name":'Niki Tubacki',"apt":'2'},
        {"name":'Roba Adnew',"apt":'1'},
        {"name":'Neil Shah',"apt":'1'},
        {"name":'Jerry Chan',"apt":'0'},
        {"name":'Maria Gonalez',"apt":'0'},
        {"name":'Alice Lu',"apt":'0'},
        {"name":'Paul Ampofo',"apt":'0'},
        {"name":'Vicky Shi',"apt":'0'},
        {"name":'Aparmna Ramarathnam',"apt":'0'},
        {"name":'Manoj Kumar',"apt":'0'},
        {"name":'Ellina Cho',"apt":'0'},
        {"name":'Dennis Tran',"apt":'0'},
        {"name":'James Shen',"apt":'0'},
        {"name":'Nisha Chikhale',"apt":'0'},
        {"name":'Sarah Ng',"apt":'0'},
        {"name":'Waqas Salam',"apt":'0'},
        {"name":'Sarona Isaac',"apt":'0'},
        {"name":'Unnati Mehta',"apt":'0'},
        {"name":'Kai-Li Liang',"apt":'0'},
        {"name":'Michelle Philip',"apt":'0'},
        {"name":'Raveena Dhruve',"apt":'0'},
        {"name":'Diana Destin',"apt":'0'},
        {"name":'Jessica Ma',"apt":'0'},
        {"name":'John Gillick',"apt":'0'},
        {"name":'Sapna Virdy',"apt":'0'},
        {"name":'Robert Weir',"apt":'0'},
        {"name":'Robert Schill',"apt":'0'},
        {"name":'Robert Vechiola',"apt":'0'},
        {"name":'Michael Rodas',"apt":'0'},
        {"name":'Isabel Chien',"apt":'0'},
        {"name":'Gina Li',"apt":'0'},
        {"name":'Nadia Lucas',"apt":'0'},
        {"name":'Kiran Wattamwar',"apt":'2'},
        {"name":'Teresa DeFigueiredo',"apt":'0'},
        {"name":'Ying Cai',"apt":'0'},
        {"name":'Omo Salewa',"apt":'0'},
        {"name":'Daniel Zuo',"apt":'0'},
        {"name":'Katherine Mizrahi',"apt":'0'},
        {"name":'Rebecca Kurfess',"apt":'0'},
        {"name":'Tate DeWeese',"apt":'0'},
        {"name":'Adrian Mora',"apt":'0'},
        {"name":'Arlette Reyes',"apt":'0'},
        {"name":'Danielle Barillas',"apt":'0'},
        {"name":'Thalia Estrella',"apt":'0'},
        {"name":'Patricia Das',"apt":'0'},
        {"name":'Rachel Adenekan',"apt":'0'},
        {"name":'Przemyslaw Pasich',"apt":'0'},
        {"name":'Eric Wong',"apt":'0'},
        {"name":'Madeline Moore',"apt":'0'},
        {"name":'Renee Zhao',"apt":'0'},
        {"name":'Upasana Unni',"apt":'0'},
        {"name":'Tara Lee',"apt":'3'},
        {"name":'Jessica Li',"apt":'0'},
        {"name":'Malhar Patel',"apt":'0'},
        {"name":'Sam Morton',"apt":'0'},
        {"name":'Aaron Molloy',"apt":'0'},
        {"name":'Liza O Connor',"apt":'0'},
        {"name":'Michelle Tai',"apt":'0'},
        {"name":'Daryl Neubieser',"apt":'0'},
        {"name":'Hannah Levy',"apt":'0'},
        {"name":'Yasuko Mano',"apt":'0'},
        {"name":'Alexandra Ivanov',"apt":'0'},
        {"name":'Jessica Chen',"apt":'0'},
        {"name":'Jordan Hurwitz',"apt":'0'},
        {"name":'Emily Keeley',"apt":'0'},
        {"name":'Leona Motomochi',"apt":'0'},
        {"name":'E Young',"apt":'3'},
        {"name":'Rachel Wang',"apt":'0'},
        {"name":'Shirley Chen',"apt":'0'},
        {"name":'Cristie Contreras',"apt":'0'},
        {"name":'Daphne Superville',"apt":'0'},
        {"name":'Claire Lazar',"apt":'0'},
        {"name":'Chloe Nobuhara',"apt":'0'},
        {"name":'Kevin Yang',"apt":'0'},
        {"name":'David Zhang',"apt":'0'},
        {"name":'Cathy Choi',"apt":'0'},
        {"name":'Kiera Gavin',"apt":'0'},
        {"name":'Abby Bertics',"apt":'0'},
        {"name":'Jack Serrino',"apt":'0'},
        {"name":'Kyle Bridburg',"apt":'0'},
        {"name":'Siva Nagarajan',"apt":'0'},
        {"name":'Stephanie Li',"apt":'0'},
        {"name":'Angela Ma',"apt":'0'},
        {"name":'Jin Kang',"apt":'0'},
        {"name":'Eric Chiu',"apt":'0'},
        {"name":'Sabrina Weng',"apt":'0'},
        {"name":'Jennifer Lai',"apt":'0'},
        {"name":'Nora Tan',"apt":'0'},
        {"name":'Billy Moses',"apt":'0'},
        {"name":'Kim Veldee',"apt":'0'},
        {"name":'Yasyf Mohamedali',"apt":'0'},
        {"name":'Sarah Caso',"apt":'0'},
        {"name":'Bryan Cai',"apt":'0'},
        {"name":'Jessie Lu',"apt":'0'},
        {"name":'Larry Zhang',"apt":'0'},
        {"name":'Rose Wang',"apt":'0'},
        {"name":'Deepti Raghavan',"apt":'0'},
        {"name":'Kim Feng',"apt":'0'},
        {"name":'Jason Priest',"apt":'0'},
        {"name":'Kira Palmer',"apt":'0'},
        {"name":'Alberto Vladimir Castillo Ventura',"apt":'0'},
        {"name":'Rumya Raghavan',"apt":'0'},
        {"name":'Krista Opsahl-Ong',"apt":'0'},
        {"name":'Katherine Ho',"apt":'0'},
        {"name":'Parshwa Khambhati',"apt":'0'},
        {"name":'Krystal Lai',"apt":'0'},
        {"name":'Katie Gohres',"apt":'0'},
        {"name":'Amanda Figueroa',"apt":'0'},
        {"name":'Christopher Neil',"apt":'0'},
        {"name":'Christian Richardson',"apt":'0'},
        {"name":'Nalini Singh',"apt":'0'},
        {"name":'Erica Green',"apt":'0'},
        {"name":'Sarah Pihl',"apt":'0'},
        {"name":'Sravya Vishnubhatla',"apt":'0'},
        {"name":'Cyndia Cao',"apt":'0'},
        {"name":'Amy Huang',"apt":'0'},
        {"name":'Margaret Tian',"apt":'0'},
        {"name":'Cody Ma',"apt":'0'},
        {"name":'Fernando Sanchez',"apt":'0'},
        {"name":'Dheevesh Arulmani',"apt":'0'},
        {"name":'David Doan',"apt":'0'}]

    console.log(nodes_data);
    console.log(links_data);
//set up the simulation and add forces
    var simulation = d3.forceSimulation()
        .force("charge", d3.forceManyBody().strength(-120))
        .force("link", d3.forceLink().id(function(d) { return d.name; }))
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2));

    simulation.nodes(nodes_data);
    simulation.force("link").links(links_data);

    var center_force = d3.forceCenter(width / 2, height / 2);

    simulation
    //     .force("charge_force", charge_force)
        .force("center_force", center_force)
    //     .force("links",link_force)
    // ;


//add tick instructions:
    simulation.on("tick", tickActions );

//add encompassing group for the zoom
    var g = svg.append("g")
        .attr("class", "everything");

//draw lines for the links
    var link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links_data)
        .enter().append("line")
        .attr("stroke-width", function(d){
            if(d.house == "y"){
                return 10;
            } else {
                return 1;
            }
        })
        .style("stroke", linkColour);

//draw circles for the nodes
    var node = g.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("fill", circleColour)
        .on("mouseover", function(d) {
            d3.select(this).transition()
                .duration(100)
                .attr("r",25)
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html('<span class="tooltip-message2">' + d.name + "</span>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).transition()
                .duration(100)
                .attr("r",15)
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });;


//add drag capabilities
    var drag_handler = d3.drag()
        .on("start", drag_start)
        .on("drag", drag_drag)
        .on("end", drag_end);

    drag_handler(node);


//add zoom capabilities
    var zoom_handler = d3.zoom()
        .on("zoom", zoom_actions);

    zoom_handler(svg);

    /** Functions **/

//Function to choose what color circle we have
//Let's return blue for males and red for females
    function circleColour(d){
        if(d.apt ==0){
            return "rgba(255, 200, 91,0.2)";
        } else if (d.apt == 1){
            return "rgba(16,166,130,1)";
        } else if (d.apt == 2){
            return "#CF123F";
        }
        else return "#FF528F";
    }

//Function to choose the line colour and thickness
//If the link type is "A" return green
//If the link type is "E" return red
    function linkColour(d){
        if(d.house == "y"){
            return "rgb(255, 224, 89)";
        } else {
            return "#f7e1b7";
        }
    }

//Drag functions
//d is the node
    function drag_start(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

//make sure you can't drag the circle outside the box
    function drag_drag(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function drag_end(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

//Zoom functions
    function zoom_actions(){
        g.attr("transform", d3.event.transform)
    }

    function tickActions() {
        //update circle positions each tick of the simulation
        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        //update link positions
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    }
}

networkGraph();
