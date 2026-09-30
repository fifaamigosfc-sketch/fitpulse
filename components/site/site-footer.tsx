import Link from 'next/link'
import { categories } from '@/lib/tools/categories'
import { categoryPath } from '@/lib/tools/registry'
import { legalNav, mainNav } from '@/lib/navigation'
import { siteConfig } from '@/lib/site'
import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Calculadoras fitness gratuitas. Os cálculos acontecem no seu navegador e nenhum dado digitado é enviado ou armazenado.
          </p>
        </div>
        <FooterColumn title="Site" links={mainNav} />
        <FooterColumn
          title="Categorias"
          links={categories.map((c) => ({ label: c.name, href: categoryPath(c.slug) }))}
        />
        <FooterColumn title="Legal" links={legalNav} />
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Mantido por {siteConfig.owner}.
          </p>
          <p>Os resultados são estimativas e não substituem orientação profissional.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="mb-3 text-sm font-semibold">{title}</h2>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
