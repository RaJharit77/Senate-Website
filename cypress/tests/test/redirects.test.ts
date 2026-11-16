import test from "node:test";
import assert from "node:assert/strict";
import { buildLegacyRedirects } from "../../../utils/redirects";
import { SLUG_ROUTES } from "../../../utils/search";

test("R01 l'ancienne page historique-v2 est redirigée en 301", () => {
    const r = buildLegacyRedirects().find((x) => x.source === "/historique-v2");
    assert.deepEqual(r, {
        source: "/historique-v2",
        destination: "/historical/historique-v2",
        permanent: true,
    });
});

test("R02 un slug dont la route est identique n'est pas redirigé", () => {
    assert.equal(buildLegacyRedirects().some((x) => x.source === "/international"), false);
});

test("R03 aucune source n'est déclarée deux fois", () => {
    const sources = buildLegacyRedirects().map((x) => x.source);
    assert.equal(new Set(sources).size, sources.length);
});

test("R04 aucune redirection ne boucle sur elle-même", () => {
    for (const r of buildLegacyRedirects()) {
        assert.notEqual(r.source, r.destination.split("?")[0]);
    }
});

test("R05 toutes les redirections sont permanentes (301)", () => {
    assert.ok(buildLegacyRedirects().every((x) => x.permanent === true));
});

test("R06 la table fournie est respectée (cas isolé)", () => {
    const out = buildLegacyRedirects({
        ancien: { path: "/nouveau", source: "Test" },
        meme: { path: "/meme", source: "Test" },
    });
    assert.deepEqual(out, [{ source: "/ancien", destination: "/nouveau", permanent: true }]);
});

test("R07 une destination ne pointe jamais vers un autre ancien slug", () => {
    const sources = new Set(buildLegacyRedirects().map((x) => x.source));
    for (const r of buildLegacyRedirects()) {
        assert.equal(sources.has(r.destination.split("?")[0]), false, `${r.source} -> ${r.destination}`);
    }
    assert.ok(Object.keys(SLUG_ROUTES).length > 0);
});
