import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function MissionSection({ html }: { html: string }) {
    return (
        <DocCard title="Missions et attributions du Sénat" pillColor={RED}>
            <Divider color={GREEN}>Missions</Divider>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </DocCard>
    );
}