export const isDAG = (nodes, edges) => {
    // Create an adjacency list
    const adjList = new Map();
    nodes.forEach((node) => adjList.set(node.id, []));
  
    // Populate adjacency list with edges
    edges.forEach((edge) => {
      if (adjList.has(edge.source)) {
        adjList.get(edge.source).push(edge.target);
      }
    });
  
    // Helper function for DFS cycle detection
    const visitNode = (node, visited, recursionStack) => {
      // Mark the node as visited
      visited[node] = true;
      recursionStack[node] = true;
  
      // Traverse all neighbors
      for (const neighbor of adjList.get(node) || []) {
        if (!visited[neighbor] && visitNode(neighbor, visited, recursionStack)) {
          return true; // Cycle detected
        } else if (recursionStack[neighbor]) {
          return true; // Back edge detected
        }
      }
  
      recursionStack[node] = false; // Remove from recursion stack
      return false;
    };
  
    // Initialize visited and recursion stack
    const visited = {};
    const recursionStack = {};
  
    for (const node of nodes) {
      if (!visited[node.id]) {
        if (visitNode(node.id, visited, recursionStack)) {
          return false; // Not a DAG
        }
      }
    }
  
    return true; // DAG
  };
  