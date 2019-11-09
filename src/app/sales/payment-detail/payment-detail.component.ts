import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as accounting from 'accounting/accounting.js';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import { UserSessionService } from '../../user-session.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {
  @Input() saleId;
  @Input() customerId;
  @Input() paymentId;
  user:any;
  curPayment:any;
  newPayment = {
    invoiceId:'',
    customerId:0,
    date: new Date().toISOString().split('T')[0],
    note:"",
    amount:"",
    user:"",
    transactionId:""
  };

  isNew = true;

  constructor( public activeModal: NgbActiveModal,
    private userSessionService: UserSessionService,
    private langService: LangService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {

    this.user = JSON.parse(this.userSessionService.getUserInfo());
    if(this.paymentId){
      this.isNew = false;
      this.http.get('/api/payment/selectById/'+this.paymentId).subscribe(data => {
        this.curPayment = data;
        this.curPayment.date = this.curPayment.date.split('T')[0];
      });
    }else {
      this.curPayment= Object.assign({}, this.newPayment);
    }
    

  }

  save(){
    this.curPayment.user = this.user.username;
    this.curPayment.invoiceId = this.saleId;
    this.curPayment.customerId = this.customerId;

    if(this.isNew){
      this.http.post('/api/payment/insert',this.curPayment).subscribe(data => {
        this.activeModal.dismiss('Cross click');
      });
    }else{
      this.http.post('/api/payment/update',this.curPayment).subscribe(data => {
        this.activeModal.dismiss('Cross click');
      });
    }
  }

  lang(word){
    return this.langService.lang(word);
  }

}
