'use client';

import React, { useState, useEffect } from 'react';
import { useLLMStats } from '@/store/useLLMStats';
import { usePromptStore } from '@/store/usePromptStore';
import { useContextProvider } from '@/store/useContextProvider';
// import { countTokens } from '@/lib/tokenizer';

import { PromptEditor } from './PromptEditor';
import { ParameterControls } from './ParameterControls';
import { FeedbackControls } from './FeedbackControls';

export const LLMControls = () => {
  const { config, updateConfig, setVariables: setLLMStatsVariables, setExamples: setLLMStatsExamples, addFeedback } = useLLMStats();
  const { context } = useContextProvider();
  const {
    prompt, setPrompt,
    systemPrompt, setSystemPrompt,
    variables, setVariables,
    examples, setExamples,
    markConfigUpdated
  } = usePromptStore();

  // const [tokens, setTokens] = useState(0);
  const [saveMsg, setSaveMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'prompt' | 'params' | 'feedback'>('prompt');

  useEffect(() => {
    const savedPrompt = localStorage.getItem('prompt');
    const savedSystemPrompt = localStorage.getItem('systemPrompt');
    const savedVariables = localStorage.getItem('variables');
    const savedExamples = localStorage.getItem('examples');
    if (savedPrompt) setPrompt(savedPrompt);
    if (savedSystemPrompt) setSystemPrompt(savedSystemPrompt);
    if (savedVariables) setVariables(JSON.parse(savedVariables));
    if (savedExamples) setExamples(JSON.parse(savedExamples));
  }, [setPrompt, setSystemPrompt, setVariables, setExamples]); // Added missing dependencies

  // useEffect(() => {
  //   const calculateTokens = async () => {
  //     const fullPrompt = `${systemPrompt}\n${prompt}\n${examples.map(e => e.input + e.output).join('\n')}`;
  //     const tokenCount = await countTokens(fullPrompt);
  //     setTokens(tokenCount);
  //   };
  //   calculateTokens();
  // }, [prompt, systemPrompt, examples]);

  useEffect(() => {
    setLLMStatsVariables(variables);
    setLLMStatsExamples(examples);
  }, [variables, examples, setLLMStatsVariables, setLLMStatsExamples]); // Added missing dependencies

  const handleSave = () => {
    localStorage.setItem('prompt', prompt);
    localStorage.setItem('systemPrompt', systemPrompt);
    localStorage.setItem('variables', JSON.stringify(variables));
    localStorage.setItem('examples', JSON.stringify(examples));
    setSaveMsg('✅ All settings saved');
    markConfigUpdated();
    setTimeout(() => setSaveMsg(''), 1500);
  };

  const addVariable = () => {
    const newVar = { name: `var${variables.length + 1}`, value: '' };
    setVariables([...variables, newVar]);
    setPrompt(`${prompt} {{${newVar.name}}}`);
  };

  const addExample = () => {
    setExamples([...examples, { input: '', output: '' }]);
  };

  return (
    <div className="bg-black/80 text-primary rounded-xl shadow-xl p-4 text-xs z-50 backdrop-blur-md border border-white/20 w-[320px] max-h-[90vh] overflow-y-auto">
      <div className="flex gap-2 mb-4 text-secondary">
        <button
          className={`px-3 py-1 rounded ${activeTab === 'prompt' ? 'bg-primary' : 'bg-gray-700 text-white'}`}
          onClick={() => setActiveTab('prompt')}
        >
          Prompt
        </button>
        <button
          className={`px-3 py-1 rounded  ${activeTab === 'params' ? 'bg-primary ' : 'bg-gray-700 text-white'}`}
          onClick={() => setActiveTab('params')}
        >
          Parameters
        </button>
        <button
          className={`px-3 py-1 rounded ${activeTab === 'feedback' ? 'bg-primary' : 'bg-gray-700 text-white'}`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </div>

      {activeTab === 'prompt' && (
        <PromptEditor
          prompt={prompt}
          setPrompt={setPrompt}
          systemPrompt={systemPrompt}
          setSystemPrompt={setSystemPrompt}
          variables={variables}
          setVariables={setVariables}
          examples={examples}
          setExamples={setExamples}
          addVariable={addVariable}
          addExample={addExample}
          contextTitle={context?.title}
          contextContent={context?.content}
        />
      )}

      {activeTab === 'params' && (
        <ParameterControls config={config} updateConfig={updateConfig} />
      )}

      {activeTab === 'feedback' && <FeedbackControls addFeedback={addFeedback} />}

      <div className="mt-4 border-t border-white/10 pt-4">
        {/*<div className="flex justify-between items-center mb-2">
          <span className="text-gray-400">Estimated Tokens:</span>
          <span className="font-mono">{tokens}</span>
        </div>*/}
        <button
          onClick={handleSave}
          className="w-full bg-primary/90 hover:bg-primary text-secondary px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          💾 Save Configuration
        </button>
        {saveMsg && <div className="text-center text-green-400 text-xs mt-2">{saveMsg}</div>}
      </div>
    </div>
  );
};