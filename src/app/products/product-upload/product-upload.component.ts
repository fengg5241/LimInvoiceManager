import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  $page_title = 'Import Products by CSV file';
  parsedCSV = null;
  
  constructor(private langService:LangService,
    private papaParse: Papa) { }

  ngOnInit() {
    // let csvData = '"Hello","World!"';
    //     let options = {
    //         complete: (results, file) => {
    //             console.log('Parsed: ', results, file);
    //         }
    //         // Add your options     here
    //     };

    //     this.papa.parse(csvData,options);
  }

  parse(files: FileList): void {
    const file: File = files.item(0);
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = e => {
        const csv = reader.result;
        this.parsedCSV = this.papaParse.parse(csv, { header: false,skipEmptyLines:true });
        console.log(this.parsedCSV);
        // do something with parsed C SV
    }
}

save(){
  var files = $('#csv_file')[0].files;
  console.log(files);
}

lang(word){
  return this.langService.lang(word);
}

}
