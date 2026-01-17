import api from './api';
import { Lead } from '@/lib/types';

export interface BulkImportResponse {
    total: number;
    successful: number;
    failed: number;
    results: Lead[];
    errors: Array<{ url: string; error: string }>;
}

export const leadService = {
    extractLead: async (url: string) => {
        const response = await api.post<Lead>('/leads/extract', { url });
        return response.data;
    },

    getLeads: async () => {
        const response = await api.get<Lead[]>('/leads/');
        return response.data;
    },

    deleteLead: async (id: string) => {
        const response = await api.delete(`/leads/${id}`);
        return response.data;
    },

    getLead: async (id: string) => {
        const response = await api.get<Lead>(`/leads/${id}`);
        return response.data;
    },

    bulkImport: async (urls: string[], owner_id: number = 1) => {
        const response = await api.post<BulkImportResponse>('/leads/bulk-import', {
            urls,
            owner_id
        });
        return response.data;
    },

    exportCSV: async () => {
        const response = await api.get('/leads/export/csv', {
            responseType: 'blob'
        });

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    }
};

