import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function MissionSection({ html }: { html: string }) {
    return (
        <DocCard title="Missions et attributions du Sénat" pillColor={RED}>
            <Divider color={GREEN}>Missions</Divider>
            <div
                className="prose prose-lg max-w-none text-gray-800"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </DocCard>
    );
}