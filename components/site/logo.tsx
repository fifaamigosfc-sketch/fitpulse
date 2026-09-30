import Link from 'next/link'
import { Activity } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2 rounded-md font-heading text-lg font-bold tracking-tight">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_0_18px_oklch(0.82_0.19_132/0.2)] transition-shadow group-hover:shadow-[0_0_24px_oklch(0.82_0.19_132/0.38)]" aria-hidden="true">
        <Activity className="size-4.5" strokeWidth={2.5} />
      </span>
      {siteConfig.name}
    </Link>
  )
}
