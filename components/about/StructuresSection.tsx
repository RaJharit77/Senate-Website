// components/about/StructuresSection.tsx
import Image from "next/image";
import { DocCard, Divider, pStyle, subheadStyle, ulStyle, NamedItem, GREEN, RED, GREEN_DARK, INK, MUTED } from "./AboutStyles";

const abbreviations: { abbr: string; full: string }[] = [
    { abbr: "P", full: "Président" },
    { abbr: "Q", full: "Questeur" },
    { abbr: "RG", full: "Rapporteur Général" },
    { abbr: "VPN", full: "Vice-président partie Nord" },
    { abbr: "VPS", full: "Vice-président partie Sud" },
    { abbr: "VPO", full: "—" },
    { abbr: "Cab P", full: "Cabinet du Président" },
    { abbr: "Cab Q", full: "Cabinet du Questeur" },
    { abbr: "Cab RG", full: "Cabinet du Rapporteur Général" },
    { abbr: "Cab VPN", full: "Cabinet du vice-président Nord" },
    { abbr: "Cab VPS", full: "Cabinet du vice-président Sud" },
    { abbr: "STD", full: "Service de Traitement des Doléances" },
    { abbr: "IGS", full: "Inspection Générale du Sénat" },
    { abbr: "PRMP", full: "Personne Responsable des Marchés Publics" },
    { abbr: "UGPM", full: "Unité de Gestion de la Passation des Marchés" },
    { abbr: "IP", full: "Intendance du Palais" },
    { abbr: "DP", full: "Direction du Protocole" },
    { abbr: "SP", full: "Service du Protocole" },
    { abbr: "SE", full: "Service des Étiquettes" },
    { abbr: "SRII", full: "Service des Relations Internationales et Interparlementaires" },
    { abbr: "DS", full: "Directeur de la Sécurité" },
    { abbr: "SSVIP", full: "Service de Sécurité de Very Important Person" },
    { abbr: "SSP", full: "Service de la Sécurité du Palais" },
    { abbr: "SR", full: "Service de Renseignements" },
    { abbr: "SG", full: "Secrétariat Général" },
    { abbr: "SCPSE", full: "Service de Coordination des Projets, de Suivi et Évaluation" },
    { abbr: "DARH", full: "Direction Administrative et des Ressources Humaines" },
    { abbr: "DF", full: "Direction Financière" },
    { abbr: "DLE", full: "Direction de la Législation et des Études" },
    { abbr: "DD", full: "Direction de la Décentralisation" },
    { abbr: "DSIC", full: "Direction du Système d'Information et de la Communication" },
    { abbr: "DLP", full: "Direction de la Logistique et du Patrimoine" },
    { abbr: "SPF", full: "Service du Personnel et de la Formation" },
    { abbr: "SMS", full: "Service Médico-Social" },
    { abbr: "SAG", full: "Service des Affaires Générales" },
    { abbr: "SB", full: "Service du Budget" },
    { abbr: "SSI", full: "Service de la Solde et des Indemnités" },
    { abbr: "ST", full: "Service Transit" },
    { abbr: "SVP", full: "Service de Validation et des Pensions" },
    { abbr: "SL", full: "Service de la Législation" },
    { abbr: "SEC", full: "Service des Études et du Contentieux" },
    { abbr: "SPV", full: "Service des Procès-Verbaux" },
    { abbr: "SRCTD", full: "Service des Relations avec les Collectivités Territoriales Décentralisées" },
    { abbr: "SCD", full: "Service de la Coopération Décentralisée" },
    { abbr: "SD", full: "Service de la Documentation" },
    { abbr: "SC", full: "Service de la Communication" },
    { abbr: "SSINF", full: "Service du Système d'Information" },
    { abbr: "SGP", full: "Service de Gestion du Patrimoine" },
    { abbr: "SPV", full: "Service du Parc des Véhicules" },
    { abbr: "SCM", full: "Service de la Comptabilité-Matière" },
];

export function StructuresSection() {
    return (
        <DocCard title="Structures du Sénat" pillColor={RED}>
            <Divider color={GREEN}>I. Cabinets du Bureau Permanent</Divider>
            <p style={{ ...pStyle, fontSize: "0.88rem", fontStyle: "italic", marginTop: "-0.5rem" }}>
                Les Cabinets des membres du Bureau Permanent et les organes rattachés au Président du Sénat.
            </p>

            <h3 style={subheadStyle}>Le Cabinet du Président du Sénat</h3>
            <p style={pStyle}>
                Le Cabinet du Président du Sénat assiste ce dernier dans l&apos;accomplissement de sa mission de
                Chef d&apos;Institution. Il est chargé de la coordination et de la gestion des affaires politiques,
                ainsi que des relations publiques du Président.
            </p>

            <h3 style={subheadStyle}>
                Cabinets des Vice-présidents, du Questeur et du Rapporteur Général
            </h3>
            <p style={pStyle}>
                Chaque Vice-président, le Questeur et le Rapporteur Général disposent d&apos;un Cabinet et d&apos;un
                Secrétariat dirigé par un Chef Secrétariat Particulier. Les membres du Cabinet sont nommés par
                le Président sur proposition du Vice-président, du Questeur ou du Rapporteur Général concerné.
                Chaque Cabinet est chargé des affaires politiques et des relations publiques du membre du
                Bureau Permanent, ainsi que du suivi des dossiers qui l&apos;intéressent.
            </p>

            <h3 style={subheadStyle}>Organes rattachés au Président du Sénat</h3>
            <p style={pStyle}>Sont rattachés au Président du Sénat :</p>
            <ul style={ulStyle}>
                <NamedItem name="L'Inspection Générale du Sénat" color={GREEN_DARK}>
                    organe rattaché directement au Président du Sénat. L&apos;Inspecteur Général, sous l&apos;autorité et
                    le contrôle direct du Président, dirige et coordonne les missions de contrôle interne,
                    d&apos;inspection et d&apos;audit de l&apos;administration du Sénat. À ces missions de base s&apos;ajoutent
                    l&apos;évaluation, le conseil pragmatique sur l&apos;administration et les activités du Sénat, ainsi
                    que la réception et le traitement des doléances adressées au Président. L&apos;Inspecteur
                    Général, ayant rang de Secrétaire Général, dispose d&apos;un pool d&apos;audit composé de trois
                    auditeurs ayant rang de directeur, d&apos;un service de traitement des doléances et de deux
                    collaborateurs.
                </NamedItem>
                <NamedItem name="La Personne Responsable des Marchés Publics" color={GREEN_DARK}>
                    constituée d&apos;un bureau composé d&apos;une Personne Responsable des Marchés Publics ayant rang de
                    Directeur, d&apos;une Unité de Gestion de la Passation des Marchés et d&apos;un Secrétaire Particulier.
                    Elle est l&apos;autorité habilitée par l&apos;autorité contractante à conduire la procédure de
                    passation de marché et à suivre son exécution : elle notifie l&apos;attribution du marché au
                    titulaire, signe et approuve le marché, et représente l&apos;autorité contractante durant toute
                    la phase d&apos;exécution.
                </NamedItem>
                <NamedItem name="La Direction du Protocole" color={GREEN_DARK}>
                    chargée de coordonner l&apos;ordonnancement des cérémonies, de préparer et d&apos;organiser les
                    réceptions et audiences internes et externes, d&apos;accomplir les formalités liées aux
                    déplacements officiels des membres du Sénat, et de gérer les relations du Sénat avec les
                    pays et organismes internationaux. Elle comprend le Service du Protocole, le Service des
                    Étiquettes, le Service des Relations Internationales et Interparlementaires et un Secrétaire
                    Particulier.
                </NamedItem>
                <NamedItem name="La Direction de la Sécurité" color={GREEN_DARK}>
                    chargée d&apos;assurer la sécurité des membres du Sénat, du Palais, de ses dépendances et de son
                    parc de véhicules. Le Directeur de la Sécurité est assisté d&apos;un adjoint ; deux Attachés de
                    sécurité et un adjudant de compagnie, ayant rang de chef de Division, y sont rattachés. La
                    Direction dispose d&apos;un Service de Sécurité VIP, d&apos;un Service de la Sécurité du Palais, d&apos;un
                    Service de Renseignements et d&apos;un Secrétaire Particulier.
                </NamedItem>
                <NamedItem name="L'Intendance du Palais" color={GREEN_DARK}>
                    l&apos;Intendant du Palais, ayant rang de Directeur, assure la propreté extérieure du Palais et
                    de ses dépendances, l&apos;organisation matérielle des réceptions officielles et l&apos;agencement des
                    mobiliers et équipements, en collaboration avec les autres Directions du Sénat. Il est
                    assisté d&apos;un Adjoint.
                </NamedItem>
                <NamedItem name="Les Antennes du Sénat aux chefs-lieux de Province" color={GREEN_DARK}>
                    des Antennes Inter-Régionales instaurées aux chefs-lieux des Provinces représentent
                    l&apos;Administration du Sénat dans leur ressort respectif et coordonnent la mise en œuvre des
                    missions du Sénat dans le domaine socio-économique et de la décentralisation, en mettant à
                    disposition les documents et données utiles aux Collectivités Territoriales Décentralisées.
                    Elles relèvent de l&apos;autorité du Président, avec faculté de délégation aux Vice-présidents
                    responsables du Nord et du Sud, et collaborent étroitement avec la Direction de la
                    Décentralisation.
                </NamedItem>
            </ul>

            <Divider color={GREEN}>II. Le Secrétariat Général</Divider>
            <p style={pStyle}>
                Le Secrétaire Général, sous l&apos;autorité et le contrôle du Président, dirige, coordonne et
                supervise les activités des Services du Sénat. Il est chargé du contentieux et de la
                correspondance avec les institutions nationales ou internationales, assure le secrétariat du
                Bureau Permanent, l&apos;exécution de ses décisions, et assiste le Président en séance plénière.
            </p>
            <p style={pStyle}>
                À cet effet, le Secrétariat Général dispose de deux Collaborateurs ayant rang de Chef de
                Service et d&apos;un Secrétariat dirigé par un Chef Secrétariat Particulier. Le Secrétaire Général,
                en cas de besoin, assiste le Questeur dans ses fonctions en collaboration avec le Chef de
                Cabinet, et peut se faire représenter par les Directeurs concernés. Le Service de Coordination
                des Projets, de Suivi et d&apos;Évaluation est rattaché au Secrétariat Général.
            </p>
            <p style={pStyle}>Le Secrétariat Général comprend :</p>
            <ul style={ulStyle}>
                <NamedItem name="La Direction Administrative et des Ressources Humaines" color={GREEN_DARK}>
                    chargée de l&apos;application, de la coordination et du suivi des décisions administratives
                    prises par le Bureau Permanent, ainsi que du contrôle de l&apos;effectivité des textes régissant
                    le personnel. Elle élabore les textes particuliers relatifs au personnel et gère
                    administrativement les membres du Cabinet du Bureau Permanent et les assistants
                    parlementaires ; une division y est rattachée pour les cas sociaux. Elle comprend un Service
                    du Personnel et de la Formation, un Service Médico-social, un Service des Affaires Générales
                    et un Secrétariat Particulier.
                </NamedItem>
                <NamedItem name="La Direction Financière" color={GREEN_DARK}>
                    assure l&apos;exécution des opérations financières et comptables du Sénat. Elle comprend un
                    Service du Budget, un Service de la Solde et des Indemnités, un Service Transit, un Service
                    de Validation et des Pensions et un Secrétariat Particulier.
                </NamedItem>
                <NamedItem name="La Direction de la Législation et des Études" color={GREEN_DARK}>
                    chargée de la préparation des travaux législatifs et de l&apos;étude des textes soumis à l&apos;examen
                    et à l&apos;adoption du Sénat. Elle comprend un Service de la Législation, un Service des Études
                    et du Contentieux, un Service des Procès-verbaux et un Secrétariat Particulier.
                </NamedItem>
                <NamedItem name="La Direction de la Décentralisation" color={GREEN_DARK}>
                    chargée de faciliter les relations des sénateurs avec les organes des Collectivités
                    Territoriales Décentralisées et les organisations sociales et économiques, et d&apos;appuyer
                    l&apos;action des antennes du Sénat dans les chefs-lieux de Province. Elle comprend un Service des
                    Relations avec les Collectivités Territoriales Décentralisées, un Service de la Coopération
                    Décentralisée, un Service de la Documentation et un Secrétariat Particulier.
                </NamedItem>
                <NamedItem name="La Direction du Système d'Information et de la Communication" color={GREEN_DARK}>
                    chargée de fournir les services requis en informatique et bureautique, de former et
                    d&apos;accompagner les utilisateurs des équipements, logiciels et systèmes informatiques, de
                    promouvoir le rayonnement du Sénat et le rôle des Sénateurs auprès des Collectivités
                    Territoriales Décentralisées par la diffusion des travaux du Sénat, d&apos;assurer et coordonner
                    la réalisation de publications, d&apos;expositions et d&apos;activités sur le fonctionnement du Sénat,
                    et de coordonner les projets liés aux technologies de l&apos;information. Elle comprend un
                    Service de la Communication, un Service du Système d&apos;Information et un Secrétariat
                    Particulier.
                </NamedItem>
                <NamedItem name="La Direction de la Logistique et du Patrimoine" color={GREEN_DARK}>
                    assure la gestion et l&apos;entretien des immeubles, des biens meubles et des matériels du Sénat.
                    Elle comprend un Service de Gestion du Patrimoine, un Service du Parc des Véhicules, un
                    Service de la Comptabilité-Matière et un Secrétariat Particulier.
                </NamedItem>
            </ul>

            <figure className="my-8">
                <div className="relative w-full aspect-auto rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: "rgba(22,36,20,0.1)" }}>
                    <Image
                        src="https://senat.mg/wp-content/uploads/2025/08/org-org-1536x1086.jpg"
                        alt="Organigramme du Sénat de Madagascar"
                        width={1536}
                        height={1086}
                        className="w-full h-auto"
                    />
                </div>
                <figcaption
                    className="text-center mt-3"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.78rem",
                        color: MUTED,
                        fontStyle: "italic",
                    }}
                >
                    Organigramme des services du Sénat de Madagascar
                </figcaption>
            </figure>

            <Divider color={RED}>Liste d&apos;abréviations</Divider>
            <div
                className="rounded-xl overflow-hidden border"
                style={{ borderColor: "rgba(22,36,20,0.15)" }}
            >
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr style={{ backgroundColor: "rgba(26,92,22,0.08)" }}>
                            <th
                                className="text-left py-3 px-4 font-semibold border-b"
                                style={{
                                    color: GREEN,
                                    fontFamily: "'Inter', sans-serif",
                                    borderColor: "rgba(22,36,20,0.12)",
                                }}
                            >
                                Abréviation
                            </th>
                            <th
                                className="text-left py-3 px-4 font-semibold border-b"
                                style={{
                                    color: GREEN,
                                    fontFamily: "'Inter', sans-serif",
                                    borderColor: "rgba(22,36,20,0.12)",
                                }}
                            >
                                Signification
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {abbreviations.map((item, i) => (
                            <tr
                                key={i}
                                className="border-b"
                                style={{
                                    borderColor: "rgba(22,36,20,0.06)",
                                }}
                            >
                                <td
                                    className="py-2.5 px-4 font-mono font-bold border-r"
                                    style={{
                                        color: GREEN,
                                        fontFamily: "'Inter', sans-serif",
                                        borderColor: "rgba(22,36,20,0.06)",
                                    }}
                                >
                                    {item.abbr}
                                </td>
                                <td
                                    className="py-2.5 px-4"
                                    style={{
                                        fontFamily: "'Source Serif 4', serif",
                                        color: INK,
                                    }}
                                >
                                    {item.full}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DocCard>
    );
}