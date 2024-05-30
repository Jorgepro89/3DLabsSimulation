// Carga los datos y maneja los errores
async function loadData() {
    try {
        const response = await fetch("data/ages.json");
        const data = await response.json();

        // Procesamiento de datos
        data.forEach(d => {
            d.age = +d.age;
            console.log(d);
        });

        console.log(data);

        // Creación del SVG
        const svg = d3.select("#chart-area").append("svg")
            .attr("width", 600)
            .attr("height", 600);

        // Creación de los círculos
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => {
                console.log(`Item: ${d.age} Index: ${i}`);
                return (i * 70) + 50;
            })
            .attr("cy", 100)
            .attr("r", d => d.age * 3)
            .attr("fill", "blue");

    } catch (error) {
        console.log(error);
    }
}

// Llama a la función para cargar los datos
loadData();
