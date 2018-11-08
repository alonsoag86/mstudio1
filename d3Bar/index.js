console.log('hello world');


d3.json('museums.json').then((data) => {
    // filter institutions with yearly operating expenses greatern than $2 Mio.
               //data = data.filter((data) => { return data.operatingExpenses >= 2000000; }) 

                // filter institutions that contain the word `Art` using the String match() method
               //data = data.filter((data) => { return data.name.match('Art'); }) 
    svg(data)
})

let svg = (data) => {
    
let y = d3.scaleLinear()
    .domain([0, 250000000])
    .range([0, window.innerHeight])
    
let graph = d3.select('body')
                .append('svg')
                .attr('width', window.innerWidth + 'px')
                .attr('height', window.innerHeight + 'px');
                
    let modal = graph
        .append('g')
        .attr('id', 'modal');
        
    /*let name = modal.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', '10')
        .attr('y', '30')
        .text((d) => {
            return d.name
        })*/
                
    let group = graph
        .append('g')
        .attr('id', 'group');
        
    let bars = group.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => {
            return `translate(${i * window.innerWidth/data.length}, 0)`;
        })
        .attr('expenses', (d,i) => {
            return d.operatingExpenses
        })
        .on('mouseover', function(d) {
                        d3.select(this)
                            .select('text')
                            .text((d) => { return `$ ${d.operatingExpenses}`; })
                        d3.select(this)
                            .select('#output')
                            .style('fill', 'lavender')
                    })
                    .on('mouseout', function(d) {
                        d3.select(this)
                            .select('text')
                            .text((d) => { return d.name; })
                        d3.select(this)
                            .select('#output')
                            .style('fill', 'black')
                    });
        
    bars.append('rect')
        .attr('width', '20px')
        .attr('height', (d,i) => {
            return d.operatingExpenses * 0.000002
        })
        //.attr('x', )
        .attr('y', (d,i) => {
            return (window.innerHeight - d.operatingExpenses * 0.000002) + 3
        })
        .attr('id', 'output')
        
        
       bars.append('rect')
            .attr('width', '20px') // TODO
            .attr('height', window.innerHeight)  // TODO
            .attr('y', 0)
            .style('fill', 'transparent');
        
        
        bars.append('text')
        .text((d) => {
            return d.name
        })
        .attr('transform', (d, i) => {
            return `translate(15, ${window.innerHeight-d.operatingExpenses*0.000002}) rotate(-90)`; // i * window.innerWidth/data.length
        })
        .attr('class', 'museum')
        
        
        
}

            
    