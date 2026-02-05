"use client";

import { useChat } from "@ai-sdk/react";

export function ResearchChat() {
  const { messages, input, handleSubmit, handleInputChange, isLoading, error } =
    useChat({
      api: "/api/research",
    });

  return (
    <div className="flex flex-col h-[70vh] border border-gray-200 rounded-xl bg-white shadow-sm">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Enter a research topic to get started
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-md"
                  : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}
            >
              <div className="text-[11px] font-medium opacity-60 mb-1">
                {m.role === "user" ? "You" : "Research Agent"}
              </div>
              <div className="whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}

        {isLoading && messages.at(-1)?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.15s" }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>●</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-4 mb-2 px-3 py-2 bg-red-50 text-red-600 text-xs rounded-lg">
          {error.message}
        </div>
      )}

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-100 p-4 flex gap-2"
      >
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Enter a research topic..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? "Researching..." : "Research"}
        </button>
      </form>
    </div>
  );
}
