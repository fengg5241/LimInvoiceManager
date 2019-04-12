import { Component, OnInit } from '@angular/core';
import { LangService } from '../lang.service';
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

  $page_title = "Products";
  $Settings = {
    rows_per_page:10
  }
  $users:any;
  sim = {
    in_group:{
      admin:true
    }
  }
  constructor(private langService:LangService) { }

  ngOnInit() {
    let thisObject = this;
    $(document).ready(function() {

      $('#fileData').dataTable( {
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "aaSorting": [[ 0, "asc" ]],
        "iDisplayLength": 10,
        "oTableTools": {
            // "sSwfPath": "<?= $assets; ?>media/swf/copy_csv_xls_pdf.swf",
            "aButtons": [ "csv", "xls", { "sExtends": "pdf", "sPdfOrientation": "landscape", "sPdfMessage": "" }, "print" ]
        },
        "aoColumns": [ null, null, null, null, null, { "bSortable": false } ]
    });
  
  });
  }

  lang(word){
    return this.langService.lang(word);
  }

  displayUserGroups(user){
    let groups = "";
    for(let i = 0 ;i < user.groups.length; i++){
      if(i == 0){
        groups = user.groups[i].description;
      }else {
        groups += "," +  user.groups[i].description;
      }
    }
    return groups;
  }

}
