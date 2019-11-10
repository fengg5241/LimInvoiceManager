import { Component, OnInit } from '@angular/core';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-notes-setting',
  templateUrl: './notes-setting.component.html',
  styleUrls: ['./notes-setting.component.css']
})
export class NotesSettingComponent implements OnInit {

  $page_title = "Notes";

  constructor(private langService: LangService) { }

  ngOnInit() {
    let thisObject = this;
    $(document).ready(function() {
      $('#fileData').dataTable( {
          "LengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
          "ordering": [[ 0, "asc" ]],
          "Length": 10,
          retrieve: true,
          "columns": [ { "bSortable": false }, null, null, { "bSortable": false } ]
      });

      $(document).on('click', '.edit', function() {
        var row = $(this).closest('tr');
        var desc = row.find('.description').text();
        var def = row.find('.default_sale').html() ? 1 : 0;
        var def = row.find('.default_quote').html() ? 1 : 0;
        var id = row.attr('id');
        $('#nModalLabel').text(thisObject.lang('edit_note'));
        $('#description').val(desc);
        $('#default_sale').val(def);
        $('#default_sale').trigger("chosen:updated");
        $('#default_quote').val(def);
        $('#default_quote').trigger("chosen:updated");
        $('#id').val(id);
        $('#action').val('edit');
        $('#nModal').modal();
        console.log(id, desc);
        return false;
    });

    $('.add').click(function() {
        $('#nModalLabel').text(thisObject.lang('new_note'));
        $('#action').val('add');
        $('#description').val('');
        $('#nModal').modal();
        return false;
    });

    $(document).on('click', '.delete', function() {
        var row = $(this).closest('tr');
        var id = row.attr('id');
        var con = confirm('alert_x_note');
        if (con) {
            // $.get(Site.base_url+'settings/delete_note/'+id).done(function(data) {
            //     row.remove();
            //     addAlert(data, 'success');
            // });
        }
        return false;
    });



  });


  }

  lang(word) {
    return this.langService.lang(word);
  }
}
