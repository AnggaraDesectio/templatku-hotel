import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, LogIn, Percent, Wallet } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Reservasi {
    id: number;
    tamu: string;
    kamar: string;
    checkin: string;
    checkout: string;
    status: ToneLabel;
}

interface Ringkasan {
    total_kamar: number;
    terisi: number;
    kosong: number;
    okupansi_persen: number;
    checkin_hari_ini: number;
    checkout_hari_ini: number;
    revenue_hari_ini: string;
    tanggal: string;
}

export default function HotelIndex({
    ringkasan,
    okupansi,
    reservasi,
}: {
    ringkasan: Ringkasan;
    okupansi: ChartData;
    reservasi: Record<string, any>[];
}) {
    const rows: Reservasi[] = reservasi.map((r) => ({
        id: Number(r.id),
        tamu: String(r.tamu),
        kamar: String(r.kamar),
        checkin: String(r.checkin),
        checkout: String(r.checkout),
        status: r.status as ToneLabel,
    }));

    const columns: Column<Reservasi>[] = [
        { key: 'tamu', header: 'Tamu', sortValue: (r) => r.tamu },
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        { key: 'checkin', header: 'Check-in', mobileHidden: true },
        { key: 'checkout', header: 'Check-out', mobileHidden: true },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Hotel & Villa"
                description="Pantau hunian, check-in hari ini, dan kamar yang perlu dibersihkan."
                actions={
                    <Button size="sm" asChild>
                        <Link href="/hotel/reservasi">Buat Reservasi</Link>
                    </Button>
                }
                breadcrumbs={[{ label: 'Hotel & Villa' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Kamar"
                    value={String(ringkasan.total_kamar)}
                    delta={`${ringkasan.terisi} terisi · ${ringkasan.kosong} kosong`}
                    trend="flat"
                    icon={BedDouble}
                    hint="Seluruh kamar hotel dan villa yang dikelola."
                />
                <StatCard
                    label={`Check-in ${ringkasan.tanggal}`}
                    value={String(ringkasan.checkin_hari_ini)}
                    delta={`${ringkasan.checkout_hari_ini} check-out hari ini`}
                    trend="up"
                    icon={LogIn}
                    hint="Tamu yang dijadwalkan masuk dan keluar hari ini."
                />
                <StatCard
                    label="Okupansi"
                    value={`${ringkasan.okupansi_persen}%`}
                    delta={`${ringkasan.terisi} dari ${ringkasan.total_kamar} kamar`}
                    trend="up"
                    icon={Percent}
                    hint="Porsi kamar yang terisi dari total kamar."
                />
                <StatCard
                    label="Revenue Hari Ini"
                    value={ringkasan.revenue_hari_ini}
                    delta="dari kamar terisi"
                    trend="up"
                    icon={Wallet}
                    hint="Pendapatan dari kamar yang terisi hari ini."
                />
            </div>
            <div className="mt-4">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Okupansi Kamar</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Persentase kamar terisi dalam 6 bulan terakhir.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={okupansi} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['tamu', 'kamar']}
                    emptyTitle="Belum ada reservasi"
                    emptyDescription="Reservasi tamu dibuat di halaman Reservasi."
                />
            </div>
        </AuthenticatedLayout>
    );
}
