async function loadBuildingsData() {
    try {
        const response = await fetch("data/buildings.json");
        const data = await response.json();

        // Procesamiento de datos
        data.forEach(d => {
            d.height = +d.height;
        });
        console.log(data);

        const buildings = data.map(d => d.name);

        const svg = d3.select("#chart-area").append("svg")
            .attr("width", 500)
            .attr("height", 500);

        const x = d3.scaleBand()
            .domain(buildings)
            .range([0, 500])
            .paddingInner(0.3)
            .paddingOuter(0.3);

        const y = d3.scaleLinear()
            .domain([0, 826])
            .range([0, 500]);

        const color = d3.scaleOrdinal()
            .domain(buildings)
            .range(d3.schemeSet3);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => 500 - y(d.height * 0.5))
            .attr("width", x.bandwidth())
            .attr("height", d => y(d.height))
            .attr("fill", d => color(d.height));

    } catch (error) {
        console.log(error);
    }
}

// Llama a la función para cargar los datos
loadBuildingsData();
