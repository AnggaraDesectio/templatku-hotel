<?php

namespace App\Support\Demo;

/**
 * Data demo hotel & villa (STAYKU): kamar, reservasi, aktivitas harian,
 * housekeeping, laporan.
 * Semua angka ditulis eksplisit supaya total konsisten antar halaman.
 * Kontrak status: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 */
class HotelData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    /** Baris mentah kamar (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function kamarRows(): array
    {
        return [
            ['id' => 1,  'nomor' => '101', 'tipe' => 'Superior', 'harga' => 650000,  'status' => 'terisi', 'gambar' => '/images/hotel/kamar-1.jpg'],
            ['id' => 2,  'nomor' => '102', 'tipe' => 'Superior', 'harga' => 650000,  'status' => 'terisi', 'gambar' => '/images/hotel/kamar-2.jpg'],
            ['id' => 3,  'nomor' => '103', 'tipe' => 'Superior', 'harga' => 650000,  'status' => 'kosong', 'gambar' => '/images/hotel/kamar-1.jpg'],
            ['id' => 4,  'nomor' => '104', 'tipe' => 'Deluxe',   'harga' => 950000,  'status' => 'terisi', 'gambar' => '/images/hotel/kamar-3.jpg'],
            ['id' => 5,  'nomor' => '105', 'tipe' => 'Deluxe',   'harga' => 950000,  'status' => 'kosong', 'gambar' => '/images/hotel/kamar-4.jpg'],
            ['id' => 6,  'nomor' => '106', 'tipe' => 'Deluxe',   'harga' => 950000,  'status' => 'terisi', 'gambar' => '/images/hotel/kamar-3.jpg'],
            ['id' => 7,  'nomor' => '107', 'tipe' => 'Suite',    'harga' => 1750000, 'status' => 'terisi', 'gambar' => '/images/hotel/kamar-5.jpg'],
            ['id' => 8,  'nomor' => '108', 'tipe' => 'Suite',    'harga' => 1750000, 'status' => 'kosong', 'gambar' => '/images/hotel/kamar-6.jpg'],
            ['id' => 9,  'nomor' => '109', 'tipe' => 'Suite',    'harga' => 1750000, 'status' => 'terisi', 'gambar' => '/images/hotel/kamar-5.jpg'],
            ['id' => 10, 'nomor' => '110', 'tipe' => 'Villa',    'harga' => 2500000, 'status' => 'terisi', 'gambar' => '/images/hotel/kamar-7.jpg'],
            ['id' => 11, 'nomor' => '111', 'tipe' => 'Villa',    'harga' => 2500000, 'status' => 'kosong', 'gambar' => '/images/hotel/kamar-8.jpg'],
            ['id' => 12, 'nomor' => '112', 'tipe' => 'Villa',    'harga' => 2500000, 'status' => 'terisi', 'gambar' => '/images/hotel/kamar-7.jpg'],
        ];
    }

    /** Baris mentah reservasi (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function reservasiRows(): array
    {
        return [
            ['id' => 1,  'tamu' => 'Ahmad Hidayat', 'kamar_id' => 1,  'checkin' => '6 Okt 2026',  'checkout' => '9 Okt 2026',  'status' => 'checkin'],
            ['id' => 2,  'tamu' => 'Nina Kurnia',   'kamar_id' => 2,  'checkin' => '7 Okt 2026',  'checkout' => '10 Okt 2026', 'status' => 'checkin'],
            ['id' => 3,  'tamu' => 'Rizky Pratama', 'kamar_id' => 4,  'checkin' => '8 Okt 2026',  'checkout' => '11 Okt 2026', 'status' => 'checkin'],
            ['id' => 4,  'tamu' => 'Sari Dewi',     'kamar_id' => 6,  'checkin' => '5 Okt 2026',  'checkout' => '8 Okt 2026',  'status' => 'checkout'],
            ['id' => 5,  'tamu' => 'Budi Santoso',  'kamar_id' => 7,  'checkin' => '8 Okt 2026',  'checkout' => '12 Okt 2026', 'status' => 'checkin'],
            ['id' => 6,  'tamu' => 'Lina Marlina',  'kamar_id' => 9,  'checkin' => '6 Okt 2026',  'checkout' => '8 Okt 2026',  'status' => 'checkout'],
            ['id' => 7,  'tamu' => 'Dedi Hermawan', 'kamar_id' => 10, 'checkin' => '4 Okt 2026',  'checkout' => '9 Okt 2026',  'status' => 'checkin'],
            ['id' => 8,  'tamu' => 'Fitri Rahma',   'kamar_id' => 12, 'checkin' => '8 Okt 2026',  'checkout' => '10 Okt 2026', 'status' => 'checkin'],
            ['id' => 9,  'tamu' => 'Agus Setiawan', 'kamar_id' => 3,  'checkin' => '9 Okt 2026',  'checkout' => '11 Okt 2026', 'status' => 'terjadwal'],
            ['id' => 10, 'tamu' => 'Rina Amelia',   'kamar_id' => 5,  'checkin' => '10 Okt 2026', 'checkout' => '13 Okt 2026', 'status' => 'terjadwal'],
            ['id' => 11, 'tamu' => 'Hendra Wijaya', 'kamar_id' => 8,  'checkin' => '2 Okt 2026',  'checkout' => '5 Okt 2026',  'status' => 'selesai'],
            ['id' => 12, 'tamu' => 'Maya Putri',    'kamar_id' => 11, 'checkin' => '1 Okt 2026',  'checkout' => '3 Okt 2026',  'status' => 'batal'],
        ];
    }

    /** Baris mentah status housekeeping per kamar, dipakai internal agar tidak rekursi. */
    private static function housekeepingRows(): array
    {
        return [
            ['id' => 1,  'kamar_id' => 1,  'status' => 'bersih',     'petugas' => 'Slamet', 'waktu' => '08.00'],
            ['id' => 2,  'kamar_id' => 2,  'status' => 'linen',      'petugas' => 'Slamet', 'waktu' => '09.30'],
            ['id' => 3,  'kamar_id' => 3,  'status' => 'bersih',     'petugas' => 'Dina',   'waktu' => '08.15'],
            ['id' => 4,  'kamar_id' => 4,  'status' => 'kotor',      'petugas' => 'Dina',   'waktu' => '-'],
            ['id' => 5,  'kamar_id' => 5,  'status' => 'bersih',     'petugas' => 'Slamet', 'waktu' => '08.45'],
            ['id' => 6,  'kamar_id' => 6,  'status' => 'linen',      'petugas' => 'Dina',   'waktu' => '09.00'],
            ['id' => 7,  'kamar_id' => 7,  'status' => 'bersih',     'petugas' => 'Slamet', 'waktu' => '07.30'],
            ['id' => 8,  'kamar_id' => 8,  'status' => 'perbaikan',  'petugas' => 'Teknis', 'waktu' => '07.00'],
            ['id' => 9,  'kamar_id' => 9,  'status' => 'kotor',      'petugas' => 'Dina',   'waktu' => '-'],
            ['id' => 10, 'kamar_id' => 10, 'status' => 'bersih',     'petugas' => 'Slamet', 'waktu' => '07.45'],
            ['id' => 11, 'kamar_id' => 11, 'status' => 'bersih',     'petugas' => 'Dina',   'waktu' => '08.30'],
            ['id' => 12, 'kamar_id' => 12, 'status' => 'linen',      'petugas' => 'Slamet', 'waktu' => '09.15'],
        ];
    }

    private static function statusKamar(string $key): array
    {
        return $key === 'terisi'
            ? ['label' => 'Terisi', 'tone' => 'success']
            : ['label' => 'Kosong', 'tone' => 'info'];
    }

    private static function statusReservasi(string $key): array
    {
        return match ($key) {
            'checkin'    => ['label' => 'Check-in',  'tone' => 'success'],
            'checkout'   => ['label' => 'Check-out', 'tone' => 'warning'],
            'terjadwal'  => ['label' => 'Terjadwal', 'tone' => 'info'],
            'selesai'    => ['label' => 'Selesai',   'tone' => 'info'],
            'batal'      => ['label' => 'Batal',     'tone' => 'destructive'],
            default      => ['label' => $key, 'tone' => 'info'],
        };
    }

    private static function statusKebersihan(string $key): array
    {
        return match ($key) {
            'bersih'    => ['label' => 'Bersih',          'tone' => 'success'],
            'kotor'     => ['label' => 'Kotor',           'tone' => 'destructive'],
            'linen'     => ['label' => 'Perlu Linen',     'tone' => 'warning'],
            'perbaikan' => ['label' => 'Dalam Perbaikan', 'tone' => 'info'],
            default     => ['label' => $key, 'tone' => 'info'],
        };
    }

    /** Daftar kamar lengkap dengan harga per malam. */
    public static function kamars(): array
    {
        return array_map(fn ($k) => [
            'id'       => $k['id'],
            'nomor'    => $k['nomor'],
            'tipe'     => $k['tipe'],
            'harga'    => $k['harga'],
            'harga_rp' => self::rp($k['harga']),
            'status'   => self::statusKamar($k['status']),
            'gambar'   => $k['gambar'] ?? null,
        ], self::kamarRows());
    }

    /** Daftar reservasi lengkap dengan nomor kamar tamu. */
    public static function reservasis(): array
    {
        $nomor = [];
        foreach (self::kamarRows() as $k) {
            $nomor[$k['id']] = $k['nomor'];
        }

        return array_map(fn ($r) => [
            'id'       => $r['id'],
            'tamu'     => $r['tamu'],
            'kamar'    => $nomor[$r['kamar_id']] ?? '-',
            'checkin'  => $r['checkin'],
            'checkout' => $r['checkout'],
            'status'   => self::statusReservasi($r['status']),
        ], self::reservasiRows());
    }

    /** 6 reservasi terbaru untuk dashboard. */
    public static function reservasiTerbaru(): array
    {
        return array_slice(self::reservasis(), 0, 6);
    }

    /** Aktivitas check-in / check-out hari ini (8 Okt 2026). */
    public static function aktivitasHariIni(): array
    {
        return [
            ['id' => 1, 'tipe' => ['label' => 'Check-in', 'tone' => 'success'],  'tamu' => 'Rizky Pratama', 'kamar' => '104', 'waktu' => '09.15'],
            ['id' => 2, 'tipe' => ['label' => 'Check-out', 'tone' => 'warning'], 'tamu' => 'Sari Dewi',     'kamar' => '106', 'waktu' => '10.30'],
            ['id' => 3, 'tipe' => ['label' => 'Check-in', 'tone' => 'success'],  'tamu' => 'Budi Santoso',  'kamar' => '107', 'waktu' => '11.40'],
            ['id' => 4, 'tipe' => ['label' => 'Check-out', 'tone' => 'warning'], 'tamu' => 'Lina Marlina',  'kamar' => '109', 'waktu' => '12.00'],
            ['id' => 5, 'tipe' => ['label' => 'Check-in', 'tone' => 'success'],  'tamu' => 'Fitri Rahma',   'kamar' => '112', 'waktu' => '13.05'],
        ];
    }

    /** Status kebersihan tiap kamar. */
    public static function housekeeping(): array
    {
        $kamars = [];
        foreach (self::kamarRows() as $k) {
            $kamars[$k['id']] = $k;
        }

        return array_map(function ($h) use ($kamars) {
            $k = $kamars[$h['kamar_id']];

            return [
                'id'       => $h['id'],
                'kamar'    => $k['nomor'],
                'tipe'     => $k['tipe'],
                'status'   => self::statusKebersihan($h['status']),
                'petugas'  => $h['petugas'],
                'waktu'    => $h['waktu'],
            ];
        }, self::housekeepingRows());
    }

    /** Ringkasan angka untuk kartu statistik (dihitung dari data). */
    public static function ringkasan(): array
    {
        $kamars   = self::kamarRows();
        $terisi   = count(array_filter($kamars, fn ($k) => $k['status'] === 'terisi'));
        $total    = count($kamars);
        $okupansi = $total > 0 ? (int) round($terisi / $total * 100) : 0;
        $revenue  = array_sum(array_map(
            fn ($k) => $k['status'] === 'terisi' ? $k['harga'] : 0, $kamars
        ));

        $aktivitas = self::aktivitasHariIni();
        $checkin   = count(array_filter($aktivitas, fn ($a) => $a['tipe']['label'] === 'Check-in'));
        $checkout  = count(array_filter($aktivitas, fn ($a) => $a['tipe']['label'] === 'Check-out'));

        return [
            'total_kamar'       => $total,
            'terisi'            => $terisi,
            'kosong'            => $total - $terisi,
            'okupansi_persen'   => $okupansi,
            'checkin_hari_ini'  => $checkin,
            'checkout_hari_ini' => $checkout,
            'revenue_hari_ini'  => self::rp($revenue),
            'tanggal'           => '8 Okt 2026',
        ];
    }

    /** Tren okupansi 6 bulan (%) untuk area chart. */
    public static function okupansiChart(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Okupansi (%)', 'data' => [62, 65, 68, 64, 70, 67]]],
        ];
    }

    /** Revenue per bulan (juta Rp) untuk bar chart. */
    public static function revenuePerBulan(): array
    {
        return [
            'labels'   => ['Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
            'datasets' => [['label' => 'Revenue (juta Rp)', 'data' => [318, 342, 365, 348, 372, 386]]],
        ];
    }

    /** Distribusi status kamar untuk donut chart. */
    public static function distribusiStatusKamar(): array
    {
        $terisi = count(array_filter(self::kamarRows(), fn ($k) => $k['status'] === 'terisi'));

        return [
            'labels'   => ['Terisi', 'Kosong'],
            'datasets' => [['label' => 'Kamar', 'data' => [$terisi, count(self::kamarRows()) - $terisi]]],
        ];
    }
}
