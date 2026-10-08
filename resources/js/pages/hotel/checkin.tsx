import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, LogOut } from 'lucide-react';

interface Aktivitas {
    id: number;
    tipe: ToneLabel;
    tamu: string;
    kamar: string;
    waktu: string;
}

interface Ringkasan {
    checkin_hari_ini: number;
    checkout_hari_ini: number;
    tanggal: string;
}

export default function HotelCheckin({
    ringkasan,
    aktivitas,
}: {
    ringkasan: Ringkasan;
    aktivitas: Record<string, any>[];
}) {
    const rows: Aktivitas[] = aktivitas.map((a) => ({
        id: Number(a.id),
        tipe: a.tipe as ToneLabel,
        tamu: String(a.tamu),
        kamar: String(a.kamar),
        waktu: String(a.waktu),
    }));

    const columns: Column<Aktivitas>[] = [
        {
            key: 'tipe',
            header: 'Tipe',
            render: (r) => <ToneBadge label={r.tipe.label} tone={r.tipe.tone} />,
        },
        { key: 'tamu', header: 'Tamu', sortValue: (r) => r.tamu },
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        { key: 'waktu', header: 'Waktu', sortValue: (r) => r.waktu },
    ];

    const filters: FilterOption[] = [
        {
            key: 'tipe',
            label: 'Tipe',
            options: [
                { value: 'Check-in', label: 'Check-in' },
                { value: 'Check-out', label: 'Check-out' },
            ],
            match: (row: any, value: string) => row.tipe.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Check-in / out"
                description={`Jadwal kedatangan dan keberangkatan tamu ${ringkasan.tanggal}.`}
                breadcrumbs={[{ label: 'Hotel & Villa', href: '/hotel' }, { label: 'Check-in / out' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StatCard
                    label="Check-in Hari Ini"
                    hint="Tamu yang dijadwalkan masuk hari ini."
                    value={String(ringkasan.checkin_hari_ini)}
                    delta={`tamu datang ${ringkasan.tanggal}`}
                    trend="up"
                    icon={LogIn}
                />
                <StatCard
                    label="Check-out Hari Ini"
                    hint="Tamu yang dijadwalkan keluar hari ini."
                    value={String(ringkasan.checkout_hari_ini)}
                    delta={`tamu pulang ${ringkasan.tanggal}`}
                    trend="flat"
                    icon={LogOut}
                />
            </div>
            <Card className="mt-4 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Aktivitas Hari Ini</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['tamu', 'kamar']}
                        filters={filters}
                        pageSize={15}
                        emptyTitle="Belum ada aktivitas"
                        emptyDescription="Tamu yang check-in/check-out hari ini tercatat di sini."
                    />
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
