/**
 * @author
 */

/*
 * Steps:
 * 1. Document ready function
 * 2. Load Google Viz library
 * 3. Load Data
 * 4. Feed data to Google Viz library
 * 5. Display data viz on page
 * 
 * NOTE: The data is taken from FRED (http://research.stlouisfed.org/fred2/series/GDPC1), 
 * 	downloaded as CSV, and converted to JSON with convertcsv.com (http://www.convertcsv.com/csv-to-json.htm).
 * 	This was done in lieu of having to get an access key from FRED, as the potential 24-hour wait
 * 	period was too long.
 * 
 */

//(1) jQuery document ready function will call pageReady
$(document).ready(pageReady);

//(2) pageReady will load the Google Viz libary
function pageReady(){
	google.load("visualization", "1", {packages:["corechart"],callback:"googleLibLoaded"});//loading Google Viz Library w/ callback function googleLibLoaded
}

function googleLibLoaded(){
		
	$.get("GDPC1.json", gdpLoaded, "json");//(3) goes and gets the json file with the data in it

}//end googleLibLoaded

//(4)This function will feed the data (GDP) into the Google Viz library and display it on the page
function gdpLoaded(GDP){

	var gdpData = GDP.GDPdata;//this creates an object for my data and tells it to look in the json file for the data object.
	
	var dataHeaders = ["Date","U.S. GDP (2009 dollars)"];//this creates headers for my array that I will feed to the Google Viz lib
	
	var gdpArray = [];//this creates an empty array that I will populate with headers and data so I can feed it to the Google Viz lib
	
	gdpArray.push(dataHeaders);
	
	
	//The below for loop will turn each object from the GDP data into arrays that can be put into the empty gdpArray 
	for(var i=0; i<gdpData.length; i++){
		
		var workingObject = gdpData[i];//creates a random object that will update with each new object from the GDP data

		var momentDate = moment(workingObject.DATE);
		console.log(momentDate);
		
		var newDate = moment(momentDate).format("MMM. D, YYYY");
		console.log(newDate);
		
		var workingArray = [newDate, workingObject.VALUE];//creates a random ARRAY that will be populated by the properties from the objects in the GDP data
		gdpArray.push(workingArray);//this will populate my gdpArray, which I will feed to the Google Data Viz library to display it on the page
		
		
	}//end for
	

//(5)This section of the function will draw the chart to the browser. Var names are taken from the Google documentation at https://developers.google.com/chart/interactive/docs/gallery/linechart

        var data = google.visualization.arrayToDataTable(gdpArray);//this feeds my data, formed as an array of arrays, into the Google Viz library

		var options = {
          title: 'U.S. Real GDP, 1947 - Present',
          titleTextStyle: {fontSize:18},
          hAxis: {title:'Date', ticks: [new Date(1947,1,1), new Date(1950,1,1), new Date(1955,1,1), 
          	new Date(1960,1,1), new Date(1965,1,1), new Date(1970,1,1), new Date(1975,1,1), 
          	new Date(1980,1,1), new Date(1985,1,1), new Date(1990,1,1), new Date(1995,1,1),
          	new Date(1990,1,1), new Date(1995,1,1), new Date(2000,1,1), new Date(2005,1,1),
          	new Date(2010,1,1), new Date(2013,10,1)]},
          vAxis: {title:'U.S. Real GDP ($ Billions)'},
          height: 580,
          curveType: 'function',
          colors:['green'],
          chartArea:{top:50, height:400}
        };//this formats my chart

        var chart = new google.visualization.LineChart(document.getElementById('gdp_div'));//changed div id to "gdp_div". See html.
        
        chart.draw(data, options);//this is the Google function to draw the chart. It will take the data from the data var and the formatting from the options var
	
}//end gdpLoaded