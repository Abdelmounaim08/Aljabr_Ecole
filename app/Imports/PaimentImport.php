<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;

use App\Models\Paiment;

class PaimentImport implements ToModel, WithHeadingRow
{
    private $rowCount = 0;

    public function model(array $row)
    {
        if (!empty($row['CNE']) && !empty($row['moisPaiment'])) {
            $moisPaiment = Carbon::createFromFormat('m/j/Y', $row['moisPaiment'])->format('F');

            Paiment::create([
                'CNE' => $row['CNE'],
                'moisPaiment' => $moisPaiment,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);

            $this->rowCount++;
            
        }

        // Retourner null pour les lignes vides ou invalides
        return null;
    }

    public function getRowCount()
    {
        return $this->rowCount;
    }
}
 /*public function importExcel(Request $request)
    {
        $file = $request->file('your_file');
        Excel::import(new PaymentsImport, $file);
        
        // Autres opérations après l'importation...
    }*/