import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, CornerDownLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  placeholder = 'Ask ShopFlow anything...',
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSendMessage(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center bg-white dark:bg-surface-darkCard border border-slate-300 dark:border-surface-darkBorder rounded-2xl shadow-lg dark:shadow-brand-950/20 focus-within:border-brand-500 dark:focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all p-1.5 sm:p-2">
        {/* Attachment icon (visual per backend spec) */}
        <button
          type="button"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          title="Attach order document or image (Available soon)"
          aria-label="Attach file"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
        />

        {/* Send Button */}
        <Button
          type="submit"
          variant="glow"
          size="sm"
          disabled={!text.trim() || isLoading}
          className="shrink-0 px-3.5"
          aria-label="Send message"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="hidden sm:inline text-xs font-semibold">Send</span>
              <Send className="w-3.5 h-3.5" />
            </div>
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between px-3 pt-2 text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-500" />
          Powered by ShopFlow AI &amp; n8n Automation Engine
        </span>
        <span className="hidden sm:inline-flex items-center gap-1">
          Press <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-[10px]">Enter</kbd> to submit
        </span>
      </div>
    </form>
  );
};
