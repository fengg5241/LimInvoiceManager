import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.html5';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  $page_title = "Users";

  $settings: any;
  users: any;
  // users = [
  //   {
  //     "id": "1",
  //     "first_name": "Admin",
  //     "last_name": "Admin",
  //     "email": "admin@igetpower.com",
  //     "phone": "0105292122",
  //     "groups": [{
  //       description: "Administrator"
  //     }]
  //   },
  //   {
  //     "id": "2",
  //     "first_name": "feng",
  //     "last_name": "shan",
  //     "email": "feng_5241@gmail.com",
  //     "phone": "985086351",
  //     "groups": [{
  //       description: "Sales Staff"
  //     }]
  //   }
  // ];
  sim = {
    in_group: {
      admin: true
    }
  }
  constructor(private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {
    this.initTable()
  }

  async initTable() {
    let sysSettings = localStorage.getItem("LimSysSettings");
    if (sysSettings) {
      this.$settings = sysSettings;
    } else {
      let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
      this.$settings = sysSettings1[0];
    }

    this.showTable();
  }

  showTable() {
    this.http.get('/api/user/selectAll').subscribe(data => {
      this.users = data;

      let thisObject = this;
      $(document).ready(function () {

        $('#fileData').dataTable({
          "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
          "aaSorting": [[0, "asc"]],
          "iDisplayLength": thisObject.$settings.rowsPerPage,
          "oTableTools": {
            // "sSwfPath": "<?= $assets; ?>media/swf/copy_csv_xls_pdf.swf",
            "aButtons": ["csv", "xls", { "sExtends": "pdf", "sPdfOrientation": "landscape", "sPdfMessage": "" }, "print"]
          },
          "aoColumns": [null, null, null, null, null, { "bSortable": false }]
        });

      });
    });
  }
  lang(word) {
    return this.langService.lang(word);
  }

  delete(id){
    this.http.get('/api/user/delete/'+id).subscribe(data => {
        this.http.get('/api/user/selectAll').subscribe(data => {
            this.users = data;
        });
    });
    
}

}
