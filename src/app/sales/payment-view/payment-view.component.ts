import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as accounting from 'accounting/accounting.js';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import { UserSessionService } from '../../user-session.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {

  @Input() saleId;
  @Input() customerId;
  @Input() companyId;
  @Input() paymentInfo;
  
  $biller:any;
  $customer:any;

  constructor(public activeModal: NgbActiveModal,
    private userSessionService: UserSessionService,
    private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {
    let companyId = this.companyId ? this.companyId : 1;
    this.http.get('/api/company/selectById/'+ companyId).subscribe(data => {
      this.$biller = data;
    });

    this.http.get('/api/customer/selectById/'+ this.customerId).subscribe(data => {
      this.$customer = data;
    });
  }

  lang(word) {
    return this.langService.lang(word);
  }

  dateStringFormat(dateString){
    let result = "";
    if(dateString){
      result = dateString.split('T')[0];
    }
    return result;
  }
  
}
