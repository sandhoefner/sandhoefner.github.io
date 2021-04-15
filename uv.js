/*
https://uv.willyweather.com/ca/orange-county/stanton.html
*/

console.log(ww.data.graphs[0].graph.data.forecastGraphs);

// not sure if right days etc

light = console.log(ww.data.graphs[0].graph.data.forecastGraphs.sunrisesunset.dataConfig.series.groups[0]);
console.log(light);

uv = ww.data.graphs[0].graph.data.forecastGraphs.uv.dataConfig.series.groups[0].points;
console.log(uv);

/*
var timestamp = 1617840000 * 1000;
console.log(new Date(timestamp).toTimeString());
console.log(new Date(timestamp).toLocaleTimeString());
*/