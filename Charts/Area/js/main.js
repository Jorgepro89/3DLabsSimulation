
var margin = {top: 30, right: 40, bottom: 50, left: 60},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Time parser for x-scale
var parseTime = d3.timeParse("%d-%b-%y");

// Scales
var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

// Axis generators
var xAxisCall = d3.axisBottom();
var yAxisCall = d3.axisLeft();

// Area generator
var area = d3.area()
    .x((d) => { return x(d.date); })
    .y0(height)
    .y1((d) => { return y(d.close); });

// Axis groups
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");

var yAxis = g.append("g")
    .attr("class", "y axis");

// Y-Axis label
g.append("text")
    .attr("class", "y axis-label")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("x", -height / 2)
    .attr("dy", "1em")
    .attr("text-anchor", "middle")
    .text("Price ($)");

d3.tsv("data/area.tsv").then((data) => {
    // Data processing
    data.forEach((d) => {
        d.date = parseTime(d.date);
        d.close = +d.close;
    });

    // Set domains for scales
    x.domain(d3.extent(data, (d) => { return d.date; }));
    y.domain([0, d3.max(data, (d) => { return d.close; })]);

    // Generate axes once scales have been set
    xAxis.call(xAxisCall.scale(x));
    yAxis.call(yAxisCall.scale(y));

    // Add area chart
    g.append("path")
        .datum(data)
        .attr("fill", "lightblue")
        .attr("d", area);

}).catch((error) => {
    console.log(error);
});