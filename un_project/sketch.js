

console.log('hello world')

let ssa = [" Angola", " Benin", " Botswana", " Burkina Faso", " Burundi", " Cabo Verde", " Cameroon", " Central African Republic", " Chad", " Comoros", " Congo", " Democratic Republic of the Congo", " Cote d'Ivoire", "Djibouti", "Equatorial Guinea", " Eritrea", " Ethiopia", " Gabon", " Gambia", " Ghana", " Guinea", " Guinea-Bissau", " Kenya", " Lesotho", " Liberia", " Madagascar", " Malawi", " Mali", " Mauritania", " Mauritius", " Mozambique", " Niger", " Nigeria", " Rwanda", " Sao Tome and Principe", " Senegal", " Seychelles", " Sierra Leone", "Somalia", " South Africa", " South Sudan", " Sudan", " United Republic of Tanzania", " Togo", " Uganda", " Zambia", " Zimbabwe"];

    
let selectCountry = d3.select('select')
    .on('change', update)
    .selectAll('option')
    .data(ssa)
    .enter()
    .append('option')
    .text(function (d) { return d 
        
    });
    

         
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