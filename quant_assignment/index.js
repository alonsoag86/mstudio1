
const title = ["Access to Electricity in Burundi"];
const description = ["A visualization of the state of Burundi where more than 80% of the total population is rural"];


let titleDiv = d3.select('body')
        .append('div')
        .attr("class", "title");
        
let graphTitle = titleDiv.selectAll('p')
        .data(title)
        .enter()
        .append('p')
        .text((d,i) => {
            return d
    });
        
let subDiv = d3.select('body')
        .append('div')
        .attr("class", "subTitle");
        
let subTitle = subDiv.selectAll('p')
        .data(description)
        .enter()
        .append('p')
        .text((d,i) => {
            return d
    });

const margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;



d3.json('burundi.json').then((data) => {
    
    svg(data)
    console.table(data)
})
  
let svg = (data) => {
    

let parseTime = d3.timeParse("%Y");

let x = d3.scaleTime()
    .domain([parseTime([data[0].Year]), parseTime([data[data.length-1].Year])])
    .range([0, width]);
    
let y = d3.scaleLinear()
    .domain([0,2])
    .range([0,height]);


let graph = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "graph");

let groupUrban = graph.append('g').attr('class','urban')
let groupRural = graph.append('g').attr('class','rural')
let groupTotal = graph.append('g').attr('class','total')
    
    
let circlesUrban = groupUrban.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr("cx", (d,i) => {
        return x(parseTime(d.Year)) 
    })
    .attr('cy', (d,i) => {
        return y(0)
    })
    .attr('r', (d,i) => {
        return Math.sqrt(d.Urban) * 1.8
    })
    .attr('fill','#E8F6FF')
    
let circlesRural = groupRural.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr("cx", (d,i) => {
        return x(parseTime(d.Year)) 
    })
    .attr('cy', (d,i) => {
        return y(1)
    })
    .attr('r', (d,i) => {
        return Math.sqrt(d.Rural) * 2.8 
    })
    .attr('fill','#E8F6FF')

let circlesTotal = groupTotal.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr("cx", (d,i) => {
        return x(parseTime(d.Year)) 
    })
    .attr('cy', (d,i) => {
        return y(2)
    })
    .attr('r', (d,i) => {
        return Math.sqrt(d.Total) * 2.8 
    })
    .attr('fill','#E8F6FF')
    
}

