import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function StructuresSection({ html }: { html: string }) {
    return (
        <DocCard title="Structures du Sénat" pillColor={RED}>
            <Divider color={GREEN}>Organisation</Divider>
            <div
                className="prose prose-lg max-w-none text-gray-800"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </DocCard>
    );
}