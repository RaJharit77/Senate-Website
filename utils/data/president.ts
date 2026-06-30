export interface PresidentData {
    name: string;
    title: string;           
    mandateStart: string;    
    mandateEnd: string;      
    photoUrl: string;        
    message: string;         
}

export const presidentData: PresidentData = {
    name: "RAZAFIMAHEFA Herimanana",
    title: "Ex-président du Sénat",
    mandateStart: "25 Janvier 2021",
    mandateEnd: "12 Octobre 2023",
    photoUrl: "https://senat.mg/wp-content/uploads/2023/04/RAZAFIMAHEFA.png",
    message: `
    <p>Mesdames, Messieurs les Sénateurs,</p>
    <p>Chers compatriotes,</p>
    <p>Le Sénat de Madagascar, fidèle à sa mission républicaine, œuvre chaque jour pour le renforcement de notre démocratie et le développement harmonieux de notre pays. Dans un esprit de dialogue et de concertation, nous poursuivons nos travaux législatifs et de contrôle, en phase avec les aspirations de la Nation.</p>
    <p>Notre institution est un pilier de l'État de droit, garant de la stabilité et de la justice sociale. Ensemble, nous bâtissons un avenir prometteur pour Madagascar.</p>
    <p>Vive le Sénat, vive la République !</p>
    `,
};