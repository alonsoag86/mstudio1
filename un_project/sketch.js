

console.log('hello world')

let ssa = [" Sub-Saharan Africa", " Angola", " Benin", " Botswana", " Burkina Faso", " Burundi", " Cabo Verde", " Cameroon", " Central African Republic", " Chad", " Comoros", " Congo", " Democratic Republic of the Congo", " Cote d'Ivoire", " Equatorial Guinea", " Eritrea", " Ethiopia", " Gabon", " Gambia", " Ghana", " Guinea", " Guinea-Bissau", " Kenya", " Lesotho", " Liberia", " Madagascar", " Malawi", " Mali", " Mauritania", " Mauritius", " Mozambique", " Niger", " Nigeria", " Rwanda", " Sao Tome and Principe", " Senegal", " Seychelles", " Sierra Leone", " South Africa", " South Sudan", " Swaziland", " United Republic of Tanzania", " Togo", " Uganda", " Zambia", " Zimbabwe"];

let year_2010 = '2010';
let year_2015 = '2015';


let selectCountry = d3.select('body')
    .append('select')
    .on('change', update)
    .selectAll('option')
    .data(ssa)
    .enter()
    .append('option')
    .text(function (d) { return d 
        
    });
    
let wrapper_1 = d3.select('body')
    .append('div')
    .attr('id', 'wrapper1')
    
    
let y2010 = d3.select('#wrapper1')
    .append('div')
    .attr('id', "y2010")
    .selectAll('p')
    .data([year_2010])
    .enter()
    .append('p')
    .text((d) => {
            return d
    });
    
for (let i = 1; i < 6; i++) {
    
    let cells2010 = d3.select('#wrapper1')
    .append('div')
    .attr('class', 'yearCell')
    .attr('width', '50px')
    .attr('height', '50px')
    .append('p')
    .text('hello')
}    
    

let wrapper_2 = d3.select('body')
    .append('div')
    .attr('id', 'wrapper2')
    

let y2015 = d3.select('#wrapper2')
    .append('div')
    .attr("id", "y2015")
    .selectAll('p')
    .data([year_2015])
    .enter()
    .append('p')
    .text((d) => {
            return d
    });
    
    
for (let i = 1; i < 6; i++) {
    
    let cells2015 = d3.select('#wrapper2')
    .append('div')
    .attr('class', 'yearCell')
    .attr('width', '50px')
    .attr('height', '50px')
    .append('p')
    .text('hello')
    
}   
         
           
    function update(){
        let updateVal = d3.select(selectCountry)
            //console.log(this.value)
            .property(this.value)
    }