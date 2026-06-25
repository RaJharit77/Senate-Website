import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type SectionId = "missions" | "structures" | "textes";

const VALID_SECTIONS: SectionId[] = ["missions", "structures", "textes"];

function getSectionFromHash(hash: string): SectionId | null {
    const clean = hash.replace("#", "") as SectionId;
    return VALID_SECTIONS.includes(clean) ? clean : null;
}

const GREEN = "#1a5c16";
const RED = "#cc1111";
const CYAN = "#5bc8de";
const GREEN_DARK = "#0f3a0c";
const INK = "#1a1a1a";
const MUTED = "#4a6648";
const WHITE = "#ffffff";
const GRAY = "#F7DCEF"

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

const pStyle: CSSProperties = {
    fontFamily: "'Source Serif 4', serif",
    fontSize: "1.02rem",
    lineHeight: 1.85,
    color: INK,
    marginBottom: "1.15rem",
};

const subheadStyle: CSSProperties = {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.25rem",
    fontWeight: 700,
    color: RED,
    marginTop: "2rem",
    marginBottom: "1rem",
};

const ulStyle: CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: "0 0 1.5rem 0",
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
};

const liStyle: CSSProperties = {
    ...pStyle,
    marginBottom: 0,
    paddingLeft: "1.4rem",
    position: "relative",
};

function Bullet({ color }: { color: string }) {
    return (
        <span
            className="absolute left-0 top-2 rounded-full"
            style={{ width: 6, height: 6, backgroundColor: color }}
        />
    );
}

function NamedItem({
    name,
    color = GREEN,
    children,
}: {
    name: string;
    color?: string;
    children: ReactNode;
}) {
    return (
        <li style={liStyle}>
            <Bullet color={color} />
            <strong style={{ color: INK, fontWeight: 700 }}>{name}</strong> — {children}
        </li>
    );
}

function Divider({ children, color = RED }: { children: string; color?: string }) {
    return (
        <div className="flex items-center gap-4" style={{ margin: "2rem 0 1.5rem" }}>
            <span className="flex-1 h-px" style={{ backgroundColor: "rgba(22,36,20,0.18)" }} />
            <span
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color,
                    whiteSpace: "nowrap",
                }}
            >
                {children}
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: "rgba(22,36,20,0.18)" }} />
        </div>
    );
}

function DocCard({
    title,
    pillColor = RED,
    children,
}: {
    title: string;
    pillColor?: string;
    children: ReactNode;
}) {
    return (
        <div
            className="bg-white rounded-3xl shadow-md border overflow-hidden"
            style={{ borderColor: "rgba(22,36,20,0.08)" }}
        >
            <div className="px-6 sm:px-10 pt-8">
                <div className="rounded-full py-3.5 px-6" style={{ backgroundColor: pillColor }}>
                    <h2
                        className="text-center"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.35rem",
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: "0.01em",
                        }}
                    >
                        {title}
                    </h2>
                </div>
            </div>
            <div className="px-6 sm:px-10 pb-10 pt-2">{children}</div>
        </div>
    );
}

const sectionMeta: Record<SectionId, { label: string; color: string }> = {
    missions: { label: "Missions et attributions", color: GRAY },
    structures: { label: "Structures", color: GRAY },
    textes: { label: "Textes de référence", color: GRAY },
};

export default function AboutPage() {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState<SectionId | null>(() =>
        getSectionFromHash(location.hash)
    );

    useEffect(() => {
        setActiveSection(getSectionFromHash(location.hash));
        // Remonte en haut de page à chaque changement de section
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.hash]);

    const showAll = activeSection === null;

    return (
        <div className="py-12 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                {/* Page Title */}
                <div className="mb-12">
                    <div className="flex gap-1 mb-4" style={{ height: 3 }}>
                        <div className="w-8 rounded-full" style={{ backgroundColor: GREEN }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: RED }} />
                        <div className="w-4 rounded-full" style={{ backgroundColor: CYAN }} />
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: WHITE,
                            lineHeight: 1.2,
                        }}
                    >
                        À propos du Sénat
                    </h1>
                    <p
                        style={{
                            fontFamily: "'Source Serif 4', serif",
                            fontSize: "1.1rem",
                            color: "rgba(255,255,255,0.5)",
                            marginTop: "0.5rem",
                            maxWidth: "600px",
                        }}
                    >
                        Découvrez l'histoire, la mission et l'organisation de la chambre haute du Parlement malgache.
                    </p>

                    {/* Fil d'Ariane affiché uniquement quand une section précise est sélectionnée */}
                    {!showAll && activeSection && (
                        <div className="flex items-center gap-2 mt-5">
                            <Link
                                to="/a-propos"
                                className="transition-opacity hover:opacity-80"
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.8rem",
                                    color: "rgba(255,255,255,0.5)",
                                    textDecoration: "underline",
                                }}
                            >
                                Tout afficher
                            </Link>
                            <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
                            <span
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    color: sectionMeta[activeSection].color,
                                }}
                            >
                                {sectionMeta[activeSection].label}
                            </span>
                        </div>
                    )}
                </div>

                {/* Missions et attributions */}
                {(showAll || activeSection === "missions") && (
                <section id="missions" className="mb-16">
                    <DocCard title="Missions et attributions du Sénat" pillColor={RED}>
                        <Divider color={GREEN}>Missions</Divider>
                        <p style={pStyle}>
                            Le bicamérisme malgache ne diffère pas du système appliqué partout dans le monde. Il est
                            inégalitaire puisque l'Assemblée Nationale dispose de plus de pouvoirs que le Sénat.
                            Effectivement, dès sa première mise en place en 1959, le Sénat n'a pas les mêmes attributions
                            constitutionnelles que l'Assemblée Nationale. Certes, il forme avec cette dernière le
                            Parlement et détient concurremment avec elle le pouvoir législatif. Mais il ne participe pas,
                            par exemple, à la procédure de renversement du Gouvernement. Sous la Première République,
                            cependant, en cas de refus d'approbation du programme gouvernemental par l'Assemblée
                            Nationale, le Président de la République peut consulter le Sénat sur la nécessité de
                            maintenir ou de modifier ce programme gouvernemental.
                        </p>
                        <p style={pStyle}>
                            Par ailleurs, le Sénat a conservé les mêmes pouvoirs, en tant qu'organe d'élaboration de loi,
                            de contrôle de l'action gouvernementale, d'évaluation des politiques publiques et de
                            consultation, depuis la Première République jusqu'à ce jour.
                        </p>
                        <p style={pStyle}>
                            Avec l'Assemblée Nationale, le Sénat intervient dans l'octroi au Président de la République
                            d'une délégation de pouvoir de légiférer pendant un temps limité et pour un objet déterminé.
                        </p>

                        <h3 style={subheadStyle}>Particularités du Sénat</h3>
                        <p style={pStyle}>
                            Le Sénat, par rapport à l'Assemblée Nationale, a ses particularités. En cas de vacance de la
                            Présidence de la République, c'est le Président du Sénat qui exerce provisoirement les
                            fonctions de Chef de l'État. Cette attribution constitutionnelle place le Président du Sénat
                            au deuxième rang de l'État, mais concernant l'ordre de préséance protocolaire lors des
                            cérémonies officielles, il est au troisième rang après le Président de la République et le
                            Premier Ministre.
                        </p>
                        <p style={pStyle}>
                            On peut également citer la stabilité du Sénat puisqu'à la différence de l'Assemblée
                            Nationale, il ne peut pas être dissout par le Président de la République. Les Sénateurs sont
                            les élus des élus, en ce sens que le collège électoral sénatorial est composé par les Maires
                            et les Conseillers communaux et municipaux, les Chefs de Région et les Conseillers régionaux,
                            les Chefs de Province et les Conseillers provinciaux. Ce mode d'élection amène le Sénat à la
                            mission de représentation des Collectivités Territoriales Décentralisées.
                        </p>
                    </DocCard>
                </section>
                )}

                {/* Structures */}
                {(showAll || activeSection === "structures") && (
                <section id="structures" className="mb-16">
                    <DocCard title="Structures du Sénat" pillColor={GREEN}>
                        <Divider color={RED}>I. Cabinets du Bureau Permanent</Divider>
                        <p style={{ ...pStyle, fontSize: "0.88rem", fontStyle: "italic", marginTop: "-0.5rem" }}>
                            Les Cabinets des membres du Bureau Permanent et les organes rattachés au Président du Sénat.
                        </p>

                        <h3 style={subheadStyle}>Le Cabinet du Président du Sénat</h3>
                        <p style={pStyle}>
                            Le Cabinet du Président du Sénat assiste ce dernier dans l'accomplissement de sa mission de
                            Chef d'Institution. Il est chargé de la coordination et de la gestion des affaires politiques,
                            ainsi que des relations publiques du Président.
                        </p>

                        <h3 style={subheadStyle}>
                            Cabinets des Vice-présidents, du Questeur et du Rapporteur Général
                        </h3>
                        <p style={pStyle}>
                            Chaque Vice-président, le Questeur et le Rapporteur Général disposent d'un Cabinet et d'un
                            Secrétariat dirigé par un Chef Secrétariat Particulier. Les membres du Cabinet sont nommés par
                            le Président sur proposition du Vice-président, du Questeur ou du Rapporteur Général concerné.
                            Chaque Cabinet est chargé des affaires politiques et des relations publiques du membre du
                            Bureau Permanent, ainsi que du suivi des dossiers qui l'intéressent.
                        </p>

                        <h3 style={subheadStyle}>Organes rattachés au Président du Sénat</h3>
                        <p style={pStyle}>Sont rattachés au Président du Sénat :</p>
                        <ul style={ulStyle}>
                            <NamedItem name="L'Inspection Générale du Sénat" color={RED}>
                                organe rattaché directement au Président du Sénat. L'Inspecteur Général, sous l'autorité et
                                le contrôle direct du Président, dirige et coordonne les missions de contrôle interne,
                                d'inspection et d'audit de l'administration du Sénat. À ces missions de base s'ajoutent
                                l'évaluation, le conseil pragmatique sur l'administration et les activités du Sénat, ainsi
                                que la réception et le traitement des doléances adressées au Président. L'Inspecteur
                                Général, ayant rang de Secrétaire Général, dispose d'un pool d'audit composé de trois
                                auditeurs ayant rang de directeur, d'un service de traitement des doléances et de deux
                                collaborateurs.
                            </NamedItem>
                            <NamedItem name="La Personne Responsable des Marchés Publics" color={RED}>
                                constituée d'un bureau composé d'une Personne Responsable des Marchés Publics ayant rang de
                                Directeur, d'une Unité de Gestion de la Passation des Marchés et d'un Secrétaire Particulier.
                                Elle est l'autorité habilitée par l'autorité contractante à conduire la procédure de
                                passation de marché et à suivre son exécution : elle notifie l'attribution du marché au
                                titulaire, signe et approuve le marché, et représente l'autorité contractante durant toute
                                la phase d'exécution.
                            </NamedItem>
                            <NamedItem name="La Direction du Protocole" color={RED}>
                                chargée de coordonner l'ordonnancement des cérémonies, de préparer et d'organiser les
                                réceptions et audiences internes et externes, d'accomplir les formalités liées aux
                                déplacements officiels des membres du Sénat, et de gérer les relations du Sénat avec les
                                pays et organismes internationaux. Elle comprend le Service du Protocole, le Service des
                                Étiquettes, le Service des Relations Internationales et Interparlementaires et un Secrétaire
                                Particulier.
                            </NamedItem>
                            <NamedItem name="La Direction de la Sécurité" color={RED}>
                                chargée d'assurer la sécurité des membres du Sénat, du Palais, de ses dépendances et de son
                                parc de véhicules. Le Directeur de la Sécurité est assisté d'un adjoint ; deux Attachés de
                                sécurité et un adjudant de compagnie, ayant rang de chef de Division, y sont rattachés. La
                                Direction dispose d'un Service de Sécurité VIP, d'un Service de la Sécurité du Palais, d'un
                                Service de Renseignements et d'un Secrétaire Particulier.
                            </NamedItem>
                            <NamedItem name="L'Intendance du Palais" color={RED}>
                                l'Intendant du Palais, ayant rang de Directeur, assure la propreté extérieure du Palais et
                                de ses dépendances, l'organisation matérielle des réceptions officielles et l'agencement des
                                mobiliers et équipements, en collaboration avec les autres Directions du Sénat. Il est
                                assisté d'un Adjoint.
                            </NamedItem>
                            <NamedItem name="Les Antennes du Sénat aux chefs-lieux de Province" color={RED}>
                                des Antennes Inter-Régionales instaurées aux chefs-lieux des Provinces représentent
                                l'Administration du Sénat dans leur ressort respectif et coordonnent la mise en œuvre des
                                missions du Sénat dans le domaine socio-économique et de la décentralisation, en mettant à
                                disposition les documents et données utiles aux Collectivités Territoriales Décentralisées.
                                Elles relèvent de l'autorité du Président, avec faculté de délégation aux Vice-présidents
                                responsables du Nord et du Sud, et collaborent étroitement avec la Direction de la
                                Décentralisation.
                            </NamedItem>
                        </ul>

                        <Divider color={GREEN_DARK}>II. Le Secrétariat Général</Divider>
                        <p style={pStyle}>
                            Le Secrétaire Général, sous l'autorité et le contrôle du Président, dirige, coordonne et
                            supervise les activités des Services du Sénat. Il est chargé du contentieux et de la
                            correspondance avec les institutions nationales ou internationales, assure le secrétariat du
                            Bureau Permanent, l'exécution de ses décisions, et assiste le Président en séance plénière.
                        </p>
                        <p style={pStyle}>
                            À cet effet, le Secrétariat Général dispose de deux Collaborateurs ayant rang de Chef de
                            Service et d'un Secrétariat dirigé par un Chef Secrétariat Particulier. Le Secrétaire Général,
                            en cas de besoin, assiste le Questeur dans ses fonctions en collaboration avec le Chef de
                            Cabinet, et peut se faire représenter par les Directeurs concernés. Le Service de Coordination
                            des Projets, de Suivi et d'Évaluation est rattaché au Secrétariat Général.
                        </p>
                        <p style={pStyle}>Le Secrétariat Général comprend :</p>
                        <ul style={ulStyle}>
                            <NamedItem name="La Direction Administrative et des Ressources Humaines" color={GREEN}>
                                chargée de l'application, de la coordination et du suivi des décisions administratives
                                prises par le Bureau Permanent, ainsi que du contrôle de l'effectivité des textes régissant
                                le personnel. Elle élabore les textes particuliers relatifs au personnel et gère
                                administrativement les membres du Cabinet du Bureau Permanent et les assistants
                                parlementaires ; une division y est rattachée pour les cas sociaux. Elle comprend un Service
                                du Personnel et de la Formation, un Service Médico-social, un Service des Affaires Générales
                                et un Secrétariat Particulier.
                            </NamedItem>
                            <NamedItem name="La Direction Financière" color={GREEN}>
                                assure l'exécution des opérations financières et comptables du Sénat. Elle comprend un
                                Service du Budget, un Service de la Solde et des Indemnités, un Service Transit, un Service
                                de Validation et des Pensions et un Secrétariat Particulier.
                            </NamedItem>
                            <NamedItem name="La Direction de la Législation et des Études" color={GREEN}>
                                chargée de la préparation des travaux législatifs et de l'étude des textes soumis à l'examen
                                et à l'adoption du Sénat. Elle comprend un Service de la Législation, un Service des Études
                                et du Contentieux, un Service des Procès-verbaux et un Secrétariat Particulier.
                            </NamedItem>
                            <NamedItem name="La Direction de la Décentralisation" color={GREEN}>
                                chargée de faciliter les relations des sénateurs avec les organes des Collectivités
                                Territoriales Décentralisées et les organisations sociales et économiques, et d'appuyer
                                l'action des antennes du Sénat dans les chefs-lieux de Province. Elle comprend un Service des
                                Relations avec les Collectivités Territoriales Décentralisées, un Service de la Coopération
                                Décentralisée, un Service de la Documentation et un Secrétariat Particulier.
                            </NamedItem>
                            <NamedItem name="La Direction du Système d'Information et de la Communication" color={GREEN}>
                                chargée de fournir les services requis en informatique et bureautique, de former et
                                d'accompagner les utilisateurs des équipements, logiciels et systèmes informatiques, de
                                promouvoir le rayonnement du Sénat et le rôle des Sénateurs auprès des Collectivités
                                Territoriales Décentralisées par la diffusion des travaux du Sénat, d'assurer et coordonner
                                la réalisation de publications, d'expositions et d'activités sur le fonctionnement du Sénat,
                                et de coordonner les projets liés aux technologies de l'information. Elle comprend un
                                Service de la Communication, un Service du Système d'Information et un Secrétariat
                                Particulier.
                            </NamedItem>
                            <NamedItem name="La Direction de la Logistique et du Patrimoine" color={GREEN}>
                                assure la gestion et l'entretien des immeubles, des biens meubles et des matériels du Sénat.
                                Elle comprend un Service de Gestion du Patrimoine, un Service du Parc des Véhicules, un
                                Service de la Comptabilité-Matière et un Secrétariat Particulier.
                            </NamedItem>
                        </ul>

                        <figure className="my-8">
                            <img
                                src="https://senat.mg/wp-content/uploads/2025/08/org-org-1536x1086.jpg"
                                alt="Organigramme du Sénat de Madagascar"
                                className="w-full rounded-xl border shadow-sm"
                                style={{ borderColor: "rgba(22,36,20,0.1)" }}
                            />
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

                        <Divider color={RED}>Liste d'abréviations</Divider>
                        {/* Tableau avec bordures de lignes */}
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
                </section>
                )}

                {/* Textes de référence */}
                {(showAll || activeSection === "textes") && (
                <section id="textes">
                    <DocCard title="Textes de référence" pillColor={GREEN_DARK}>
                        <p style={pStyle}>Les textes régissant le Sénat :</p>

                        <h3 style={subheadStyle}>Les dispositions constitutionnelles</h3>
                        <p style={{ ...pStyle, fontSize: "0.88rem", fontStyle: "italic", marginTop: "-0.6rem" }}>
                            Discipline générale ou discipline de détail
                        </p>
                        <p style={pStyle}>
                            Le Sénat est prévu par l'article 80 et suivants de la Constitution de la Quatrième
                            République. L'article 81 dispose que le Sénat représente les Collectivités Territoriales
                            Décentralisées ainsi que les organisations économiques et sociales. Il comprend, pour deux
                            tiers, des membres élus en nombre égal pour chaque Province, et pour un tiers, des membres
                            nommés par le Président de la République — pour partie sur présentation des groupements les
                            plus représentatifs issus des forces économiques, sociales et culturelles, et pour partie en
                            raison de leur compétence particulière.
                        </p>
                        <p style={pStyle}>
                            Il est la deuxième institution étatique sur le plan protocolaire, d'autant qu'il a été relégué
                            à la troisième position lors des préséances des cérémonies officielles.
                        </p>
                        <p style={pStyle}>
                            Il n'empêche que le Président du Sénat exerce provisoirement les fonctions de Chef de l'État
                            en cas de vacance de poste ou d'empêchement temporaire du Chef de l'État (article 50).
                        </p>

                        <h3 style={subheadStyle}>Les dispositions législatives</h3>
                        <p style={pStyle}>
                            Ces dispositions précisent, complètent ou détaillent les dispositions constitutionnelles
                            concernant le Sénat :
                        </p>
                        <ul style={ulStyle}>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Ordonnance n° 2001-001 du 05 janvier 2001 portant Loi organique relative au Sénat
                            </li>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Loi organique n° 2000-016 du 29 août 2000 déterminant le cadre de gestion des propres
                                affaires des provinces autonomes
                            </li>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Loi organique n° 2003-031 du 12 novembre 2003 modifiant l'article 15 et ajoutant un article
                                15 bis à l'ordonnance n° 2000-001 du 05 janvier 2001 portant loi organique relative au Sénat
                            </li>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Loi n° 2004-001 du 17 juin 2004 relative aux Régions
                            </li>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Ordonnance n° 2008-002 du 27 février 2008 portant loi organique relative au Sénat
                            </li>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Loi Organique n° 2015-007 du 03 mars 2015, modifiée et complétée par l'Ordonnance n°
                                2019-006 du 28 mai 2019, fixant les règles relatives au fonctionnement du Sénat ainsi qu'aux
                                modalités d'élection et de désignation des Sénateurs de Madagascar
                            </li>
                        </ul>

                        <h3 style={subheadStyle}>Les sources réglementaires</h3>
                        <p style={pStyle}>
                            L'arrêté n° 2001-001 du 08 mai 2001 portant Règlement Intérieur du Sénat réglemente la
                            composition, l'organisation, le fonctionnement et les attributions du Sénat.
                        </p>
                        <p style={pStyle}>
                            Exceptionnellement, durant la période de transition, l'arrêté n° 007/2010 du 19 octobre 2010
                            portant règlement intérieur du Conseil Supérieur de la Transition, modifié par l'arrêté n°
                            150/2011 du 15 décembre 2011, s'est appliqué.
                        </p>
                        <p style={pStyle}>
                            Le règlement intérieur est la source principale de la procédure parlementaire. C'est aussi le
                            texte de référence en matière d'organisation interne qui, en application des lois organiques,
                            réglemente le droit du Président du Sénat de requérir les forces armées, la création et les
                            pouvoirs des commissions d'enquête, ainsi que le régime financier du Sénat.
                        </p>
                        <p style={pStyle}>
                            Toutefois, le pouvoir réglementaire du Sénat est encadré : l'article 117 alinéa 4 de la
                            Constitution prévoit le contrôle obligatoire, par la Haute Cour Constitutionnelle, de la
                            constitutionnalité des règlements intérieurs des Assemblées avant leur mise en application.
                        </p>

                        <h3 style={subheadStyle}>Les textes réglementaires sur les services du Sénat</h3>
                        <ul style={ulStyle}>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Arrêté n° 2001-002 du 16 mai 2001 portant organisation générale des Services du Sénat
                            </li>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Arrêté n° 2001-003 du 16 mai 2001 portant structure et mission des Services du Sénat
                            </li>
                            <li style={liStyle}>
                                <Bullet color={GREEN} />
                                Arrêté n° 2010-008/CST/P du 22 novembre 2010 fixant l'organisation générale des Services du
                                Conseil Supérieur de la Transition
                            </li>
                        </ul>
                    </DocCard>
                </section>
                )}
            </div>
        </div>
    );
}