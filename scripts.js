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
	$.get("")
}
