/*const pixelsTag = document.querySelector("div.pixels")
const bodyTag = document.querySelector("body")
const progressTag = document.querySelector("div.progress")
const sections = document.querySelectorAll("section")
const pageTag = document.querySelector("div.page")
const headerTag = document.querySelector("header")


// when we scroll the page, make a progress bar that track of the distance
document.addEventListener("scroll", function () {
  const pixels = window.pageYOffset
  const pageHeight = bodyTag.getBoundingClientRect().height
  const totalScrollableDistance = pageHeight - window.innerHeight
  const percentage = pixels / totalScrollableDistance
  
  progressTag.style.width = '5px'
  progressTag.style.height = `${100 * percentage}%`
  
})
*/

/*//code for first graph

d3.csv('states_nigeriab.csv').then((data) => {
    
  data.forEach(function(d) {
        d.home_d = +d.home_d;
        d.health_d = +d.health_d
  });
  
  //console.log(data)
  
    
  svg(data)
  
})

const margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let svg = (data) => {
  
  //start graph
  let graph1 = d3.select('#graph1')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "graph");
  
  //set scales  
  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map((d) => d.place))
    .padding(0.3)
    
  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);
    
  const makeYLines = () => d3.axisLeft()
    .scale(yScale)

  graph1.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  graph1.append('g')
    .call(d3.axisLeft(yScale));
    
  //make grid
  graph1.append('g')
    .attr('class', 'grid')
      .call(makeYLines()
    .tickSize(-width, 0, 0)
    .tickFormat('')
      )
      
      //start making bars
      
  let barGroups = graph1.selectAll()
    .data(data)
    .enter()
    .append('g')
      
  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => xScale(d.place))
    .attr('y', (d) => yScale(d.home_d))
    .attr('height', (d) => height - yScale(d.home_d))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (actual, i) {
        d3.selectAll('.value')
        .attr('opacity', 0)
          
        d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 0.6)
        .attr('x', (d) => xScale(d.place) - 5)
        .attr('width', xScale.bandwidth() + 10)
          
          
        const y = yScale(actual.home_d)
      
        line = graph1.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (d) => xScale(d.place) + xScale.bandwidth() / 2)
          .attr('y', (d) => yScale(d.home_d) + 30)
          .attr('fill', '#f0f8ff')
          .attr('text-anchor', 'middle')
          .text((d, idx) => {
            const divergence = (d.home_d - actual.home_d).toFixed(1)
        //console.log(divergence)
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}%`
              return idx !== i ? text : '';
          })
      })

    .on('mouseleave', function () {
      d3.selectAll('.value')
      .attr('opacity', 1)

      d3.select(this)
      .transition()
      .duration(300)
      .attr('opacity', 1)
      .attr('x', (d) => xScale(d.place))
      .attr('width', xScale.bandwidth())
      
      graph1.selectAll('#limit').remove()
      graph1.selectAll('.divergence').remove()
      
      })
      
  barGroups 
    .append('text')
    .attr('class', 'value')
    .attr('x', (d) => xScale(d.place) + xScale.bandwidth() / 2)
    .attr('y', (d) => yScale(d.home_d) + 30)
    .attr('text-anchor', 'middle')
    .text((d) => `${d.home_d}%`)
    
    
   graph1.append('text')
      .attr('id', 'g-one')
      .attr('x', width / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .text('Home Deliveries by Region')
      
      
}
*/

var margin = { left:80, right:20, top:50, bottom:100 };
var height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var g = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var time = 0;
var formattedData;

// Tooltip
var tip = d3.tip().attr('class', 'd3-tip')
    .html(function(d) {
        var text = "Country: <span style='color:#BB9F06'>" + d.country + "</span><br>";
        text += "Region: <span style='color:#BB9F06;text-transform:capitalize'>" + d.region + "</span><br>";
        text += "Under Five Mortality Rate: <span style='color:#BB9F06'>" + (d.underfive) + "%" + "</span><br>";
        text += "Access to Electricity: <span style='color:#BB9F06'>" + (d.electricity.toFixed()) + "%" + "</span><br>";
        text += "Population: <span style='color:#BB9F06'>" + d3.format(",.0f")(d.population) + "</span><br>";
        return text;
    });
    
g.call(tip);



// Scales
var x = d3.scaleLinear()
    .range([0, width])
    .domain([-5, 100]);
var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 35]);
var area = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([2000, 1400000000]);
var regionColor = d3.scaleOrdinal(d3.schemePastel1);

// Labels
var xLabel = g.append("text")
    .attr("y", height + 60)
    .attr("x", width / 2)
    .attr("font-size", "13px")
    .attr("text-anchor", "middle")
    .text("Access to Electricity");
var yLabel = g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr("x", -170)
    .attr("font-size", "13px")
    .attr("text-anchor", "middle")
    .text("Under Five Mortality Rate");
var timeLabel = g.append("text")
    .attr("y", height/2)
    .attr("x", width/2)
    .attr("font-size", "90px")
    .attr("opacity", "0.1")
    .attr("text-anchor", "middle")
    .text("1990");

// X Axis
var xAxisCall = d3.axisBottom(x)
    .tickFormat(function(d){ return +d + "%"; });
g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height +")")
    .call(xAxisCall);

// Y Axis
var yAxisCall = d3.axisLeft(y)
    .tickFormat(function(d){ return +d + "%"; });
g.append("g")
    .attr("class", "y axis")
    .call(yAxisCall);

var regions = ["northern africa", "southern africa", "eastern africa", "western africa", "central africa"];

var legend = g.append("g")
    .attr("transform", "translate(" + (width - 10) + "," + (height - 240) + ")");

regions.forEach(function(region, i){
    var legendRow = legend.append("g")
        .attr("transform", "translate(0, " + (i * 15) + ")");

    legendRow.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", () => {
         console.log("your label" , region, regionColor(region));
         return regionColor(region); 
        })
        .attr("opacity", 0.5);

    legendRow.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .attr("id", "text-legend")
        .style("text-transform", "capitalize")
        .text(region);
});

d3.json("data/data.json").then(function(data){
    //console.log(data);
    
    formattedData = data.map(function(year){
        return year["countries"].filter(function(country){
            var dataExists = (country.electricity && country.underfive);
            return dataExists
        }).map(function(country){
            country.electricity = +country.electricity;
            country.underfive = +country.underfive;
            return country;            
        })
    });
    
    //console.log(formattedData);

    // First run of the visualization
    update(formattedData[0]);

});


$("#region-select")
    .on("change", function(){
        update(formattedData[time]);
    });

$("#date-slider").slider({
    max: 2016,
    min: 1990,
    step: 1,
    slide: function(event, ui){
        time = ui.value - 1990;
        update(formattedData[time]);
    }
}).slider("pips");



function update(data) {
    // Standard transition time for the visualization
    var t = d3.transition()
        .duration(800);

    var region = $("#region-select").val();

    var data = data.filter(function(d){
        if (region == "all") { return true; }
        else {
            return d.region == region;
        }
    });

    // JOIN new data with old elements.
    var circles = g.selectAll("circle")
            .data(data, function(d){
            return d.country;
        });

    // EXIT old elements not present in new data.
    circles.exit()
        .attr("class", "exit")
        .transition(t)
        .attr("opacity", 0)
        .remove();

    // ENTER new elements present in new data.
    circles.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", function(d,i) { 
            console.log("this is the region", d.region , regionColor(d.region.toLowerCase()))
            return regionColor(d.region.toLowerCase()); })
        .attr("opacity", 0.5)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .merge(circles)
        .transition(t)
            .attr("cy", function(d){ return y(d.underfive); })
            .attr("cx", function(d){ return x(d.electricity) })
            .attr("r", function(d){ return Math.sqrt(area(d.population) / Math.PI) });

    // Update the time label
    timeLabel.text(+(time + 1990));

    $("#date-slider").slider("value", +(time + 1990))
    
}


var margin2 = { left:80, right:20, top:50, bottom:100 };
var height2 = 500 - margin2.top - margin2.bottom, 
    width2 = 800 - margin2.left - margin2.right;

var g2 = d3.select("#chart2-area")
    .append("svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin2.left + ", " + margin2.top + ")");

var time2 = 0;
var formattedData2;

// Tooltip
var tip2 = d3.tip().attr('class', 'd3-tip')
    .html(function(d) {
        var text2 = "Country: <span style='color:#BB9F06'>" + d.country + "</span><br>";
        text2 += "Region: <span style='color:#BB9F06;text-transform:capitalize'>" + d.region + "</span><br>";
        text2 += "Under Five Mortality Rate: <span style='color:#BB9F06'>" + (d.underfive) + "%" + "</span><br>";
        text2 += "Access to Clean Fuels and Technologies for Cooking: <span style='color:#BB9F06'>" + (d.cooking.toFixed()) + "%" + "</span><br>";
        text2 += "Population: <span style='color:#BB9F06'>" + d3.format(",.0f")(d.population) + "</span><br>";
        return text2;
    });
    
g2.call(tip2);



// Scales
var x2 = d3.scaleLinear()
    .range([0, width2])
    .domain([-5, 100]);
var y2 = d3.scaleLinear()
    .range([height2, 0])
    .domain([0, 35]);
var area2 = d3.scaleLinear()
    .range([25*Math.PI, 1500*Math.PI])
    .domain([2000, 1400000000]);
var regionColor2 = d3.scaleOrdinal(d3.schemePastel1);

// Labels
var xLabel2 = g2.append("text")
    .attr("y", height2 + 60)
    .attr("x", width2 / 2)
    .attr("font-size", "13px")
    .attr("text-anchor", "middle")
    .text("Access to Clean Fuels and Technologies for Cooking");
var yLabel2 = g2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -60)
    .attr("x", -170)
    .attr("font-size", "13px")
    .attr("text-anchor", "middle")
    .text("Under Five Mortality Rate");
var timeLabel2 = g2.append("text")
    .attr("y", height2/2)
    .attr("x", width2/2)
    .attr("font-size", "90px")
    .attr("opacity", "0.1")
    .attr("text-anchor", "middle")
    .text("2000");

// X Axis
var xAxisCall2 = d3.axisBottom(x2)
    .tickFormat(function(d){ return +d + "%"; });
g2.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height2 +")")
    .call(xAxisCall2);

// Y Axis
var yAxisCall2 = d3.axisLeft(y2)
    .tickFormat(function(d){ return +d + "%"; });
g2.append("g")
    .attr("class", "y axis")
    .call(yAxisCall2);

var regions2 = ["northern africa", "southern africa", "eastern africa", "western africa", "central africa"];

var legend2 = g2.append("g")
    .attr("transform", "translate(" + (width2 - 10) + "," + (height2 - 240) + ")");

regions2.forEach(function(region, i){
    var legendRow2 = legend2.append("g")
        .attr("transform", "translate(0, " + (i * 15) + ")");

    legendRow2.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", () => {
         console.log("your label" , region, regionColor2(region));
         return regionColor2(region); 
        })
        .attr("opacity", 0.5);

    legendRow2.append("text")
        .attr("x", -10)
        .attr("y", 10)
        .attr("text-anchor", "end")
        .attr("id", "text-legend")
        .style("text-transform", "capitalize")
        .text(region);
});

d3.json("data/data2.json").then(function(data2){
    //console.log(data);
    
    formattedData2 = data2.map(function(year){
        return year["countries"].filter(function(country){
            var dataExists = (country.cooking && country.underfive);
            return dataExists
        }).map(function(country){
            country.cooking = +country.cooking;
            country.underfive = +country.underfive;
            return country;            
        })
    });
    
    //console.log(formattedData2);

    // First run of the visualization
    update2(formattedData2[0]);

});


$("#region-select2")
    .on("change", function(){
        update2(formattedData2[time2]);
    });

$("#date2-slider").slider({
    max: 2016,
    min: 2000,
    step: 1,
    slide: function(event, ui){
        time2 = ui.value - 2000;
        update2(formattedData2[time2]);
    }
}).slider("pips");



function update2(data) {
    // Standard transition time for the visualization
    var t2 = d3.transition()
        .duration(800);

    var region2 = $("#region-select2").val();

    var data = data.filter(function(d){
        if (region2 == "all") { return true; }
        else {
            return d.region == region2;
        }
    });

    // JOIN new data with old elements.
    var circles2 = g2.selectAll("circle")
            .data(data, function(d){
            return d.country;
        });

    // EXIT old elements not present in new data.
    circles2.exit()
        .attr("class", "exit")
        .transition(t2)
        .attr("opacity", 0)
        .remove();

    // ENTER new elements present in new data.
    circles2.enter()
        .append("circle")
        .attr("class", "enter")
        .attr("fill", function(d,i) { 
            console.log("this is the region", d.region , regionColor2(d.region.toLowerCase()))
            return regionColor2(d.region.toLowerCase()); })
        .attr("opacity", 0.5)
        .on("mouseover", tip2.show)
        .on("mouseout", tip2.hide)
        .merge(circles2)
        .transition(t2)
            .attr("cy", function(d){ return y2(d.underfive); })
            .attr("cx", function(d){ return x2(d.cooking) })
            .attr("r", function(d){ return Math.sqrt(area2(d.population) / Math.PI) });

    // Update the time label
    timeLabel2.text(+(time2 + 2000));

    $("#date2-slider").slider("value", +(time2 + 2000))
    
}


