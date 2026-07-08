import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function TextesSection({ html }: { html: string }) {
    return (
        <DocCard title="Textes de référence" pillColor={RED}>
            <Divider color={GREEN}>Textes régissant le Sénat</Divider>
            <div
                className="prose prose-lg max-w-none text-gray-800"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </DocCard>
    );
}