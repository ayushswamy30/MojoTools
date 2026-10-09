import {
  Disc3,
  Drill,
  Factory,
  Flame,
  HardHat,
  Nut,
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
  'hard-hat': HardHat,
  flame: Flame,
}

export function CategoryIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" className={className} />
}
