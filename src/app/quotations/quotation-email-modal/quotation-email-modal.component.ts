import { Component, OnInit,Input,ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';
(window as any).html2canvas = html2canvas;

declare var xepOnline: any;
@Component({
  selector: 'app-quotation-email-modal',
  templateUrl: './quotation-email-modal.component.html',
  styleUrls: ['./quotation-email-modal.component.css']
})
export class QuotationEmailModalComponent implements OnInit {
  @Input() emailModalObj;
  @ViewChild('content') content: ElementRef;

  $inv:any;
  quoteItems: any;
  showExtra = false;
  emailModal = {
    quoteId:5,
    customerEmail:"test@123.com",
    cc:null,
    bcc:null,
    subject:null,
    message:null
  };

  constructor(public activeModal: NgbActiveModal,
    private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {
    console.log(this.emailModalObj);
  }

  toggleShowExtra(){
    this.showExtra = !this.showExtra;
  }

  downloadPDF(){
    this.initPDF();
  }

  lang(word) {
    return this.langService.lang(word);
  }

async initPDF(){
    let quoteId = this.emailModalObj.quoteId;
    this.$inv = await this.http.get('/api/quotation/selectById/' + quoteId).toPromise();
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
        .get('/api/quotationItem/selectByQuoteId/' + quoteId)
        .toPromise();

        let doc = new jspdf();

    let specialElementHandlers = {
        '#editor':function(){
            return true;
        }
    }
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML,10,10,{
        'width':900,
        'elementHandlers':specialElementHandlers
    });
    doc.save("test.pdf");

    // html2canvas($("#content").html(),{
    //     onrendered: function (canvas) {

    //     }
    // });
    // html2canvas(content).then(canvas => {
    //     const doc = new jspdf('p', 'mm');
      
    //     doc.addHTML(canvas, _ => {
    //        doc.save('test.pdf');
    //     });
    //  });

    //    html2canvas($("body")[0]).then(canvasObj => {
    //     var pdf = new jspdf('l', 'pt', 'a4'),
    //         pdfConf = {
    //           pagesplit: false,
    //           background: '#fff'
    //         };
    //       document.body.appendChild(canvasObj); //appendChild is required for html to add page in pdf
    //       doc.fromHTML(canvasObj,10,10,{
    //     'width':900,
    //     'elementHandlers':specialElementHandlers
    // });
    // doc.save("test.pdf");
    //  });

    // xepOnline.Formatter.Format('content',{render:'download'});




    // html2canvas(content).then(canvas => {
    //     const doc = new jspdf('p', 'mm');
      
    //     doc.addHTML(canvas, () => {
    //        doc.save('test.pdf');
    //     });
    //  });

    // doc.addHTML(content.innerHTML,function() {
    //     doc.save('web.pdf');
    // });
        
}

}
