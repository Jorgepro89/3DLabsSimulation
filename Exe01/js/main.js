var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var circle = svg.append("circle")
    .attr("cx", 150)
	.attr("cy", 150)
	.attr("r", 80)
	.attr("fill", "blue");

var rect = svg.append("rect")
	.attr("x", 40)
	.attr("y", 30)
	.attr("width", 30)
	.attr("height", 20)
	.attr("fill","red");

// Apply rotation to the ellipse
petal2.attr("transform", "rotate(" + 45 + " 200 200)");
petal3.attr("transform", "rotate(" + 90 + " 200 200)");
petal4.attr("transform", "rotate(" + 135 + " 200 200)");

var circle = svg.append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 50)
    .attr("fill", "brown");
