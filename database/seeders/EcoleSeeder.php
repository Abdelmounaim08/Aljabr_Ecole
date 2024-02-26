<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ecole;

class EcoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $ecoles = [
            [
                'name' => 'Ecole Al jabr Oasis',
                'description' => 'Maternelle/Elementaire

                Bis, Rue de la Pie, Oasis-Casablanca
                05 22 25 05 75
                College/lycee
                
                40, Rue Ahmed AKRAD, Oasis-Casablanca
                05 22 25 02 17',
                'image' => 'https://ecolealjabr.com/wp-content/uploads/2022/12/AJ-Oasis-Junior-nouveau-batiment-1024x513-1.png',
            ],
            [
                'name' => 'Ecole Al jabr Bouskoura',
                'description' => 'Maternelle/Elementaire

                Ville verte Bouskoura TR113 P621 –Bouskoura
                05 22 21 01 01
                College/lycee
                
                Parcelle 618, Ville Verte – Bouskoura
                05 22 99 37 09',
                'image' => 'https://ecolealjabr.com/wp-content/uploads/2022/12/Bouskoura-1-1536x1024-1.jpg',
            ],
            [
                'name' => 'Ecole Al jabr Dar Bouazza',
                'description' => 'Maternelle/Elementaire/College

                Maternelle/Elementaire/College
                07 00 02 05 24
                College/lycee
                
                Bureau d inscription Al Jabr
                06 63 78 05 03',
                'image' => 'https://ecolealjabr.com/wp-content/uploads/2022/12/Dar_Bouazza_1280x.jpg',
            ],
            // Add more schools as needed
        ];

        foreach ($ecoles as $ecole) {
            Ecole::create($ecole);
        }
    }
}
