import { Handle } from "reactflow";

export const BaseNode = ({
  id,
  label,
  inputProps = {},
  dropdownProps = {},
  handles = [],
  additionalContent = "",
}) => {
  const {
    label: inputLabel = "",
    value: inputValue = "",
    onChange: inputOnChange = () => {},
  } = inputProps;

  const {
    label: dropdownLabel = "",
    value: dropdownValue = "",
    onChange: dropdownOnChange = () => {},
    options = [],
  } = dropdownProps;

  // Group handles by position (left or right)
  const leftHandles = handles.filter((handle) => handle.position === "left");
  const rightHandles = handles.filter((handle) => handle.position === "right");

  // Calculate the height based on the number of handles
  const getHandlesHeight = (handlesArray) => {
    return handlesArray.length > 0 ? 50 + handlesArray.length * 24 : 50; // Base height + 24px per handle
  };

  const leftHandlesHeight = getHandlesHeight(leftHandles);
  const rightHandlesHeight = getHandlesHeight(rightHandles);

  // Dynamically calculate height of the node
  const nodeHeight = Math.max(leftHandlesHeight, rightHandlesHeight) + 100; // Add space for content

  // Calculate the width based on the textarea length, with a max width
  const getTextAreaWidth = (inputValue) => {
    // Each character contributes roughly 10px, adjust as needed
    return `calc(100% + ${Math.max(inputValue.length * 10, 0)}px)`;
  };

  // Calculate height of textarea based on rows and content
  const getTextAreaHeight = (inputValue) => {
    const rowHeight = 24; // Height of a single row (can be adjusted)
    const lines = Math.ceil(inputValue.length / 30); // Approximate number of lines based on characters
    return lines * rowHeight;
  };

  return (
    <div
      className="relative min-w-52 min-h-36 border border-gray-300 rounded-lg shadow-md p-4 bg-white flex flex-col gap-4"
      style={{
        height: `${nodeHeight + getTextAreaHeight(inputValue)}px`, // Adjust height for content and handles
        width: `${Math.max(500, getTextAreaWidth(inputValue))}`, // Max width is 500px
      }}
    >
      {/* Node Label */}
      <div className="font-bold text-lg text-gray-800">{label}</div>

      {/* Input Section */}
      {(inputLabel || inputValue) && (
        <div className="flex flex-col gap-1">
          {inputLabel && <label className="text-sm text-gray-600">{inputLabel}</label>}
          <textarea
            value={inputValue}
            onChange={inputOnChange}
            rows={1}
            className="resize-none p-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              width: ` ${Math.max(inputValue.length * 10, 0)}px`,
              maxWidth: "300px", // Max width of the textarea
              minWidth: "200px", // Minimum width of the textarea
              height: `${getTextAreaHeight(inputValue)}px`, // Dynamic height for the textarea
            }}
          />
        </div>
      )}

      {/* Dropdown Section */}
      {(dropdownLabel || dropdownValue || options.length > 0) && (
        <div className="flex flex-col gap-1">
          {dropdownLabel && <label className="text-sm text-gray-600">{dropdownLabel}</label>}
          <select
            value={dropdownValue}
            onChange={dropdownOnChange}
            className="p-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Custom Additional Content */}
      {additionalContent}

      {/* Handles: Stacked Vertically with Absolute Positioning */}
      <div className=" top-0 left-0 right-0 bottom-0 flex justify-between">
        {/* Left Handles */}
        <div className="flex flex-col gap-2 absolute left-0 top-2">
          {leftHandles.map((handle, index) => (
            <Handle
              key={handle.id}
              type={handle.type}
              position={handle.position}
              id={handle.id}
              className="w-2 h-2 bg-blue-500 border-white border-2 rounded-full"
              style={{ top: `${index * 24}px` }} // Adds spacing between handles
            />
          ))}
        </div>

        {/* Right Handles */}
        <div className="flex flex-col gap-2 right-0 top-2">
          {rightHandles.map((handle, index) => (
            <Handle
              key={handle.id}
              type={handle.type}
              position={handle.position}
              id={handle.id}
              className="w-2 h-2 bg-blue-500 border-white border-2 rounded-full"
              style={{ top: `${index * 24}px` }} // Adds spacing between handles
            />
          ))}
        </div>
      </div>
    </div>
  );
};
