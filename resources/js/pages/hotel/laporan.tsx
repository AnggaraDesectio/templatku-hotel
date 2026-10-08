import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { AreaChartCard, BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Percent, Wallet } from 'lucide-react';

interface Ringkasan {
    total_kamar: number;
    terisi: number;
    okupansi_persen: number;
    checkin_hari_ini: number;
    revenue_hari_ini: string;
    tanggal: string;
}

export default function HotelLaporan({
    ringkasan,
    revenue,
    okupansi,
    distribusi,
}: {
    ringkasan: Ringkasan;
    revenue: ChartData;
    okupansi: ChartData;
    distribusi: ChartData;
}) {
    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Revenue dan okupansi hotel STAYKU enam bulan terakhir."
                breadcrumbs={[{ label: 'Hotel & Villa', href: '/hotel' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <StatCard
                    label="Revenue Hari Ini"
                    hint="Pendapatan dari kamar yang terisi hari ini."
                    value={ringkasan.revenue_hari_ini}
                    delta={ringkasan.tanggal}
                    trend="up"
                    icon={Wallet}
                />
                <StatCard
                    label="Okupansi"
                    hint="Porsi kamar yang terisi dari total kamar."
                    value={`${ringkasan.okupansi_persen}%`}
                    delta={`${ringkasan.terisi} dari ${ringkasan.total_kamar} kamar`}
                    trend="up"
                    icon={Percent}
                />
                <StatCard
                    label="Check-in Hari Ini"
                    hint="Tamu yang dijadwalkan masuk hari ini."
                    value={String(ringkasan.checkin_hari_ini)}
                    delta={ringkasan.tanggal}
                    trend="flat"
                    icon={BedDouble}
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Revenue per Bulan</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Pendapatan dalam juta rupiah.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={revenue} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Status Kamar</CardTitle>
                        <p className="text-muted-foreground text-sm">Distribusi kamar saat ini.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Tren Okupansi</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Persentase kamar terisi per bulan.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <AreaChartCard data={okupansi} />
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
