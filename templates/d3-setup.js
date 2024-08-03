// d3-setup.js

document.addEventListener("DOMContentLoaded", function() {
    // Sample data for members tree with image URLs
    var treeData = {
        name: "President",
        img: "images/president.jpg",
        children: [
            { name: "Vice-President", img: "images/vice_president.jpg" },
            { name: "Secretary", img: "images/secretary.jpg" },
            { name: "Treasurer", img: "images/treasurer.jpg" }
        ]
    };

    // Dimensions and margins of the diagram
    var margin = { top: 20, right: 20, bottom: 20, left: 20 },
        width = window.innerWidth - margin.left - margin.right,
        height = window.innerHeight - margin.top - margin.bottom;

    // Append the svg object to the body of the page
    var svg = d3.select("#tree").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Declare a tree layout and assign the size
    var treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    var nodes = d3.hierarchy(treeData, function(d) {
        return d.children;
    });

    // Map the nodes to the tree layout
    nodes = treemap(nodes);

    // Add links between nodes
    var link = svg.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function(d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        });

    // Add nodes
    var node = svg.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", function(d) { 
            return "node" + 
                (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")"; });

    // Add circles to the nodes
    node.append("circle")
        .attr("r", 15)  // Adjust size based on screen size
        .style("fill", "#fff")
        .style("stroke", "#000");

    // Add images to the nodes
    node.append("image")
        .attr("xlink:href", function(d) { return d.data.img; })
        .attr("x", -30)  // Adjust positioning
        .attr("y", -30)  // Adjust positioning
        .attr("width", 60)  // Adjust size
        .attr("height", 60)  // Adjust size
        .style("clip-path", "circle(50%)"); // Clip to circle shape

    // Add labels to the nodes
    node.append("text")
        .attr("dy", 40)
        .attr("x", 0)
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .text(function(d) { return d.data.name; });

    // Update tree layout on window resize
    window.addEventListener('resize', function() {
        width = window.innerWidth - margin.left - margin.right;
        height = window.innerHeight - margin.top - margin.bottom;

        svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        treemap.size([height, width]);
        nodes = d3.hierarchy(treeData, function(d) { return d.children; });
        nodes = treemap(nodes);

        svg.selectAll(".link")
            .data(nodes.descendants().slice(1))
            .attr("d", function(d) {
                return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
            });

        svg.selectAll(".node")
            .attr("transform", function(d) { 
                return "translate(" + d.y + "," + d.x + ")"; });

        svg.selectAll(".node circle")
            .attr("r", 15);

        svg.selectAll(".node image")
            .attr("x", -30)
            .attr("y", -30)
            .attr("width", 60)
            .attr("height", 60);

        svg.selectAll(".node text")
            .attr("dy", 40)
            .style("font-size", "12px");
    });
});
