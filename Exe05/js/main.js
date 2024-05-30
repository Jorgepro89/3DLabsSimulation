async function loadBuildingsData() {
    try {
        const response = await fetch("data/buildings.json");
        const data = await response.json();

        // Procesamiento de datos
        data.forEach(d => {
            d.height = +d.height;
        });

        // Mapeo de los datos
        const buildings = data.map(d => d.name);

        const width = 700;
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 120, left: 120 };

        // Crear SVG y grupo
        const svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`); // Agregar margen

        // Crear escalas x, y y de color
        const x = d3.scaleBand()
            .domain(buildings)
            .range([0, width])
            .paddingInner(0.4)
            .paddingOuter(0.4);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.height)])
            .range([height, 0]);

        const color = d3.scaleOrdinal()
            .domain(buildings)
            .range(d3.schemeSet2);

        // Ejes
        const bottomAxis = d3.axisBottom(x);
        g.append("g")
            .attr("class", "bottom axis")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis)
            .selectAll("text")
            .attr('text-anchor', 'end')
            .attr('font-size', '12px')
            .attr('transform', `rotate(-15) translate(-10, 5)`);
        // Etiqueta del eje X
        g.append("text")
            .attr("class", "x axis-label")
            .attr("x", width / 2)
            .attr("y", height + 100)
            .attr("font-size", "22px")
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .text("World's Tallest Buildings");

        const leftAxis = d3.axisLeft(y).ticks(6).tickFormat(d => `${d} m`);
        g.append("g")
            .attr("class", "left axis")
            .call(leftAxis);
        // Etiqueta del eje Y
        g.append("text")
            .attr("class", "y axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -(height / 2))
            .attr("y", -80)
            .attr("font-size", "22px")
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .text("Height (m)");

        // Rectángulos
        g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.height))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.height))
            .attr("fill", d => color(d.name));

    } catch (error) {
        console.log(error);
    }
}

// Llama a la función para cargar los datos
loadBuildingsData();
