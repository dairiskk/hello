import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/utils/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await getAuthUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.email}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted-foreground">
            Plan: {user.plan} ({user.publishedVariantCount} pages published)
          </span>
          <form action="/api/auth/logout" method="POST">
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Projects
              <Button asChild>
                <Link href="/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Link>
              </Button>
            </CardTitle>
            <CardDescription>
              Manage your promo page projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>No projects yet. Create your first project to get started!</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Published Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.publishedVariantCount}</div>
              <p className="text-xs text-muted-foreground">
                Active promo pages
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.plan}</div>
              <p className="text-xs text-muted-foreground">
                Subscription tier
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                All-time page views
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}