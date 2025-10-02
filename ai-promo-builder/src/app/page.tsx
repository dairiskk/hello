import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/utils/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react'

export default async function HomePage() {
  const user = await getAuthUser()
  
  if (user) {
    redirect('/dashboard')
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              AI Promo Builder
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Casino Promo Pages with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create stunning promotional pages in minutes.
          </p>
        </div>
      </main>
    </div>
  )
}
