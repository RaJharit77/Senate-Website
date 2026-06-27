import { GREEN, RED } from "@/utils/colors";
import { DocCard, Divider, pStyle, subheadStyle } from "./AboutStyles";

export function MissionSection() {
    return (
        <DocCard title="Missions et attributions du Sénat" pillColor={RED}>
            <Divider color={GREEN}>Missions</Divider>
            <p style={pStyle}>
                Le bicamérisme malgache ne diffère pas du système appliqué partout dans le monde. Il est
                inégalitaire puisque l&apos;Assemblée Nationale dispose de plus de pouvoirs que le Sénat.
                Effectivement, dès sa première mise en place en 1959, le Sénat n&apos;a pas les mêmes attributions
                constitutionnelles que l&apos;Assemblée Nationale. Certes, il forme avec cette dernière le
                Parlement et détient concurremment avec elle le pouvoir législatif. Mais il ne participe pas,
                par exemple, à la procédure de renversement du Gouvernement. Sous la Première République,
                cependant, en cas de refus d&apos;approbation du programme gouvernemental par l&apos;Assemblée
                Nationale, le Président de la République peut consulter le Sénat sur la nécessité de
                maintenir ou de modifier ce programme gouvernemental.
            </p>
            <p style={pStyle}>
                Par ailleurs, le Sénat a conservé les mêmes pouvoirs, en tant qu&apos;organe d&apos;élaboration de loi,
                de contrôle de l&apos;action gouvernementale, d&apos;évaluation des politiques publiques et de
                consultation, depuis la Première République jusqu&apos;à ce jour.
            </p>
            <p style={pStyle}>
                Avec l&apos;Assemblée Nationale, le Sénat intervient dans l&apos;octroi au Président de la République
                d&apos;une délégation de pouvoir de légiférer pendant un temps limité et pour un objet déterminé.
            </p>

            <h3 style={subheadStyle}>Particularités du Sénat</h3>
            <p style={pStyle}>
                Le Sénat, par rapport à l&apos;Assemblée Nationale, a ses particularités. En cas de vacance de la
                Présidence de la République, c&apos;est le Président du Sénat qui exerce provisoirement les
                fonctions de Chef de l&apos;État. Cette attribution constitutionnelle place le Président du Sénat
                au deuxième rang de l&apos;État, mais concernant l&apos;ordre de préséance protocolaire lors des
                cérémonies officielles, il est au troisième rang après le Président de la République et le
                Premier Ministre.
            </p>
            <p style={pStyle}>
                On peut également citer la stabilité du Sénat puisqu&apos;à la différence de l&apos;Assemblée
                Nationale, il ne peut pas être dissout par le Président de la République. Les Sénateurs sont
                les élus des élus, en ce sens que le collège électoral sénatorial est composé par les Maires
                et les Conseillers communaux et municipaux, les Chefs de Région et les Conseillers régionaux,
                les Chefs de Province et les Conseillers provinciaux. Ce mode d&apos;élection amène le Sénat à la
                mission de représentation des Collectivités Territoriales Décentralisées.
            </p>
        </DocCard>
    );
}