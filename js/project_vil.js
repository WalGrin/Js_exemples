const roads = [
    "Дом Алисы-Дом Боба", "Дом Алисы-Почта", "Дом Дарии-Дом Эрни", "Дом Эрни-дом Греты", "Дом Греты-Магазин", "Рынок-Почта", "Рынок-Ратуша",
    "Дом Алисы-Склад", "Дом Боба-Ратуша", "Дом Дарии-Ратуша", "Дом Греты-Ферма", "Рынок-Ферма", "Рынок-Магазин", "Магазин-Ратуша"
];

function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    for(let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);
