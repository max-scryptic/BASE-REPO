import { GalleryVerticalEndIcon } from "lucide-react"

import { appConfig } from "@/lib/template-data"
import { cn } from "@/lib/utils"

export function BrandMark({
  className,
  iconClassName,
}: {
  className?: string
  iconClassName?: string
}) {
  return (
    <div
      className={cn(
        "flex aspect-square size-8 shrink-0 items-center justify-center rounded-brand bg-primary text-primary-foreground",
        className
      )}
    >
      <GalleryVerticalEndIcon className={cn("size-4", iconClassName)} />
    </div>
  )
}

export function AppBranding() {
  return (
    <div className="flex h-12 items-center gap-2 p-2 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0">
      <BrandMark className="bg-sidebar-primary text-sidebar-primary-foreground" />
      <span className="truncate text-base font-medium group-data-[collapsible=icon]:hidden">
        {appConfig.name}
      </span>
    </div>
  )
}
