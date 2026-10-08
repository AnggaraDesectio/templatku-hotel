import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Housekeeping {
    id: number;
    kamar: string;
    tipe: string;
    status: ToneLabel;
    petugas: string;
    waktu: string;
}

export default function HotelHousekeeping({
    housekeeping,
}: {
    housekeeping: Record<string, any>[];
}) {
    const rows: Housekeeping[] = housekeeping.map((h) => ({
        id: Number(h.id),
        kamar: String(h.kamar),
        tipe: String(h.tipe),
        status: h.status as ToneLabel,
        petugas: String(h.petugas),
        waktu: String(h.waktu),
    }));

    const columns: Column<Housekeeping>[] = [
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        { key: 'tipe', header: 'Tipe', mobileHidden: true, sortValue: (r) => r.tipe },
        {
            key: 'status',
            header: 'Kebersihan',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
        { key: 'petugas', header: 'Petugas', sortValue: (r) => r.petugas },
        { key: 'waktu', header: 'Selesai', mobileHidden: true },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Kebersihan',
            options: [
                { value: 'Bersih', label: 'Bersih' },
                { value: 'Kotor', label: 'Kotor' },
                { value: 'Perlu Linen', label: 'Perlu Linen' },
                { value: 'Dalam Perbaikan', label: 'Dalam Perbaikan' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Housekeeping"
                description="Status kebersihan tiap kamar dan petugas yang bertanggung jawab."
                breadcrumbs={[{ label: 'Hotel & Villa', href: '/hotel' }, { label: 'Housekeeping' }]}
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Status Kebersihan Kamar</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['kamar', 'petugas']}
                        filters={filters}
                        pageSize={15}
                        emptyTitle="Belum ada jadwal housekeeping"
                        emptyDescription="Jadwal pembersihan kamar muncul setelah dibuat dari halaman Housekeeping."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
