import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as accounting from 'accounting/accounting.js';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import { UserSessionService } from '../../user-session.service';
import { ActivatedRoute,Router } from '@angular/router';
import {PaymentViewComponent} from '../payment-view/payment-view.component'
import {PaymentDetailComponent} from '../payment-detail/payment-detail.component'

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  @Input() saleId;
  @Input() customerId;
  @Input() companyId;
  payments:any;
  
  constructor(public activeModal: NgbActiveModal,
    private userSessionService: UserSessionService,
    private langService: LangService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpClient) { }

  ngOnInit() {
      this.http.get('/api/payment/selectAllBySaleId/'+this.saleId).subscribe(data => {
        this.payments = data;
      });
  }
  
  dateStringFormat(dateString){
    let result = "";
    if(dateString){
      result = dateString.split('T')[0];
    }
    return result;
  }

  opeViewPaymentModal(paymentId){
    const modalRef = this.modalService.open(PaymentViewComponent);
    modalRef.componentInstance.saleId = this.saleId;
    modalRef.componentInstance.companyId = this.companyId;
    modalRef.componentInstance.customerId = this.customerId;
    modalRef.componentInstance.paymentInfo = this._getSelectedPayment(paymentId);
  }

  _getSelectedPayment(paymentId){
    let payment = null;
    this.payments.forEach(e => {
      if(e.id == paymentId){
        payment = e;
      }
    });
    return payment;
  }

  opeEditPaymentModal(paymentId){
    this.activeModal.dismiss('Cross click');
    const modalRef = this.modalService.open(PaymentDetailComponent);
    modalRef.componentInstance.saleId = this.saleId;
    modalRef.componentInstance.customerId = this.customerId;
    modalRef.componentInstance.paymentId = paymentId;
  }
}
