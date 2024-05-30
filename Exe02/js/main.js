const data = [25, 20, 15, 10, 5];

const svg = d3.select("#chart-area").append("svg")
    .attr("width", 400)
    .attr("height", 400);

const rectangles = svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => {
        console.log(`Item: ${d} Index: ${i}`);
        return (i * 50) + 25;
    })
    .attr("y", (d, i) => {
        console.log(`Item: ${d} Index: ${i}`);
        return (i * 3) + 100;
    })
    .attr("width", d => d)
    .attr("height", d => d)
    .attr("fill", "pink");


