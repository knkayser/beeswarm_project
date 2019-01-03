var margin = {top: 20, right: 20, bottom: 20, left: 20};
	width = 800 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom,
	formatPercent = d3.format(".1%");

var svg = d3.select("#choropleth").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

tooltip = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

// talks to the database
// function wraps around database calls via the application interface, i.e., when the slider and drop are changed data is updated
function update_map(year, state, update = false) {
	d3.json(`/${year}/${state}`).then (net_migration_data => {
		d3.json("/static/js/us-states.json").then (us_json => {
			// console.log(us_json);
			// console.log(net_migration_data);
			
			//min max color range
			var min = 0;
			var max = 0;

			// dynamically code min and max color range based on selection
			Object.entries(net_migration_data.myCollection[0]).forEach(([state_select, migration_rate]) => {
				if (migration_rate < min) {
					//console.log(state_select, migration_rate);
					min = migration_rate
					//console.log(min); 
				}
				if (migration_rate > max) {
					max = migration_rate
				}
				for (var i = 0; i < us_json.features.length; i++) {
					//console.log(state_select);
					//console.log(us_json.features[i].properties.name);
					if (state_select===us_json.features[i].properties.name) {
						//console.log(state_select);
						//console.log(us_json.features[i].properties.name);
						us_json.features[i].properties.value = migration_rate;
					}
				}
			});
			
			// use min and max and provided range for quantile color scheme
			var color = d3.scaleQuantize()
				//.range(["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"])
				.range(["#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac"])
				.domain([min, max]);

			// map projection data
			var projection = d3.geoAlbersUsa()
				.translate([width / 2, height / 2]);

			var path = d3.geoPath()
				.projection(projection);

			if (update===false) {
				svg.selectAll("path")
				.data(us_json.features)
				.enter()
				.append("path")
				.attr("d", path)
				.style("fill", function(d) {
					var value = d.properties.value;
					if (value) {
						//console.log(value);
						return color(value);
					} else {
						return "black"
					}
				})

			} else {
				console.log("updated");
				svg.selectAll("path")
				.data(us_json.features)
				.style("fill", function(d) {
					var value = d.properties.value;
					if (value) {
						return color(value);
					} else {
						return "black"
					}
				})

			}
			
		}); // end reading the us-json file loop
	}); // end connecting to database loop
} // end update_map function

// called when the state drop-down is changed
// reads the value of the drop-down and slider, and request values from API route
function optionChanged(state) {
	year = d3.select('#slider').property('value')
	update_map(year, state, update = true)
//	console.log("state changed");
};

function yearChanged(year) {
	state = d3.select('#selDataset').property('value')
//	console.log('year slider moved');
	update_map(year, state, update = true)
};

// d3 slider and on-change function for slider
var slider = d3.select(".slider")
	.append("input")
	.attr("id", "slider")
	.attr("type", "range")
	.attr("min", 2005)
	.attr("max", 2017)
	.attr("step", 1)
	.on("input", function() {
		yearChanged(this.value) 
	});

// d3 state drop-down 
var drop_down = d3.select("#selDataset")
	.append("input")
	.on("input", function() {
		optionChanged(this.value)
	});
	
update_map(2005, 'Alabama');

// var legendText = ["", "10%", "", "15%", "", "20%", "", "25%"];
// var legendColors = ["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"];

// function ready(error, smoking_data, us_json) {

// 	countyShapes
// 		.on("mouseover", function(d) {
// 			tooltip.transition()
// 			.duration(250)
// 			.style("opacity", 1);
// 			tooltip.html(
// 			"<p><strong>" + d.properties.years[1996][0].county + ", " + d.properties.years[1996][0].state + "</strong></p>" +
// 			"<table><tbody><tr><td class='wide'>Smoking rate in 1996:</td><td>" + formatPercent((d.properties.years[1996][0].rate)/100) + "</td></tr>" +
// 			"<tr><td>Smoking rate in 2012:</td><td>" + formatPercent((d.properties.years[2012][0].rate)/100) + "</td></tr>" +
// 			"<tr><td>Change:</td><td>" + formatPercent((d.properties.years[2012][0].rate-d.properties.years[1996][0].rate)/100) + "</td></tr></tbody></table>"
// 			)
// 			.style("left", (d3.event.pageX + 15) + "px")
// 			.style("top", (d3.event.pageY - 28) + "px");
// 		})
// 		.on("mouseout", function(d) {
// 			tooltip.transition()
// 			.duration(250)
// 			.style("opacity", 0);
// 		});

// 	svg.append("path")
// 		.datum(topojson.feature(us_json, us_json.objects.states, function(a, b) { return a !== b; }))
// 			.attr("class", "states")
// 			.attr("d", path);

// 	var legend = svg.append("g")
// 		.attr("id", "legend");

// 	var legenditem = legend.selectAll(".legenditem")
// 		.data(d3.range(8))
// 		.enter()
// 		.append("g")
// 			.attr("class", "legenditem")
// 			.attr("transform", function(d, i) { return "translate(" + i * 31 + ",0)"; });

// 	legenditem.append("rect")
// 		.attr("x", width - 240)
// 		.attr("y", -7)
// 		.attr("width", 30)
// 		.attr("height", 6)
// 		.attr("class", "rect")
// 		.style("fill", function(d, i) { return legendColors[i]; });

// 	legenditem.append("text")
// 		.attr("x", width - 240)
// 		.attr("y", -10)
// 		.style("text-anchor", "middle")
// 		.text(function(d, i) { return legendText[i]; });

// 	function update(year){
// 		slider.property("value", year);
// 		d3.select(".year").text(year);
// 		countyShapes.style("fill", function(d) {
// 			return color(d.properties.years[year][0].rate)
// 		});
// 	}

// 	var slider = d3.select(".slider")
// 		.append("input")
// 			.attr("type", "range")
// 			.attr("min", 2005)
// 			.attr("max", 2017)
// 			.attr("step", 1)
// 			.on("input", function() {
// 				var year = this.value;
// 				update(year);
// 			});

// update(2005);

// }
