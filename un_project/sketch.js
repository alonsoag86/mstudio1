

console.log('hello world')

let ssa = [" Angola", " Benin", " Botswana", " Burkina Faso", " Burundi", " Cabo Verde", " Cameroon", " Central African Republic", " Chad", " Comoros", " Congo", " Democratic Republic of the Congo", " Cote d'Ivoire", "Djibouti", "Equatorial Guinea", " Eritrea", " Ethiopia", " Gabon", " Gambia", " Ghana", " Guinea", " Guinea-Bissau", " Kenya", " Lesotho", " Liberia", " Madagascar", " Malawi", " Mali", " Mauritania", " Mauritius", " Mozambique", " Niger", " Nigeria", " Rwanda", " Sao Tome and Principe", " Senegal", " Seychelles", " Sierra Leone", "Somalia", " South Africa", " South Sudan", " Sudan", " United Republic of Tanzania", " Togo", " Uganda", " Zambia", " Zimbabwe"];
//console.log(ssa.length)
//let year_2010 = '2010';
//let year_2015 = '2015';


/*let selectCountry = d3.select('body')
    .append('select')
    .on('change', update)
    .selectAll('option')
    .data(ssa)
    .enter()
    .append('option')
    .text(function (d) { return d 
        
    });
    */
    
let selectCountry = d3.select('select')
    .on('change', update)
    .selectAll('option')
    .data(ssa)
    .enter()
    .append('option')
    .text(function (d) { return d 
        
    });
    
/*let wrapper_1 = d3.select('body')
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
*/
         
let t = function(){ return d3.transition().duration(1000); }


d3.json("data.json").then(function(data){
    console.log(data);
    nested_data = {}
    nested_data = d3.nest()
    .key(function(d) { return d.country; })
    .entries(data)
    console.log(nested_data);

    update();

});
           
function update(){
   
  let country = $("select").val()
  console.log(country);
  let countryFiltered = nested_data[country].filter(function(d){
        return countryFiltered
        console.log(countryFiltered)
    });
   
}