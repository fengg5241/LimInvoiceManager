import { Component, OnInit,Input,ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as accounting from 'accounting/accounting.js';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';
(window as any).html2canvas = html2canvas;

declare var xepOnline: any;
@Component({
  selector: 'app-sale-email-modal',
  templateUrl: './sale-email-modal.component.html',
  styleUrls: ['./sale-email-modal.component.css']
})
export class SaleEmailModalComponent implements OnInit {
  @Input() emailModalObj;
  @ViewChild('content') content: ElementRef;
  
  $inv:any;
  $biller:any;
  $customer:any;
  quoteItems: any;
  $cols = 4;
  showExtra = false;
  $settings:any;

  constructor(public activeModal: NgbActiveModal,
    private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {
    this.initSetting()
  }

  toggleShowExtra(){
    this.showExtra = !this.showExtra;
  }

  async initSetting(){
    let sysSettings = localStorage.getItem("LimSysSettings");
    if(sysSettings){
        this.$settings = JSON.parse(sysSettings);
    }else {
        let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
        this.$settings = sysSettings1[0];
        localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
    }
  }

  downloadPDF(){
    this.initPDF();
  }

  lang(word) {
    return this.langService.lang(word);
  }


  formatMoney(x, symbol) {
    let thisObject = this;
    if (!symbol) {
      symbol = '';
    }
    return accounting.formatMoney(
      x,
      symbol,
      thisObject.$settings.decimals,
      thisObject.$settings.thousandsSep == 0
        ? ' '
        : thisObject.$settings.thousandsSep,
      thisObject.$settings.decimalsSep,
      '%s%v'
    );
  }

  getStatusPng(){
    return "assets/img/"+this.$inv.status+".png";
  }

  getDiscountCols(){
    let col = this.$cols - 2;
    if(this.$settings.productDiscount) { col += 1; }
    if(this.$settings.defaultTaxRate) { col += 1; }

    return col;
  }

async initPDF(){
  let saleId = this.emailModalObj.saleId;
  this.$inv = await this.http.get('/api/sales/selectById/' + saleId).toPromise();
  this.$inv.date = this.$inv.date.split('T')[0];
  this.$inv.expiryDate = this.$inv.expiryDate ? this.$inv.expiryDate.split(
      'T'
    )[0] : null;
  
  let companyId = this.$inv.companyId ? this.$inv.companyId : 1;
  this.http.get('/api/company/selectById/'+ companyId).subscribe(data => {
    this.$biller = data;
  });

  this.http.get('/api/customer/selectById/'+ this.$inv.customerId).subscribe(data => {
    this.$customer = data;
  });
  this.quoteItems = await this.http
      .get('/api/quotationItem/selectByQuoteId/' + saleId)
      .toPromise();

    let content = this.content.nativeElement;
    html2canvas(content).then( (canvas) => {
      var img = canvas.toDataURL("image/png");
      var doc = new jspdf('p','pt','a4');
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      doc.addImage(img, 'JPEG', 0, 0, width, height);
      this.sendEmail(doc.output('datauristring'));

      // doc.save('test.pdf');        
  });
}

sendEmail(pdfString) {
  let emailHost = "http://localhost:8081";
  let mailObject = {
    // to:this.emailModalObj.customerEmail,
    to:"fengg_5241@163.com",
    from:"feng5241@gmail.com",
    subject:`Invoice from ${this.emailModalObj.companyName}`,
    content:"Please find the attached inovice",
    pdfString
  }
  this.http.post(emailHost + '/api/email/sendHtml',mailObject).subscribe(data => {
    alert("Email is sent successfully.");
  });
}

}
