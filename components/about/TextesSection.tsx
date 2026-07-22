import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function TextesSection({ html }: { html: string }) {
    return (
        <DocCard title="Textes de référence" pillColor={RED}>
            <Divider color={GREEN}>Textes régissant le Sénat</Divider>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </DocCard>
    );
}