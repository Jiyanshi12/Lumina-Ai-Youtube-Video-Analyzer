import React, { useState } from 'react';
import { Network, Sparkles, Info, Layers } from 'lucide-react';
import { KnowledgeGraph, GraphNode } from '../../types';

interface KnowledgeGraphTabProps {
  graph: KnowledgeGraph;
}

export default function KnowledgeGraphTab({ graph }: KnowledgeGraphTabProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(graph.nodes[0] || null);

  if (!graph || !graph.nodes || graph.nodes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
        <Network className="h-8 w-8 mx-auto text-slate-400 mb-2" />
        <p className="text-sm">Knowledge graph node map generating...</p>
      </div>
    );
  }

  // Pre-calculate positions for visual SVG layout in a circle/grid arrangement
  const nodeCount = graph.nodes.length;
  const radius = 130;
  const centerX = 240;
  const centerY = 180;

  const nodePositions = graph.nodes.map((node, i) => {
    const angle = (i / nodeCount) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { ...node, x, y };
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Network className="h-4 w-4 text-indigo-600" />
          Interactive Concept Knowledge Graph
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Click any node to reveal concept relationships, dependencies, and core insights</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Interactive Canvas Graph */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden shadow-sm">
          <svg className="w-full h-80 max-w-lg" viewBox="0 0 480 360">
            {/* Edge Lines */}
            {graph.edges.map((edge, idx) => {
              const sourcePos = nodePositions.find((n) => n.id === edge.source) || nodePositions[0];
              const targetPos = nodePositions.find((n) => n.id === edge.target) || nodePositions[1];

              return (
                <g key={idx}>
                  <line
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetPos.x}
                    y2={targetPos.y}
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  {/* Label on line */}
                  <text
                    x={(sourcePos.x + targetPos.x) / 2}
                    y={(sourcePos.y + targetPos.y) / 2 - 4}
                    fill="#64748b"
                    fontSize="9"
                    textAnchor="middle"
                    className="font-mono font-medium"
                  >
                    {edge.relationship}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {nodePositions.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? 26 : 22}
                    className={`transition-all duration-300 ${
                      isSelected
                        ? 'fill-indigo-600 stroke-indigo-900 stroke-2 shadow-lg'
                        : 'fill-slate-100 stroke-indigo-400 stroke-2 hover:fill-indigo-50'
                    }`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    fill={isSelected ? '#ffffff' : '#1e293b'}
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {node.label.length > 12 ? `${node.label.slice(0, 10)}..` : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Details Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 flex flex-col justify-between shadow-sm">
          {selectedNode ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                  {selectedNode.category}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase ${
                    selectedNode.importance === 'high' ? 'text-indigo-700' : 'text-slate-500'
                  }`}
                >
                  {selectedNode.importance} priority
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">{selectedNode.label}</h4>
              <p className="text-xs text-slate-700 leading-relaxed">{selectedNode.details}</p>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Connected Relationships:
                </span>
                {graph.edges
                  .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                  .map((e, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                      <Layers className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                      <span className="font-semibold text-slate-900">{e.source}</span>
                      <span className="text-[10px] text-slate-500 font-mono">[{e.relationship}]</span>
                      <span className="font-semibold text-slate-900">{e.target}</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-10">Click a concept node on the left to inspect properties.</p>
          )}

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 flex items-center gap-2">
            <Info className="h-4 w-4 text-indigo-600 shrink-0" />
            Knowledge maps automatically link topics across videos in your library.
          </div>
        </div>
      </div>
    </div>
  );
}
