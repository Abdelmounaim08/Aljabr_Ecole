<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EleveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      $eleves=[
        
            'name'=>'Elabiade',
            'prenom'=>'Abdelmounaim',
            'CIN'=>'DI1164',
            'Massar'=>'M130102530',
            'dateNaissance'=>'2003-04-01',
            'id_ecole'=>'1',
            'email'=>'abdomel2002@gmail.com',
            'class'=> 3,
            
        
      ];
    }
}
