from fastapi import FastAPI, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Any, Dict

app = FastAPI()

class Node(BaseModel):
    id: str
    type: str
    position: dict
    data: Any

class Edge(BaseModel):
    source: str
    target: str

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def getting():
    return {"Ping":"Pong"}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Dict[str, List[Any]]):
    nodes = pipeline.get("nodes",[])
    edges = pipeline.get("edges",[])
    num_nodes = len(nodes)
    num_edges = len(edges)

    return {"num_nodes": num_nodes, "num_edges": num_edges}
