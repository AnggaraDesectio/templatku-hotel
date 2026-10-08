<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\HotelData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman hotel & villa STAYKU (Inertia). */
class HotelController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('hotel/index', [
            'ringkasan'  => HotelData::ringkasan(),
            'okupansi'   => HotelData::okupansiChart(),
            'reservasi'  => HotelData::reservasiTerbaru(),
        ]);
    }

    public function reservasi(): Response
    {
        return Inertia::render('hotel/reservasi', [
            'reservasis' => HotelData::reservasis(),
        ]);
    }

    public function kamar(): Response
    {
        return Inertia::render('hotel/kamar', [
            'kamars' => HotelData::kamars(),
        ]);
    }

    public function checkin(): Response
    {
        return Inertia::render('hotel/checkin', [
            'ringkasan' => HotelData::ringkasan(),
            'aktivitas' => HotelData::aktivitasHariIni(),
        ]);
    }

    public function housekeeping(): Response
    {
        return Inertia::render('hotel/housekeeping', [
            'housekeeping' => HotelData::housekeeping(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('hotel/laporan', [
            'ringkasan'  => HotelData::ringkasan(),
            'revenue'    => HotelData::revenuePerBulan(),
            'okupansi'   => HotelData::okupansiChart(),
            'distribusi' => HotelData::distribusiStatusKamar(),
        ]);
    }
}
