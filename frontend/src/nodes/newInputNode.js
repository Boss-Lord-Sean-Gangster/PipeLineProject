// inputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from '../BaseNode';

export const NewInputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
    key={id} // Ensures React treats it as a new component if `id` changes
    id={id}
    label="NewInput"
    inputProps={{
      label: "Name:",
      value: currName,
      onChange: handleNameChange,
    }}
    dropdownProps={{
      label: "Type:",
      value: inputType,
      onChange: handleTypeChange,
      options: [
        { label: "Text", value: "Text" },
        { label: "File", value: "File" },
      ],
    }}
    handles={[
        { type: 'source', position: Position.Right, id: `${id}-source` },
    ]}
  />
  );
}
