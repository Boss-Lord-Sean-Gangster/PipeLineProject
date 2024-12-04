import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from '../BaseNode';

export const NewTextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([{ id: `${id}-value`, type: 'source', position: Position.Right }]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);

    // Get the list of variables in the new text
    const variables = newText.match(/\{\{([^}]+)\}\}/g) || [];

    // Extract variable names from the match results (removing '{{' and '}}')
    const variableNames = variables.map(variable => variable.slice(2, -2));

    // Create new handles for the current variables
    let newHandles = [...handles];

    // Add new handles for any variables that are not already present
    variableNames.forEach((variableName) => {
      const handleId = `${id}-${variableName}`;
      if (!newHandles.some((handle) => handle.id === handleId)) {
        newHandles.push({ id: handleId, type: 'target', position: Position.Left });
      }
    });

    // Remove handles that are no longer present in the text
    newHandles = newHandles.filter((handle) => {
      const handleVariableName = handle.id.slice(id.length + 1); // Extract variable part of the ID
      return variableNames.includes(handleVariableName);
    });

    // Add the main handle for the node itself
    newHandles.push({ id: `${id}-value`, type: 'source', position: Position.Right });

    // Update the handles state
    setHandles(newHandles);
  };

  return (
    <BaseNode
      key={id} 
      id={id}
      label="Text"
      inputProps={{
        label: "Text:",
        value: currText,
        onChange: handleTextChange,
      }}
      dropdownProps={{}}
      handles={handles}
    />
  );
};
