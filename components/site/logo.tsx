import Link from 'next/link'
import { Activity } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2 rounded-md font-heading text-lg font-bold tracking-tight">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground" aria-hidden="true">
        <Activity className="size-4.5" strokeWidth={2.5} />
      </span>
      {siteConfig.name}
    </Link>
  )
}
