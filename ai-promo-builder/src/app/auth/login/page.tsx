import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            AI Promo Builder
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to your promo page builder
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}