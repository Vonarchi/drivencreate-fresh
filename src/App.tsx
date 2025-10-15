import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import { MessageSquare, FileText, Layout, Mic, Image, Edit3, ShoppingBag, BookOpen, Settings } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('chat')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const menuItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'docs', icon: FileText, label: 'Docs' },
    { id: 'pages', icon: Layout, label: 'Pages' },
    { id: 'audio', icon: Mic, label: 'Audio' },
    { id: 'image', icon: Image, label: 'Images' },
    { id: 'editorial', icon: Edit3, label: 'Editorial' },
    { id: 'storefront', icon: ShoppingBag, label: 'Store' },
    { id: 'library', icon: BookOpen, label: 'Library' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return <Auth />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Drive N Create</h1>
              <p className="text-xs text-gray-400">Voice-First Platform</p>
            </div>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6">
            {menuItems.find((item) => item.id === activeSection)?.label}
          </h2>

          <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 mb-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">🚀 Welcome!</h3>
              <p className="text-gray-400">
                Your AI-powered content creation platform is ready. Features coming soon!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.slice(0, 6).map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`p-6 rounded-xl border transition-all ${
                      activeSection === item.id
                        ? 'bg-cyan-500/10 border-cyan-500'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mb-3 ${
                        activeSection === item.id ? 'text-cyan-400' : 'text-gray-400'
                      }`}
                    />
                    <div className="font-semibold">{item.label}</div>
                    <div className="text-sm text-gray-500 mt-1">Coming Soon</div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="font-semibold mb-3">Next Steps:</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>✅ Frontend deployed</li>
              <li>✅ Authentication working</li>
              <li>✅ Database ready (14 tables)</li>
              <li>✅ API keys configured (4 providers)</li>
              <li>✅ Edge Functions deployed (5 functions)</li>
              <li>⏳ Connect Edge Functions to UI</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-2 grid grid-cols-5 gap-2">
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default App
