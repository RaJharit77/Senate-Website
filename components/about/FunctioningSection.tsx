import {  EMERALD, RED } from "@/utils/colors";
import { DocCard, Divider } from "./AboutStyles";

export function FunctioningSection({ html }: { html: string }) {
    return (
        <DocCard title="Fonctionnement du Sénat" pillColor={RED}>
            <Divider color={EMERALD}>Présentation</Divider>
            <div
                className="prose prose-lg max-w-none font-poppins text-[#1a1a1a]"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </DocCard>
    );
}