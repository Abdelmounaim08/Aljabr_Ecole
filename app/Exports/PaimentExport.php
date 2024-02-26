<?php

namespace App\Exports;

use App\Models\Paiment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PaimentExport implements FromCollection ,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return collect  ([new Paiment()]);
        
       
    }
    public function headings(): array
    {
        return [
            'CNE', 'moisPaiment','montant'
        ];
    }
}
