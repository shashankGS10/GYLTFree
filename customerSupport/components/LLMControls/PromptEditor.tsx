'use client';

import React from 'react';

interface PromptEditorProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    systemPrompt: string;
    setSystemPrompt: (systemPrompt: string) => void;
    variables: { name: string; value: string }[];
    setVariables: (vars: { name: string; value: string }[]) => void;
    examples: { input: string; output: string }[];
    setExamples: (examples: { input: string; output: string }[]) => void;
    addVariable: () => void;
    addExample: () => void;
    contextTitle?: string;
    contextContent?: string;
}

export const PromptEditor: React.FC<PromptEditorProps> = ({
    prompt,
    setPrompt,
    systemPrompt,
    setSystemPrompt,
    variables,
    setVariables,
    examples,
    setExamples,
    addVariable,
    addExample,
    contextTitle = 'Smart Support Bot',
    contextContent = 'No specific context provided...',
}) => {
    return (
        <>
            <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Support Context</h4>
                <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm">{contextTitle}</p>
                    <p className="text-gray-400 text-xs mt-1">
                        {contextContent.slice(0, 100)}
                    </p>
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-white font-semibold">System Prompt</label>
                <textarea
                    className="w-full p-2 rounded border bg-background text-primary"
                    rows={2}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="You are a helpful assistant..."
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 text-white font-semibold">Prompt Editor</label>
                <textarea
                    className="w-full p-2 rounded border bg-background text-primary"
                    rows={6}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                />
                <div className="flex gap-2 text-white mt-2">
                    <button
                        onClick={addVariable}
                        className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                    >
                        + Variable
                    </button>
                    <button
                        onClick={addExample}
                        className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                    >
                        + Example
                    </button>
                </div>
                <div className="mt-2 space-y-2 text-white">
                    {variables.map((variable, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                value={variable.name}
                                onChange={(e) => {
                                    const newVars = [...variables];
                                    newVars[index].name = e.target.value;
                                    setVariables(newVars);
                                }}
                                className="w-1/2 p-1 rounded border bg-gray-800"
                                placeholder="Variable name"
                            />
                            <input
                                type="text"
                                value={variable.value}
                                onChange={(e) => {
                                    const newVars = [...variables];
                                    newVars[index].value = e.target.value;
                                    setVariables(newVars);
                                }}
                                className="w-1/2 p-1 rounded border bg-gray-800"
                                placeholder="Default value"
                            />
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-white">
                    <h4 className="font-semibold mb-2">Few-shot Examples</h4>
                    {examples.map((example, index) => (
                        <div key={index} className="mb-2 p-2 bg-gray-800 rounded">
                            <input
                                type="text"
                                value={example.input}
                                onChange={(e) => {
                                    const newExamples = [...examples];
                                    newExamples[index].input = e.target.value;
                                    setExamples(newExamples);
                                }}
                                className="w-full mb-1 p-1 rounded border bg-gray-900"
                                placeholder="Example input"
                            />
                            <input
                                type="text"
                                value={example.output}
                                onChange={(e) => {
                                    const newExamples = [...examples];
                                    newExamples[index].output = e.target.value;
                                    setExamples(newExamples);
                                }}
                                className="w-full p-1 rounded border bg-gray-900"
                                placeholder="Desired output"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
