export interface Registry {
    location: string;
    title: string;
    author: string;
    publisher: string;
    year: string;
    city: string;
    country: string;
    number?: number;
}

export interface RegistryDataGridProps {
    rows: Registry[];
}
