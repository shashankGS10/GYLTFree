'use client';

import { useLLMStats } from '@/store/useLLMStats';
import { useState } from 'react';
import { Ruler, Cpu, DollarSign } from 'lucide-react';

export const LLMFloatingStats = () => {
  const { stats, config } = useLLMStats();
  const [open, setOpen] = useState(true);

  return (
    <div
      className="bg-black/80 text-white rounded-xl shadow-xl p-4 text-xs z-50 backdrop-blur-md border border-white/20 hover:scale-[1.01] transition cursor-move"
      draggable
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-sm text-purple-300">LLM Stats</span>
        <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-white">
          {open ? '−' : '+'}
        </button>
      </div>

      {open && (
        <div className="grid gap-1">
          <div className="flex justify-between">
            <span>Model:</span>
            <span>{config.model}</span>
          </div>
          <div className="flex justify-between">
            <span><Cpu className="inline w-3 h-3 mr-1" />Prompt:</span>
            <span>{stats.promptTokens} tkns</span>
          </div>
          <div className="flex justify-between">
            <span><Cpu className="inline w-3 h-3 mr-1" />Completion:</span>
            <span>{stats.completionTokens} tkns</span>
          </div>
          <div className="flex justify-between">
            <span><Cpu className="inline w-3 h-3 mr-1" />Total:</span>
            <span>{stats.totalTokens} tkns</span>
          </div>
          <div className="flex justify-between">
            <span><Ruler className="inline w-3 h-3 mr-1" />Temperature:</span>
            <span>{config.temperature}</span>
          </div>
          <div className="flex justify-between">
            <span><Ruler className="inline w-3 h-3 mr-1" />Top-p:</span>
            <span>{config.topP}</span>
          </div>
          <div className="flex justify-between">
            <span><DollarSign className="inline w-3 h-3 mr-1" />Est. Cost:</span>
            <span>${stats.estimatedCostUSD}</span>
          </div>
        </div>
      )}
    </div>
  );
};
