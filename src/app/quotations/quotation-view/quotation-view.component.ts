import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quotation-view',
  templateUrl: './quotation-view.component.html',
  styleUrls: ['./quotation-view.component.css']
})
export class QuotationView implements OnInit {

  @Input() name;


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
