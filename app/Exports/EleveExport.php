<?php

namespace App\Exports;

use App\Models\Eleve;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class EleveExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function  collection()
    {
        return collect([new Eleve()]);
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'prenom',
            'CIN',
            'CNE',
            'dateNaissance',
            'email',
            'montant',
            'Tel',
            
            'niveau',
            'class'
        ];
    }
}
