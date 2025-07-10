'use client';

import React from 'react';
import { LLMConfig } from '@/types/llmconfig'; 

interface ParameterControlsProps {
    config: LLMConfig;
    updateConfig: (newConfig: Partial<LLMConfig>) => void;
}

export function ParameterControls({ config, updateConfig }: ParameterControlsProps) {
    return (
        <div className="space-y-4 text-white">
            <div className="bg-gray-800 p-4 rounded">
                <h4 className="font-semibold mb-3">Response Controls</h4>
                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-white">Model Selection</label>
                        <select
                            value={config.model}
                            onChange={(e) => updateConfig({ model: e.target.value })}
                            className="w-full p-2 rounded border bg-background text-primary"
                        >
                            <option value="gpt-4o">GPT-4o (Best Quality)</option>
                            <option value="gpt-4-turbo">GPT-4 Turbo</option>
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Fastest)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">
                            Temperature: {config.temperature}
                            <span className="ml-2 text-gray-400">
                                {config.temperature < 0.5
                                    ? 'Precise'
                                    : config.temperature < 1.2
                                    ? 'Balanced'
                                    : 'Creative'}
                            </span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={config.temperature}
                            onChange={(e) => updateConfig({ temperature: Number(e.target.value) })}
                            className="w-full"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Max Tokens</label>
                            <input
                                type="number"
                                value={config.maxTokens}
                                onChange={(e) => updateConfig({ maxTokens: Number(e.target.value) })}
                                className="w-full p-2 rounded border bg-background text-primary"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Top-P</label>
                            <input
                                type="number"
                                step="0.05"
                                value={config.topP}
                                onChange={(e) => updateConfig({ topP: Number(e.target.value) })}
                                className="w-full p-2 rounded border bg-background text-primary"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 p-4 rounded">
                <h4 className="font-semibold mb-3">Advanced Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Frequency Penalty</label>
                        <input
                            type="number"
                            step="0.1"
                            value={config.frequencyPenalty ?? 0}
                            onChange={(e) => updateConfig({ frequencyPenalty: Number(e.target.value) })}
                            className="w-full p-2 rounded border bg-background text-primary"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Presence Penalty</label>
                        <input
                            type="number"
                            step="0.1"
                            value={config.presencePenalty ?? 0}
                            onChange={(e) => updateConfig({ presencePenalty: Number(e.target.value) })}
                            className="w-full p-2 rounded border bg-background text-primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
