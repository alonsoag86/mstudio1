

console.log('hello world')

let ssa = [" Sub-Saharan Africa", " Angola", " Benin", " Botswana", " Burkina Faso", " Burundi", " Cabo Verde", " Cameroon", " Central African Republic", " Chad", " Comoros", " Congo", " Democratic Republic of the Congo", " Cote d'Ivoire", " Equatorial Guinea", " Eritrea", " Ethiopia", " Gabon", " Gambia", " Ghana", " Guinea", " Guinea-Bissau", " Kenya", " Lesotho", " Liberia", " Madagascar", " Malawi", " Mali", " Mauritania", " Mauritius", " Mozambique", " Niger", " Nigeria", " Rwanda", " Sao Tome and Principe", " Senegal", " Seychelles", " Sierra Leone", " South Africa", " South Sudan", " Swaziland", " United Republic of Tanzania", " Togo", " Uganda", " Zambia", " Zimbabwe"];




let selectCountry = d3.select('body')
    .append('select')
    .on('change', update)
    .selectAll('option')
    .data(ssa)
    .enter()
    .append('option')
    .text(function (d) { return d; });
    
    
let y2010 = 
                
           
    function update(){
        let updateVal = d3.select(selectCountry)
            //console.log(this.value)
            .property(this.value)
    }