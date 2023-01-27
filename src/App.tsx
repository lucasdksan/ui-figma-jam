import { useCallback } from "react";
import * as Toolbar from '@radix-ui/react-toolbar';
import ReactFlow, { addEdge, Background, Connection, ConnectionMode, Controls, Node, useEdgesState, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import DefaultEdge from "./components/edges/DefaultEdge";
import Square from "./components/nodes/Square";

const NODE_TYPES = {
  square: Square,
}

const EDGES_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 200,
      y: 400,
    },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 1000,
      y: 400,
    },
    data: {}
  }
] satisfies Node[];

function App() {
  const [ edges, setEdges, onEdgesChange ] = useEdgesState([]);
  const [ nodes, setNodes, onNodesChange ] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection)=>{
    return setEdges(edges => addEdge(connection, edges))
  }, []);

  const addSquareNode = () => {
    setNodes((nodes)=>(
      [
        ...nodes,
        {
          id: crypto.randomUUID(),
          type: "square",
          position: {
            x: 1500,
            y: 400,
          },
          data: {}
        }
      ]
    ));

  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow 
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGES_TYPES}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: "default"
        }}
      >
        <Background
          gap={12}
          size={2}
          color="#4C1D95"
        />
        <Controls />
      </ReactFlow>
      <Toolbar.Root 
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden"
      >
        <Toolbar.Button 
          className="w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-2"
          onClick={addSquareNode}
        />
      </Toolbar.Root>
    </div>
  )
}

export default App;
