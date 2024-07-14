export interface Registry {
    location: string;
    title: string;
    author: string;
    publisher: string;
    year: string;
    city: string;
    country: string;
    edition?: string;
    format: string;
    isbn?: string;
    language: string;
    pages?: number;
    dimensions?: string;
    subject: string;
    notes?: string;
}

export interface RegistryDataGridProps {
    rows: Registry[];
}
