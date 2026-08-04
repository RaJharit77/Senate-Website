import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function MissionSection({ html }: { html: string }) {
    return (
        <DocCard title="Missions et attributions du Sénat" pillColor={RED}>
            <Divider color={GREEN}>Missions</Divider>
            <div
                className="prose prose-lg max-w-none font-poppins text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </DocCard>
    );
}