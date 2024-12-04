// llmNode.js

import { Handle, Position } from 'reactflow';
import { BaseNode } from '../BaseNode';

export const NewLLMNode = ({ id, data }) => {

  return (
<BaseNode
  key={id} 
  id={id}
  label="LLM"
  inputProps={{}}
  dropdownProps={{}}
  additionalContent='This is a LLM.'
  handles={[
    { id: `${id}-system`, type: 'target', position: Position.Left },
    { id: `${id}-prompt`, type: 'target', position: Position.Left },
    { id: `${id}-response`, type: 'source', position: Position.Right },
  ]}
/>
  );
}
