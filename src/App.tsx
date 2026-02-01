import { useState } from 'react'

type FilterType = 'Agents' | 'Commands' | 'Settings' | 'Hooks' | 'MCPs' | 'Templates'

interface Template {
  id: number
  name: string
  description: string
  category: string
  type: FilterType
}

const templates: Template[] = [
  { id: 1, name: 'Hackathon AI Strategist', description: 'Use this agent when you need expert guidance on hackathon strategy, AI solution ideation, or evaluation of hackathon...', category: 'AI Specialists', type: 'Agents' },
  { id: 2, name: 'LLMs Maintainer', description: 'Use this agent when you need to generate or update the llms.txt file for AI crawler navigation. This includes: when b...', category: 'AI Specialists', type: 'Agents' },
  { id: 3, name: 'Prompt Engineer', description: 'Optimizes prompts for LLMs and AI systems. Use when building AI features, improving agent performance, or crafting sy...', category: 'AI Specialists', type: 'Agents' },
  { id: 4, name: 'Search Specialist', description: 'Expert web researcher using advanced search techniques and synthesis. Masters search operators, result filtering, and...', category: 'AI Specialists', type: 'Agents' },
  { id: 5, name: 'Task Decomposition Expert', description: 'Use this agent when you need to break down complex user goals into actionable tasks and identify the optimal combinat...', category: 'AI Specialists', type: 'Agents' },
  { id: 6, name: 'GraphQL Architect', description: 'Design GraphQL schemas, resolvers, and federation. Optimizes queries, solves N+1 problems, and implements subscriptio...', category: 'API GraphQL', type: 'Agents' },
  { id: 7, name: 'Business Analyst', description: 'Analyze metrics, create reports, and track KPIs. Builds dashboards, revenue models, and growth projections. Use PROAC...', category: 'Business Marketing', type: 'Agents' },
  { id: 8, name: 'Git Flow Manager', description: 'Manage complex git workflows, branching strategies, and merge conflicts. Implements conventional commits and automate...', category: 'Development Tools', type: 'Commands' },
  { id: 9, name: 'Code Review Assistant', description: 'Automated code review with best practices enforcement. Checks for security vulnerabilities, performance issues, and c...', category: 'Development Tools', type: 'Commands' },
  { id: 10, name: 'Docker Compose Setup', description: 'Generate Docker configurations for multi-container applications. Includes health checks, volume management, and netwo...', category: 'DevOps Infrastructure', type: 'Settings' },
  { id: 11, name: 'Pre-commit Validator', description: 'Run comprehensive checks before commits including linting, type checking, test execution, and security scanning...', category: 'Development Tools', type: 'Hooks' },
  { id: 12, name: 'Database MCP', description: 'Connect to PostgreSQL, MySQL, or SQLite databases. Execute queries, manage migrations, and visualize schema relation...', category: 'Database', type: 'MCPs' },
  { id: 13, name: 'Next.js Starter', description: 'Production-ready Next.js template with TypeScript, Tailwind CSS, authentication, and database integration pre-config...', category: 'Web Tools', type: 'Templates' },
  { id: 14, name: 'Python FastAPI', description: 'Modern Python API template with FastAPI, async support, Pydantic validation, and automatic OpenAPI documentation...', category: 'Web Tools', type: 'Templates' },
]

const filterCounts: Record<FilterType, number> = {
  'Agents': 102,
  'Commands': 159,
  'Settings': 51,
  'Hooks': 29,
  'MCPs': 25,
  'Templates': 14,
}

const filterIcons: Record<FilterType, string> = {
  'Agents': '🤖',
  'Commands': '⚡',
  'Settings': '⚙️',
  'Hooks': '🪝',
  'MCPs': '✨',
  'Templates': '📁',
}

const categories = [
  'All', 'AI Specialists', 'API GraphQL', 'Business Marketing', 'Data AI', 'Database',
  'Deep Research Team', 'Development Team', 'Development Tools', 'DevOps Infrastructure',
  'Documentation', 'Expert Advisors', 'FFmpeg Clip Team', 'Game Development', 'MCP Dev Team',
  'Modernization', 'Obsidian Ops Team', 'OCR Extraction Team', 'Performance Testing',
  'Podcast Creator Team', 'Programming Languages', 'Security', 'Web Tools'
]

function RobotIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="20" width="40" height="36" rx="4" fill="#2a2a2d" stroke="#e85a4f" strokeWidth="2"/>
      <rect x="20" y="8" width="24" height="16" rx="2" fill="#1a1a1d" stroke="#e85a4f" strokeWidth="2"/>
      <circle cx="26" cy="16" r="3" fill="#4ade80"/>
      <circle cx="38" cy="16" r="3" fill="#4ade80"/>
      <rect x="28" y="32" width="8" height="4" rx="1" fill="#6b7280"/>
      <rect x="20" y="40" width="24" height="8" rx="2" fill="#1a1a1d" stroke="#6b7280"/>
      <line x1="24" y1="44" x2="40" y2="44" stroke="#4ade80" strokeWidth="2" strokeLinecap="round"/>
      <rect x="4" y="28" width="8" height="16" rx="2" fill="#2a2a2d" stroke="#e85a4f"/>
      <rect x="52" y="28" width="8" height="16" rx="2" fill="#2a2a2d" stroke="#e85a4f"/>
      <line x1="32" y1="2" x2="32" y2="8" stroke="#f5a623" strokeWidth="2"/>
      <circle cx="32" cy="2" r="2" fill="#f5a623"/>
    </svg>
  )
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('Agents')
  const [activeCategory, setActiveCategory] = useState('All')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredTemplates = templates.filter(t => {
    const matchesType = t.type === activeFilter
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesCategory && matchesSearch
  })

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen noise-bg">
      <div className="scanline-overlay" />
      
      {/* Header */}
      <header className="relative pt-8 pb-6 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="pixel-font text-2xl sm:text-3xl md:text-4xl gradient-text tracking-wider mb-4 leading-relaxed">
            CLAUDE CODE TEMPLATES
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 glow-dot" />
            <span className="space-font">Ready-to-use configurations for your Claude Code projects</span>
          </div>
          
          {/* Nav Links */}
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <a href="#" className="px-4 py-2 rounded-lg bg-[#1a1a1d] border border-[#2a2a2d] hover:border-[#e85a4f] transition-colors flex items-center gap-2 text-sm">
              <span>◉</span> Claude Code
            </a>
            <a href="#" className="px-4 py-2 rounded-lg bg-[#1a1a1d] border border-[#2a2a2d] hover:border-[#e85a4f] transition-colors flex items-center gap-2 text-sm">
              <span>📄</span> Docs
            </a>
            <a href="#" className="px-4 py-2 rounded-lg bg-[#1a1a1d] border border-[#2a2a2d] hover:border-[#e85a4f] transition-colors flex items-center gap-2 text-sm">
              <span>⚡</span> GitHub
            </a>
          </div>
          
          {/* Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#e85a4f]/20 to-[#f5a623]/20 border border-[#e85a4f]/30 text-xs">
              downloads <span className="text-green-400 font-bold">2.1k</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#1a1a1d] border border-[#2a2a2d] text-xs">
              ⭐ Star <span className="font-bold">4.5k</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#1a1a1d] border border-[#2a2a2d] text-xs">
              ✨ Open in DeepGraph
            </span>
          </div>
        </div>
      </header>

      {/* Steps Section */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="step-card bg-[#131315] rounded-xl p-5 border border-[#2a2a2d] card-hover animate-fade-in">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-6 h-6 rounded-full bg-[#e85a4f]/20 text-[#e85a4f] flex items-center justify-center text-xs font-bold border border-[#e85a4f]/30">1</span>
              <div>
                <h3 className="font-semibold text-sm space-font">Install CLI Tool (Optional)</h3>
                <p className="text-xs text-gray-500 mt-1">Install globally or use npx directly</p>
              </div>
            </div>
            <div className="bg-[#0a0a0b] rounded-lg p-3 flex items-center justify-between group">
              <code className="text-xs text-gray-300">
                <span className="text-[#f5a623]">$</span> npm install -g claude-code-templates
              </code>
              <button
                onClick={() => handleCopy('npm install -g claude-code-templates', 'step1')}
                className="copy-btn px-2 py-1 rounded text-xs bg-[#2a2a2d] text-gray-400"
              >
                {copiedId === 'step1' ? '✓' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card bg-[#131315] rounded-xl p-5 border border-[#2a2a2d] card-hover animate-fade-in delay-100">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-6 h-6 rounded-full bg-[#e85a4f]/20 text-[#e85a4f] flex items-center justify-center text-xs font-bold border border-[#e85a4f]/30">2</span>
              <div>
                <h3 className="font-semibold text-sm space-font">Build Your Stack</h3>
                <p className="text-xs text-gray-500 mt-1">Combine agents, commands, MCPs, and settings</p>
              </div>
            </div>
            <div className="bg-[#0a0a0b] rounded-lg p-3">
              <code className="text-xs text-gray-300">
                <span className="text-gray-500">🛒</span> Add components to cart and generate install command
              </code>
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card bg-[#131315] rounded-xl p-5 border border-[#2a2a2d] card-hover animate-fade-in delay-200">
            <div className="flex items-start gap-3 mb-3">
              <span className="w-6 h-6 rounded-full bg-[#e85a4f]/20 text-[#e85a4f] flex items-center justify-center text-xs font-bold border border-[#e85a4f]/30">3</span>
              <div>
                <h3 className="font-semibold text-sm space-font">Start Coding</h3>
                <p className="text-xs text-gray-500 mt-1">Launch Claude Code with your components</p>
              </div>
            </div>
            <div className="bg-[#0a0a0b] rounded-lg p-3 flex items-center justify-between">
              <code className="text-xs text-gray-300">
                <span className="text-[#f5a623]">$</span> claude <span className="text-gray-500">// That's it! 🎉</span>
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl space-font font-semibold flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f5a623] glow-dot" style={{ color: '#f5a623' }} />
              <span className="gradient-text">Search</span>
              <span className="text-gray-400">(components/settings/templates)</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">└ Build your personalized development stack</p>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono">&gt;</div>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full bg-[#131315] border border-[#2a2a2d] rounded-xl py-4 pl-10 pr-12 text-sm focus:outline-none focus:border-[#e85a4f] transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-sm text-gray-500 mr-2">type:</span>
            {(Object.keys(filterCounts) as FilterType[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg border text-sm flex items-center gap-2 transition-all ${
                  activeFilter === filter
                    ? 'tab-active border-[#e85a4f] text-white'
                    : 'bg-[#1a1a1d] border-[#2a2a2d] text-gray-400 hover:border-[#e85a4f]/50'
                }`}
              >
                <span>{filterIcons[filter]}</span>
                <span>{filter}</span>
                <span className="badge-count px-1.5 py-0.5 rounded text-xs">({filterCounts[filter]})</span>
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <span className="text-sm text-gray-500 mr-2">category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-chip px-3 py-1 rounded-md border text-xs ${
                  activeCategory === cat
                    ? 'bg-[#e85a4f]/20 border-[#e85a4f] text-[#e85a4f]'
                    : 'bg-[#1a1a1d] border-[#2a2a2d] text-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Add New Card */}
            <div className="add-card rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] card-hover cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-[#e85a4f]/10 flex items-center justify-center mb-3 group-hover:bg-[#e85a4f]/20 transition-colors">
                <span className="text-[#e85a4f] text-2xl">+</span>
              </div>
              <h3 className="font-semibold text-sm space-font mb-1">Add New Agent</h3>
              <p className="text-xs text-gray-500 text-center">Create a new AI specialist agent</p>
            </div>

            {/* Template Cards */}
            {filteredTemplates.map((template, idx) => (
              <div
                key={template.id}
                className="bg-[#131315] rounded-xl p-5 border border-[#2a2a2d] card-hover animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#e85a4f]">{template.category}</span>
                  <RobotIcon className="w-8 h-8 robot-icon" />
                </div>
                <h3 className="font-semibold text-sm space-font mb-2 leading-tight">{template.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{template.description}</p>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-500">No templates found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-[#2a2a2d]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-600">
            Requested by <a href="https://twitter.com/AhmedY20596" className="text-gray-500 hover:text-[#e85a4f] transition-colors">@AhmedY20596</a> · Built by <a href="https://twitter.com/clonkbot" className="text-gray-500 hover:text-[#e85a4f] transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App