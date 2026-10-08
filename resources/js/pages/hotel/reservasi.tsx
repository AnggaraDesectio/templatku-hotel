import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

interface Reservasi {
    id: number;
    tamu: string;
    kamar: string;
    checkin: string;
    checkout: string;
    status: ToneLabel;
}

export default function HotelReservasi({ reservasis }: { reservasis: Record<string, any>[] }) {
    const [rows, setRows] = useState<Reservasi[]>(() =>
        reservasis.map((r) => ({
            id: Number(r.id),
            tamu: String(r.tamu),
            kamar: String(r.kamar),
            checkin: String(r.checkin),
            checkout: String(r.checkout),
            status: r.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ tamu: '', kamar: '', checkin: '', checkout: '' });
    const [statusRow, setStatusRow] = useState<Reservasi | null>(null);
    const [statusVal, setStatusVal] = useState('');

    const STATUS_OPTIONS = [
        { value: 'Terkonfirmasi', tone: 'info' as const },
        { value: 'Check-in', tone: 'success' as const },
        { value: 'Check-out', tone: 'success' as const },
        { value: 'Batal', tone: 'destructive' as const },
    ];

    const fmtTanggal = (iso: string) =>
        iso
            ? new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
            : '-';

    const save = () => {
        const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
        setRows((prev) => [
            ...prev,
            {
                id,
                tamu: form.tamu,
                kamar: form.kamar,
                checkin: fmtTanggal(form.checkin),
                checkout: fmtTanggal(form.checkout),
                status: { label: 'Terkonfirmasi', tone: 'info' as const },
            },
        ]);
        toast.success(`Reservasi untuk ${form.tamu} dicatat.`);
        setForm({ tamu: '', kamar: '', checkin: '', checkout: '' });
        setOpen(false);
    };

    const saveStatus = () => {
        if (!statusRow) return;
        const opt = STATUS_OPTIONS.find((o) => o.value === statusVal) ?? STATUS_OPTIONS[0];
        setRows((prev) =>
            prev.map((r) => (r.id === statusRow.id ? { ...r, status: { label: opt.value, tone: opt.tone } } : r)),
        );
        toast.success(`Reservasi ${statusRow.tamu} kini ${opt.value.toLowerCase()}.`);
        setStatusRow(null);
    };

    const set = (key: 'tamu' | 'kamar' | 'checkin' | 'checkout') => (e: { target: { value: string } }) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const columns: Column<Reservasi>[] = [
        { key: 'tamu', header: 'Tamu', sortValue: (r) => r.tamu },
        { key: 'kamar', header: 'Kamar', sortValue: (r) => r.kamar },
        { key: 'checkin', header: 'Check-in', sortValue: (r) => r.checkin },
        { key: 'checkout', header: 'Check-out', mobileHidden: true },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Check-in', label: 'Check-in' },
                { value: 'Check-out', label: 'Check-out' },
                { value: 'Terjadwal', label: 'Terjadwal' },
                { value: 'Selesai', label: 'Selesai' },
                { value: 'Batal', label: 'Batal' },
            ],
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Reservasi"
                description="Semua reservasi tamu: check-in, check-out, dan yang terjadwal."
                breadcrumbs={[{ label: 'Hotel & Villa', href: '/hotel' }, { label: 'Reservasi' }]}
                actions={
                    <Button size="sm" onClick={() => setOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Reservasi Baru
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Reservasi</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['tamu', 'kamar']}
                        filters={filters}
                        pageSize={15}
                        onEdit={(row) => {
                            setStatusRow(row);
                            setStatusVal(row.status.label);
                        }}
                        emptyTitle="Belum ada reservasi"
                        emptyDescription="Belum ada reservasi, buat lewat tombol Buat Reservasi di atas."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buat Reservasi</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="tamu">Nama tamu</Label>
                                <Input id="tamu" value={form.tamu} onChange={set('tamu')} placeholder="cth: Bpk. Hartono" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="kamar">Kamar</Label>
                                <Input id="kamar" value={form.kamar} onChange={set('kamar')} placeholder="cth: 101" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="checkin">Tanggal check-in</Label>
                                <Input id="checkin" type="date" value={form.checkin} onChange={set('checkin')} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="checkout">Tanggal check-out</Label>
                                <Input id="checkout" type="date" value={form.checkout} onChange={set('checkout')} />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>Batal</Button>
                        <Button onClick={save} disabled={!form.tamu.trim() || !form.checkin || !form.checkout}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={statusRow !== null} onOpenChange={(v) => !v && setStatusRow(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ubah Status, {statusRow?.tamu}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-2 py-2">
                        <Label>Status reservasi</Label>
                        <Select value={statusVal} onValueChange={setStatusVal}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map((o) => (
                                    <SelectItem key={o.value} value={o.value}>{o.value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setStatusRow(null)}>Batal</Button>
                        <Button onClick={saveStatus}>Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
