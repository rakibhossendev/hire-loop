import { Label } from "@/components/ui/label"
import { cn } from "cn"

export default function Field({ label, htmlFor, required, hint, children, className, }: {
    label: string
    htmlFor?: string
    required?: boolean
    hint?: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <Label htmlFor={htmlFor} className="gap-1">
                {label}
                {required ? <span className="text-destructive">*</span> : null}
            </Label>
            {children}
            {hint ? (
                <p className="text-xs text-muted-foreground">{hint}</p>
            ) : null}
        </div>
    )
}
