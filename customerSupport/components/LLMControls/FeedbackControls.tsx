'use client';

import React, { useState } from 'react';

interface FeedbackControlsProps {
  addFeedback: (feedback: { helpfulness: number; clarity: number; accuracy: number; notes: string }) => void;
}

export function FeedbackControls({ addFeedback }: FeedbackControlsProps) {
  const [helpfulness, setHelpfulness] = useState(3);
  const [clarity, setClarity] = useState(3);
  const [accuracy, setAccuracy] = useState(3);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    addFeedback({ helpfulness, clarity, accuracy, notes });
    setNotes('');
  };

  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded">
      <h4 className="font-semibold mb-2">Provide Feedback</h4>
      <label className="block">
        Helpfulness: {helpfulness}
        <input
          type="range"
          min="1"
          max="5"
          value={helpfulness}
          onChange={(e) => setHelpfulness(Number(e.target.value))}
          className="w-full"
        />
      </label>
      <label className="block">
        Clarity: {clarity}
        <input
          type="range"
          min="1"
          max="5"
          value={clarity}
          onChange={(e) => setClarity(Number(e.target.value))}
          className="w-full"
        />
      </label>
      <label className="block">
        Accuracy: {accuracy}
        <input
          type="range"
          min="1"
          max="5"
          value={accuracy}
          onChange={(e) => setAccuracy(Number(e.target.value))}
          className="w-full"
        />
      </label>
      <label className="block">
        Notes:
        <textarea
          className="w-full p-2 rounded border bg-background text-white"
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional comments..."
        />
      </label>
      <button
        onClick={handleSubmit}
        className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition"
      >
        Submit Feedback
      </button>
    </div>
  );
}
