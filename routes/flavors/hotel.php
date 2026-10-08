<?php

use App\Http\Controllers\Web\HotelController;
use Illuminate\Support\Facades\Route;

Route::prefix('hotel')->name('hotel.')->group(function () {
    Route::get('/', [HotelController::class, 'index'])->name('index');
    Route::get('/reservasi', [HotelController::class, 'reservasi'])->name('reservasi');
    Route::get('/kamar', [HotelController::class, 'kamar'])->name('kamar');
    Route::get('/checkin', [HotelController::class, 'checkin'])->name('checkin');
    Route::get('/housekeeping', [HotelController::class, 'housekeeping'])->name('housekeeping');
    Route::get('/laporan', [HotelController::class, 'laporan'])->name('laporan');
});
