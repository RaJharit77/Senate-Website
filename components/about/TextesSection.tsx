import { DocCard, pStyle, subheadStyle, ulStyle, liStyle, Bullet, GREEN, RED } from "./AboutStyles";

export function TextesSection() {
    return (
        <DocCard title="Textes de référence" pillColor={RED}>
            <p style={pStyle}>Les textes régissant le Sénat :</p>

            <h3 style={subheadStyle}>Les dispositions constitutionnelles</h3>
            <p style={{ ...pStyle, fontSize: "0.88rem", fontStyle: "italic", marginTop: "-0.6rem" }}>
                Discipline générale ou discipline de détail
            </p>
            <p style={pStyle}>
                Le Sénat est prévu par l&apos;article 80 et suivants de la Constitution de la Quatrième
                République. L&apos;article 81 dispose que le Sénat représente les Collectivités Territoriales
                Décentralisées ainsi que les organisations économiques et sociales. Il comprend, pour deux
                tiers, des membres élus en nombre égal pour chaque Province, et pour un tiers, des membres
                nommés par le Président de la République — pour partie sur présentation des groupements les
                plus représentatifs issus des forces économiques, sociales et culturelles, et pour partie en
                raison de leur compétence particulière.
            </p>
            <p style={pStyle}>
                Il est la deuxième institution étatique sur le plan protocolaire, d&apos;autant qu&apos;il a été relégué
                à la troisième position lors des préséances des cérémonies officielles.
            </p>
            <p style={pStyle}>
                Il n&apos;empêche que le Président du Sénat exerce provisoirement les fonctions de Chef de l&apos;État
                en cas de vacance de poste ou d&apos;empêchement temporaire du Chef de l&apos;État (article 50).
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
                    Loi organique n° 2003-031 du 12 novembre 2003 modifiant l&apos;article 15 et ajoutant un article
                    15 bis à l&apos;ordonnance n° 2000-001 du 05 janvier 2001 portant loi organique relative au Sénat
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
                    Loi Organique n° 2015-007 du 03 mars 2015, modifiée et complétée par l&apos;Ordonnance n°
                    2019-006 du 28 mai 2019, fixant les règles relatives au fonctionnement du Sénat ainsi qu&apos;aux
                    modalités d&apos;élection et de désignation des Sénateurs de Madagascar
                </li>
            </ul>

            <h3 style={subheadStyle}>Les sources réglementaires</h3>
            <p style={pStyle}>
                L&apos;arrêté n° 2001-001 du 08 mai 2001 portant Règlement Intérieur du Sénat réglemente la
                composition, l&apos;organisation, le fonctionnement et les attributions du Sénat.
            </p>
            <p style={pStyle}>
                Exceptionnellement, durant la période de transition, l&apos;arrêté n° 007/2010 du 19 octobre 2010
                portant règlement intérieur du Conseil Supérieur de la Transition, modifié par l&apos;arrêté n°
                150/2011 du 15 décembre 2011, s&apos;est appliqué.
            </p>
            <p style={pStyle}>
                Le règlement intérieur est la source principale de la procédure parlementaire. C&apos;est aussi le
                texte de référence en matière d&apos;organisation interne qui, en application des lois organiques,
                réglemente le droit du Président du Sénat de requérir les forces armées, la création et les
                pouvoirs des commissions d&apos;enquête, ainsi que le régime financier du Sénat.
            </p>
            <p style={pStyle}>
                Toutefois, le pouvoir réglementaire du Sénat est encadré : l&apos;article 117 alinéa 4 de la
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
                    Arrêté n° 2010-008/CST/P du 22 novembre 2010 fixant l&apos;organisation générale des Services du
                    Conseil Supérieur de la Transition
                </li>
            </ul>
        </DocCard>
    );
}