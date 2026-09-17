'use client';

import { useEffect, useState } from 'react';
import { SenatorProfile } from '@/types/senatorsType';
import Image from 'next/image';

export default function SenatorsList() {
    const [senators, setSenators] = useState<SenatorProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSenators() {
            try {
                const res = await fetch('/api/senators');
                const json = await res.json();
                if (json.success && json.data?.senateurs) {
                    setSenators(
                        json.data.senateurs.map((s: {
                            id?: string | number;
                            name: string;
                            image?: string;
                            age?: string | number;
                            eluDesigne?: string;
                            province?: string;
                            parti?: string;
                            fonction?: string;
                            commissions?: SenatorProfile['commissions'];
                        }) => ({
                            id: typeof s.id === 'string' ? s.id.length : 0,
                            name: s.name,
                            photoUrl: s.image ?? '',
                            link: '',
                            age: s.age ? Number(s.age) : undefined,
                            type: s.eluDesigne,
                            province: s.province,
                            party: s.parti,
                            role: s.fonction,
                            commissions: s.commissions,
                        }))
                    );
                }
            } catch (err) {
                console.error('Erreur de chargement:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchSenators();
    }, []);

    if (loading) return <div>Chargement des profils sénatoriaux...</div>;

    return (
        <div className="row">
            {senators.map((senator) => (
                <div key={senator.id} className="col-lg-6 mb-4">
                    <div className="card text-center">
                        {senator.photoUrl && (
                            <Image
                                src={senator.photoUrl}
                                width={500}
                                height={500}
                                className="card-img-top"
                                alt={senator.name}
                            />
                        )}
                        <a href={senator.link} target="_blank" rel="noopener noreferrer">
                            <div className="card-body">
                                <h4 className="card-title">{senator.name}</h4>
                                <p className="card-text">
                                    {senator.role && (
                                        <>
                                            <strong>{senator.role}</strong>
                                            <br />
                                        </>
                                    )}
                                    Age : {senator.age || 'N/C'}<br />
                                    Élu/Désigné : {senator.type}<br />
                                    Province : {senator.province}<br />
                                    Au titre du Parti : {senator.party}
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}