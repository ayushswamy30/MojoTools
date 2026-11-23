import {
  Disc3,
  Drill,
  Factory,
  Flame,
  Droplets,
  HardHat,
  Layers,
  Nut,
  Plug,
  Ruler,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { CategoryIcon as IconName } from '@/features/content/site'

const icons: Record<IconName, LucideIcon> = {
  drill: Drill,
  wrench: Wrench,
  factory: Factory,
  ruler: Ruler,
  disc: Disc3,
  nut: Nut,
  valve: Droplets,
  plug: Plug,
  layers: Layers,
  'hard-hat': HardHat,
  flame: Flame,
}

export function CategoryIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" className={className} />
}
