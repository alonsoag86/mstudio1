const pixelsTag = document.querySelector("div.pixels")
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


//code for first graph

d3.csv('states_nigeriab.csv').then((data) => {
    
  data.forEach(function(d) {
        d.home_d = +d.home_d;
        d.health_d = +d.health_d
  });
  console.log(data)
  let entries = d3.nest()
  .key(function(d) { return d.background; })
  .entries(data)
  //console.log(entries)
    
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
    .attr('fill', 'white')
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
      .attr('y', 0)
      .attr('text-anchor', 'middle')
      .text('Home Deliveries by Region')
}





