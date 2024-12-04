// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from '../BaseNode';

export const NewOutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
   <BaseNode
    key={id} 
    id={id}
    label="Output"
    inputProps={{
      label: "Name:",
      value: currName,
      onChange: handleNameChange,
    }}
    dropdownProps={{
      label: "Type:",
      value: outputType,
      onChange: handleTypeChange,
      options: [
        { label: "Text", value: "Text" },
        { label: "Image", value: "Image" },
      ],
    }}
    handles={[
        { type: 'target', position: Position.Left, id: `${id}-target` },
    ]}
      />
  );
}
