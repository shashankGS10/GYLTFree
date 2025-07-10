import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-20 min-h-screen bg-background transition-colors duration-300">
      {/* Root Page */}
    
      {/* Hero */}
      <section className="max-w-3xl text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground mb-4">
          SmartSupport
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
          Revolutionize your customer support with AI-driven solutions, instant
          assistance, and actionable insights.
        </p>
        <p className="text-sm sm:text-base text-muted-foreground">
          Empower your team with smart customer support tools. From
          handling inquiries to providing real-time resolutions, our AI ensures
          seamless interactions and enhanced customer satisfaction. Experience
          the future of support, tailored to your needs.
        </p>
      </section>

      {/* Primary Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link href="/sign-up">
          <Button size="lg">Get Started</Button>
        </Link>
        <Link href="/sign-in">
          <Button variant="outline" size="lg">
            Sign In
          </Button>
        </Link>
      </div>

      {/* Secondary Call to Action */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Link href="/sign-up">
          <Button size="lg">Start Free Practice</Button>
        </Link>
        <Link href="/sign-in">
          <Button variant="outline" size="lg">
            Explore Dashboard
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-muted-foreground">
        © {new Date().getFullYear()} SmartSupport. All rights reserved.
      </footer>
    </main>
  )
}