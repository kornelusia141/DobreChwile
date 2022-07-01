export interface Chwila {
    address: string;
    pictureUrl: string;
    id: string;
    date: string;
    title: string;
    description: string;
}

export function toChwila(doc): Chwila {
        return{ id: doc.id, ...doc.data()};          
}