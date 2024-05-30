// Cargar los datos y procesarlos
async function loadBuildingsData() {
    try {
        const response = await fetch("data/buildings.json");
        const data = await response.json();

        // Procesar datos
        data.forEach(d => {
            d.height = +d.height;
            console.log(d);
        });

        console.log(data);

        const width = 700;
        const height = 550;
        const barWidth = 55;

        const svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const rectangles = svg.selectAll("rect")
            .data(data);

        rectangles.enter()
            .append("rect")
            .attr("x", (d, i) => {
                console.log(`Item: ${d.name} Index: ${i}`);
                return (i * (barWidth + 10)) + 40;
            })
            .attr("y", d => {
                return (height - d.height * 0.6);
            })
            .attr("width", barWidth)
            .attr("height", d => d.height * 0.6)
            .attr("fill", "steelblue");

    } catch (error) {
        console.error(error);
    }
}

// Llamar a la función para cargar los datos
loadBuildingsData();
