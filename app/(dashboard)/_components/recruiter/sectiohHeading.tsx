import { CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "lucide-react";

export default function SectionHeading({ step, title }: { step: number; title: string }) {
    return (
        <CardHeader>
            <div className="flex items-center gap-3">
                <Badge className="size-6 rounded-md bg-brand px-0 text-brand-foreground">
                    {step}
                </Badge>
                <CardTitle className="text-lg">{title}</CardTitle>
            </div>
        </CardHeader>
    )
}