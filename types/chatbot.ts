/* 
    On capture l'historique AVANT d'ajouter le nouveau message,
    pour l'envoyer tel quel au backend (qui y ajoutera lui-même
    le nouveau message utilisateur dans le bon ordre).
*/
export interface Message {
    role: 'user' | 'assistant';
    content: string;
}