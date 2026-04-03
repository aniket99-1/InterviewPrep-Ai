import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;
  return (
    <div className="w-full max-w-none">
      <div className="text-gray-800 dark:text-gray-200 space-y-4 leading-relaxed font-inter">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "plaintext";
              const isInline = !className;

              return !isInline ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              ) : (
                <code
                  className="px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-mono text-sm border border-indigo-100 dark:border-indigo-800/50"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{children}</p>;
            },
            strong({ children }) {
              return <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>;
            },
            em({ children }) {
              return <em className="italic text-gray-800 dark:text-gray-200">{children}</em>;
            },
            ul({ children }) {
              return <ul className="list-disc list-outside ml-5 mb-4 text-gray-700 dark:text-gray-300 space-y-2 marker:text-indigo-500">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal list-outside ml-5 mb-4 text-gray-700 dark:text-gray-300 space-y-2 marker:text-indigo-500 font-semibold">{children}</ol>;
            },
            li({ children }) {
              return <li className="pl-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 italic text-gray-600 dark:text-gray-400 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-r-lg">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 tracking-tight">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 tracking-tight border-b border-gray-200 dark:border-gray-800 pb-2">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 mt-6">{children}</h3>;
            },
            h4({ children }) {
              return <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2 mt-4">{children}</h4>;
            },
            a({ children, href }) {
              return (
                <a 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium underline underline-offset-4 decoration-indigo-200 dark:decoration-indigo-800 hover:decoration-indigo-600 dark:hover:decoration-indigo-400 transition-all duration-200"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto mb-6 my-6 ring-1 ring-gray-200 dark:ring-gray-800 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-sm">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-50/50 dark:bg-gray-800/50">{children}</thead>;
            },
            tbody({ children }) {
              return <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">{children}</tbody>;
            },
            tr({ children }) {
              return <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors duration-150">{children}</tr>;
            },
            th({ children }) {
              return <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">{children}</th>;
            },
            td({ children }) {
              return <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">{children}</td>;
            },
            hr() {
              return <hr className="my-8 border-gray-200 dark:border-gray-800" />;
            },
            img({ src, alt }) {
              return <img src={src} alt={alt} className="max-w-full h-auto rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 my-4" />;
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-[#FAFAFA] dark:bg-gray-900 shadow-sm transition-all duration-200 group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <LuCode size={16} className="text-indigo-500 dark:text-indigo-400 opacity-80" />
          <span className="text-xs font-semibold uppercase tracking-wider font-mono">{language || "Code"}</span>
        </div>

        <button 
          onClick={copyCode} 
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" 
          aria-label={"Copy code"}
        >
          {copied ? (
            <LuCheck size={14} className="text-emerald-500" />
          ) : (
            <LuCopy size={14} className="opacity-70 group-hover:opacity-100" />
          )}
          <span className={copied ? "text-emerald-500" : "opacity-0 group-hover:opacity-100 transition-opacity duration-200"}>
            {copied ? "Copied!" : "Copy"}
          </span>
        </button>
      </div>
      <div className="relative">
        <SyntaxHighLighter
          language={language}
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.6",
            overflowX: "auto",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          }}
        >
          {code}
        </SyntaxHighLighter>
      </div>
    </div>
  );
}

export default AIResponsePreview;
