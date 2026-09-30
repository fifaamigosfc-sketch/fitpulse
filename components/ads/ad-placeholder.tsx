import { adsConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

export type AdSlotPosition = keyof typeof adsConfig.slots

/**
 * Espaço reservado para anúncios.
 * Enquanto adsConfig.enabled = false, não renderiza nada (sem layout shift e sem scripts).
 * Ao ativar: o contêiner reserva altura mínima fixa para evitar CLS e é rotulado como "Publicidade"
 * para não ser confundido com conteúdo. Carregue o script do AdSense uma única vez no layout.
 */
export function AdPlaceholder({ position, className }: { position: AdSlotPosition; className?: string }) {
  if (!adsConfig.enabled || !adsConfig.clientId) return null

  return (
    <aside aria-label="Publicidade" className={cn('my-10 flex flex-col items-center gap-1', className)}>
      <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">Publicidade</span>
      <div className="flex min-h-[280px] w-full items-center justify-center overflow-hidden rounded-lg bg-muted/60">
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={adsConfig.clientId}
          data-ad-slot={adsConfig.slots[position]}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  )
}
