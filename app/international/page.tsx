import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default function InternationalRedirect() {
    redirect("/international/presidents-activities");
}