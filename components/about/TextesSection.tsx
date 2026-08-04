import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function TextesSection({ html }: { html: string }) {
    return (
        <DocCard title="Textes de référence" pillColor={RED}>
            <Divider color={GREEN}>Textes régissant le Sénat</Divider>
            <div
                className="prose prose-lg max-w-none font-poppins text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </DocCard>
    );
}