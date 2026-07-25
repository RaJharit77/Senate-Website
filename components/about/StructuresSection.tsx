import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";
import { stripInlineTextColor } from "@/lib/sanitizeHtml";

export function StructuresSection({ html }: { html: string }) {
    return (
        <DocCard title="Structures du Sénat" pillColor={RED}>
            <Divider color={GREEN}>Organisation</Divider>
            <div dangerouslySetInnerHTML={{ __html: stripInlineTextColor(html) }} />
        </DocCard>
    );
}