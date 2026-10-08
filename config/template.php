<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "hotel".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'hotel'),

    'flavors' => array (
  'hotel' => 
  array (
    'label' => 'Hotel & Villa',
    'brand_name' => 'STAYKU',
    'brand_tagline' => 'Manajemen hotel & villa',
    'brand_initials' => 'ST',
    'accent' => '#1e3a8a',
    'category' => 'properti',
    'home' => 'hotel.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Hotel',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/hotel',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Reservasi',
              'to' => '/hotel/reservasi',
              'icon' => 'CalendarCheck',
            ),
            2 => 
            array (
              'label' => 'Kamar',
              'to' => '/hotel/kamar',
              'icon' => 'BedDouble',
            ),
            3 => 
            array (
              'label' => 'Check-in/out',
              'to' => '/hotel/checkin',
              'icon' => 'ArrowLeftRight',
            ),
            4 => 
            array (
              'label' => 'Housekeeping',
              'to' => '/hotel/housekeeping',
              'icon' => 'Sparkles',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/hotel/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
