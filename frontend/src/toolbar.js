// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type = 'newInput' label='New Input' />
                <DraggableNode type = 'newOutput' label='New Output' />
                <DraggableNode type = 'newLlm' label='New LLM' />
                <DraggableNode type = 'newText' label='New Text' />
            </div>
        </div>
    );
};
