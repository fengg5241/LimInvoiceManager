import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import * as $ from 'jquery';
import 'chosen-js';

@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.css']
})
export class QuotationDetailComponent implements OnInit {

  $companies:any;
  $customers:any;
  $settings:any;
  products:any;
  $tax_rates:any;

  dateSettings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: true
  }

  curQuotation = {
    date:new Date(),
    company:"",
    referenceNo:"",
    customer:"",
    dueDate:"",
    shipping:"",
    orderDiscount:"",
    orderTax:"",
    status:"",
    recurring:"",
    note:"",
    newCustomer:{
      company:"",
      name:"",
      phone:"",
      email:"",
      address:"",
      city:"",
      state:"",
      postalCode:"",
      country:"",
      productDiscount:"",

    },
  };

  constructor(private langService: LangService,
    private http: HttpClient) { }

  ngOnInit() {
    this.initTable()
  }

  async initTable(){
    let sysSettings = localStorage.getItem("LimSysSettings");
    if(sysSettings){
        this.$settings = sysSettings;
    }else {
        let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
        this.$settings = sysSettings1[0];
    }

    this.http.get('/api/company/selectAll').subscribe(data => {
      this.$companies = data;
    });

    this.http.get('/api/customer/selectAll').subscribe(data => {
      this.$customers = data;
    });

    this.http.get('/api/taxRate/selectAll').subscribe(data => {
      this.$tax_rates = data;
    });

    let thisObject = this;
    this.http.get('/api/quotation/selectAll').subscribe(data => {
        // this.quotations = data;
       
        function status(x) {
          switch (x) {
            case 'sent':
            return '<div class="text-center"><small><span class="label label-success">'+thisObject.lang('sent')+'</span></small></div>';
            break;
            case 'ordered':
            return '<div class="text-center"><small><span class="label label-success">'+thisObject.lang('ordered')+'</span></small></div>';
            break;
            case 'pending':
            return '<div class="text-center"><small><span class="label label-default">'+thisObject.lang('pending')+'</span></small></div>';
            break;
            default:
            return '<div class="text-center"><small><span class="label'+x+' label label-default">'+x+'</span></small></div>';
          }
        }

        let thisObject = this;
        $(document).ready(function () {

            // $('.modal').on('show.bs.modal', function (e) {
              // $( ".datetime" ).datetimepicker({format: Site.dateFormats.js_ldate, autoclose: true, weekStart: 1, showMeridian: true, todayBtn: true});
            //   $( ".date" ).datetimepicker({format: Site.dateFormats.js_sdate, autoclose: true, todayBtn: true, minView: 2});
            // })

            // $("select").chosen({no_results_text: "No results matched", disable_search_threshold: 5, allow_single_deselect:true, width: '100%'});
            // $( ".datetime" ).datetimepicker({format: Site.dateFormats.js_ldate, autoclose: true, weekStart: 1, showMeridian: true, todayBtn: true});
            // $( ".date" ).datetimepicker({format: Site.dateFormats.js_sdate, autoclose: true, todayBtn: true, minView: 2});
            $( ".datetime" ).datetimepicker({ autoclose: true, weekStart: 1, showMeridian: true, todayBtn: true});
            $( ".date" ).datetimepicker({autoclose: true, todayBtn: true, minView: 2});
            $(document).on('change', '#shipping, #order_discount, #order_tax, .quantity, .price, .discount, .tax, .tax_method', function() {
              // calculateTotal();
            });

          //   function calculateTotal() {
          //     if (typeof counter !== 'undefined') {
          //         total = 0; var row_total = 0;
          //         for (i = 1; i < (counter+1); i++) {
          //             var shipping = parseFloat($('#shipping').val() ? $('#shipping').val() : 0);
          //             var row = $('#'+i);
          //             var quantity = row.find('.quantity').val(),
          //             product = row.find('.suggestions').val(),
          //             price = row.find('.price').val(),
          //             discount = row.find('.discount').val(),
          //             tax = row.find('.tax').val(),
          //             tax_method = row.find('.tax_method').val(),
          //             subtotal = row.find('.subtotal');
          //             if (quantity && product && price) {
          //                 var product_discount = 0, product_tax = 0;
          
          //                 if(Site.Settings.product_discount > 0) {
          //                     if (discount) {
          //                         if (discount.indexOf("%") !== -1) {
          //                             var pds = discount.split("%");
          //                             if (!isNaN(pds[0])) {
          //                                 product_discount = formatDecimal((((price) * parseFloat(pds[0])) / 100), 4);
          //                             }
          //                         } else {
          //                              product_discount = formatDecimal(discount, 4);
          //                         }
          //                     }
          //                 }
          
          //                 net_unit_price = price - product_discount;
          
          //                 if(Site.Settings.default_tax_rate > 0) {
          //                     $.each(tax_rates, function () {
          //                         if (this.id == tax) {
          //                             if (this.type == 1 && this.rate != 0) {
          //                                 if (tax_method == 'inclusive') {
          //                                     product_tax = formatDecimal(((net_unit_price * this.rate) / (100 + this.rate)), 4);
          //                                     net_unit_price -= product_tax;
          //                                 } else {
          //                                     product_tax = formatDecimal(((net_unit_price * this.rate) / 100), 4);
          //                                 }
          //                             } else {
          //                                 product_tax = parseFloat(this.rate);
          //                             }
          //                         }
          //                     });
          //                 }
          //                 row_total = (net_unit_price + product_tax) * quantity;
          //                 subtotal.val(formatMoney(row_total));
          //                 total += row_total;
          //             }
          //         }
          //         $('.total_amount').text(formatMoney(total));
          //         order_discount = order_tax = 0;
          
          //         if ($('#order_discount').val()) {
          //             order_discount_val = $('#order_discount').val();
          //             if (order_discount_val.indexOf("%") !== -1) {
          //                 var pds = order_discount_val.split("%");
          //                 if (!isNaN(pds[0])) {
          //                     order_discount = formatDecimal((((total) * parseFloat(pds[0])) / 100), 4);
          //                 }
          //             } else {
          //                order_discount = formatDecimal(order_discount_val, 4);
          //             }
          //         }
          
          //         if ($('#order_tax').val()) {
          //             order_tax_val = $('#order_tax').val();
          //             $.each(tax_rates, function () {
          //                 if (this.id == order_tax_val) {
          //                     if (this.type == 1 && this.rate != 0) {
          //                         order_tax = formatDecimal((((total - order_discount) * this.rate) / 100), 4);
          //                     } else {
          //                         order_tax = parseFloat(this.rate);
          //                     }
          //                 }
          //             });
          //         }
          
          //         grand_total = (total - order_discount) + order_tax + shipping;
          //         $('#order_discount_total').text(formatMoney(order_discount));
          //         $('#order_tax_total').text(formatMoney(order_tax));
          //         $('#grand_total').text(formatMoney(grand_total));
          //     }
          // }

            

            
    });
    });
}

lang(word) {
  return this.langService.lang(word);
}

calSubTotal(row){
  return row.quantity * row.price
}

calColspan(){
  let colspan = 3;
  if(this.$settings.productDiscount){
    colspan += 1;
  }
  if(this.$settings.taxRate){
    colspan += 2;
  }
 
  return colspan;
}

}
