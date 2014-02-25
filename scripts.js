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
	
	$.get("GDPC1.json", gdpLoaded, "json");//(3) loads up the data

}//end googleLibLoaded

//(4)This function will feed the data (GDP) into the Google Viz library and display it on the page
function gdpLoaded(GDP){
	console.log(GDP.GDPdata);//testing if GDPdata is loading

	var gdpData = GDP.GDPdata;//this creates an object for my data and tell it to look in the json file for the data object
	
	var dataHeaders = ["Date","Real GDP (billions of 2009 dollars)"];//this creates headers for my array that I will feed to the Google Viz lib
	
	var gdpArray = [];//this creates an empty array that I will populate with headers and data so I can feed it to the Google Viz lib
	
	gdpArray.push(dataHeaders);
	
	//The below for loop will turn each object from the GDP data into arrays that can be put into the empty gdpArray 
	for(var i=0; i<gdpData.length; i++){
		
		var workingObject = gdpData[i];//creates a random object that will update with each new object from the GDP data
		
		var workingArray = [workingObject.DATE, workingObject.VALUE];//creates a random ARRAY that will be populated by the properties from the objects in the GDP data
		gdpArray.push(workingArray);//this will populate my gdpArray, which I will feed to the Google Data Viz library to display it on the page

	}//end for
	
	
	
}//end gdpLoaded

//(5)This function will draw the chart to the browser. Names are taken from the Google documentation at https://developers.google.com/chart/interactive/docs/gallery/linechart
function drawChart() {
        var data = google.visualization.arrayToDataTable(gdpArray);

        var options = {
          title: 'Real U.S. GDP, 1947-present'
        };

        var chart = new google.visualization.LineChart(document.getElementById('gdp_div'));
        chart.draw(data, options);
      }

