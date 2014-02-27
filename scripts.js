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

console.log('js working');//test if html is pulling js

//(1) jQuery document ready function will call pageReady
$(document).ready(pageReady);

//(2) pageReady will load the Google Viz libary
function pageReady(){
	
	console.log('page ready');//test if document ready is correctly formed
	
	google.load("visualization", "1", {packages:["corechart"],callback:"googleLibLoaded"});//loading Google Viz Library w/ callback function googleLibLoaded

}

function googleLibLoaded(){
	
	console.log('google loaded');//test if Google Viz library is loaded
		
	$.get("GDPC1.json", gdpLoaded, "json");//(3) goes and gets the json file with the data in it

}//end googleLibLoaded

//(4)This function will feed the data (GDP) into the Google Viz library and display it on the page
function gdpLoaded(GDP){
	
	console.log(GDP.GDPdata);//testing if GDPdata is loading

	var gdpData = GDP.GDPdata;//this creates an object for my data and tells it to look in the json file for the data object.
	
	var dataHeaders = ["Date","U.S. GDP (Trillion 2009 dollars)"];//this creates headers for my array that I will feed to the Google Viz lib
	
	var gdpArray = [];//this creates an empty array that I will populate with headers and data so I can feed it to the Google Viz lib
	
	gdpArray.push(dataHeaders);
	
	//The below for loop will turn each object from the GDP data into arrays that can be put into the empty gdpArray 
	for(var i=0; i<gdpData.length; i++){
		
		var workingObject = gdpData[i];//creates a random object that will update with each new object from the GDP data

		var momentDate = moment(workingObject.DATE);//using moment.js to tell the computer that the json DATE property is actually a date
		console.log(momentDate);//test to see if moment is working
				
		var newNum = workingObject.VALUE/1000;//this var converts the billions to trillions!
		
		var shortNum = newNum.toFixed(2)//this var rounds the VALUEs to a smooth two decimal places

		var workingArray = [momentDate._d, Number(shortNum)];//creates a random ARRAY that will be populated by the properties from the objects in the GDP data
														//NOTE: shortNum was coming in as a string for some reason, which was easily fixed.

		gdpArray.push(workingArray);//this will populate my gdpArray, which I will feed to the Google Data Viz library to display it on the page
		
		
	}//end for
	
	console.log(gdpArray);//testing if gdpArray is loading

//(5)This section of the function will draw the chart to the browser. Var names are taken from the Google documentation at https://developers.google.com/chart/interactive/docs/gallery/linechart

        var data = google.visualization.arrayToDataTable(gdpArray);//this feeds my data, formed as an array of arrays, into the Google Viz library

		var options = {
          title: 'U.S. Real GDP, 1947 - Present',
          titleTextStyle: {fontSize:18},
          hAxis: {title:'Date', format: 'MMM. d, y', },
          vAxis: {title:'U.S. Real GDP ($ Trillions)', ticks: [0,2,4,6,8,10,12,14,16,18]},
          height: 600,
          curveType: 'function',
          colors:['green'],
          explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
          chartArea:{top:70, height:400}
        };//this formats my chart

        var chart = new google.visualization.LineChart(document.getElementById('gdp_div'));//changed div id to "gdp_div". See html.
        
        chart.draw(data, options);//this is the Google function to draw the chart. It will take the data from the data var and the formatting from the options var
	
}//end gdpLoaded