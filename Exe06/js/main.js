async function loadRevenuesData() {
    try {
        const response = await fetch("data/revenues.json");
        const data = await response.json();

        // Procesamiento de datos
        data.forEach(d => {
            d.revenue = +d.revenue;
            d.profit = +d.profit;
        });

        let flag = true;

        const width = 700;
        const height = 450;
        const margin = { top: 20, right: 20, bottom: 120, left: 120 };

        // Crear SVG
        const svg = d3.select("#chart-area")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        // Crear grupo dentro del SVG
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Crear escalas x,y
        const x = d3.scaleBand()
            .range([0, width])
            .paddingInner(0.4)
            .paddingOuter(0.4);

        const y = d3.scaleLinear()
            .range([height, 0]);

        // Ejes
        const bottomAxis = d3.axisBottom(x);
        g.append("g")
            .attr("class", "bottom axis")
            .attr("transform", `translate(0,${height})`)
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
            .text("Month");

        const leftAxis = d3.axisLeft(y).ticks(6).tickFormat(d => `${d}k`);
        g.append("g")
            .attr("class", "left axis")
            .call(leftAxis);

        // Etiqueta del eje Y
        const yLabel = g.append("text")
            .attr("class", "y axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -80)
            .attr("font-size", "22px")
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .text("Revenue (dlls.)");

        // Función de actualización
        function update(data) {
            const value = flag ? "revenue" : "profit";
            yLabel.text(flag ? "Revenue (dlls.)" : "Profits (dlls.)");

            x.domain(data.map(d => d.month));
            y.domain([0, d3.max(data, d => d[value])]);

            g.select(".bottom.axis").call(bottomAxis);
            g.select(".left.axis").call(leftAxis);

            const rectangles = g.selectAll("rect").data(data);

            rectangles.enter()
                .append("rect")
                .merge(rectangles)
                .attr("x", d => x(d.month))
                .attr("y", d => y(d[value]))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d[value]))
                .attr("fill", "yellow");

            rectangles.exit().remove();
        }

        // Intervalo para actualizar los datos
        d3.interval(() => {
            update(data);
            flag = !flag;
        }, 1000);

    } catch (error) {
        console.error(error);
    }
}

// Llama a la función para cargar los datos
loadRevenuesData();
