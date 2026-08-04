import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";
import { stripInlineTextColor } from "@/lib/sanitizeHtml";

export function StructuresSection({ html }: { html: string }) {
    return (
        <DocCard title="Structures du Sénat" pillColor={RED}>
            <Divider color={GREEN}>Organisation</Divider>
            <div
                className="prose prose-lg max-w-none font-poppins text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: stripInlineTextColor(html) }}
            />
        </DocCard>
    );
}