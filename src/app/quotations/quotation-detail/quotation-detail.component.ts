import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '../../lang.service';
import * as accounting from 'accounting/accounting.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.css']
})
export class QuotationDetailComponent implements OnInit {
  $page_title: any;
  $companies: any;
  $customers: any;
  $settings: any;
  products: any;
  $tax_rates: any;
  quoteItems: any;
  updateItems: any;
  noOfValidItems = 0;

  dateSettings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };
  counter = 0;
  noOfEmptyRow = 0;
  emptyRowArray = [];
  isNew = true;
  newCustomer = {
    company: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };
  curQuotation: any;
  
  // $data = array('reference_no' => $reference_no, ok
  // 'product_discount' => $product_discount, ok
  // 'order_discount_id' => $order_discount_id,ok
  // 'order_discount' => $order_discount,ok
  // 'total_discount' => $total_discount,ok
  // 'product_tax' => $product_tax,
  // 'order_tax_id' => $order_tax_rate_id,
  // 'order_tax' => $order_tax,
  // 'total_tax' => $total_tax,
  // 'total' => $total,
  // 'grand_total' => $grand_total,
  // 'status' => $status,
  // 'shipping' => $this->sim->formatDecimal($shipping),
  // 'note' => $note,
  // );

  newQuotation = {
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    companyId: null,
    referenceNo: '',
    customerId: '',
    dueDate: '',
    shipping: '',
    orderDiscountId: '',
    orderDiscount: '',
    productDiscount: '',
    totalDiscount: '',
    orderTaxId: '',
    orderTax: '',
    totalTax: '',
    total: '',
    grandTotal: '',
    status: '',
    // recurring:"",
    note: ''
  };

  constructor(
    private langService: LangService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initTable();
    // this.initQuotation();
  }

  ngAfterViewInit() {
    // $("select").chosen({no_results_text: "No results matched", disable_search_threshold: 5, allow_single_deselect:true, width: '100%'});
  }

  initQuotation() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.$page_title = 'Edit Quotation';
      this.http.get('/api/quotation/selectById/' + id).subscribe(data => {
        this.curQuotation = data;
        this.curQuotation.date = this.curQuotation.date.split('T')[0];
        this.curQuotation.expiryDate = this.curQuotation.expiryDate.split(
          'T'
        )[0];
      });
    } else {
      this.curQuotation = Object.assign({}, this.newQuotation);
    }
  }

  async initTable() {
    let sysSettings = localStorage.getItem('LimSysSettings');
    if(sysSettings){
      this.$settings = JSON.parse(sysSettings);
  }else {
      let sysSettings1 = await this.http.get('/api/sysSetting/selectAll').toPromise()
      this.$settings = sysSettings1[0];
      localStorage.setItem("LimSysSettings",JSON.stringify(sysSettings1[0]));
  }
    this.$tax_rates = await this.http.get('/api/taxRate/selectAll').toPromise();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNew = false;
      this.$page_title = 'Edit Quotation';
      this.curQuotation = await this.http.get('/api/quotation/selectById/' + id).toPromise();
      this.curQuotation.date = this.curQuotation.date.split('T')[0];
      this.curQuotation.expiryDate = this.curQuotation.expiryDate ? this.curQuotation.expiryDate.split(
        'T'
      )[0] : null;
      
      this.quoteItems = await this.http
        .get('/api/quotationItem/selectByQuoteId/' + id)
        .toPromise();
    } else {
      this.curQuotation = Object.assign({}, this.newQuotation);
      this.quoteItems = [];
    }
    this.noOfEmptyRow =
      this.$settings.noOfRows > this.quoteItems.length
        ? this.$settings.noOfRows - this.quoteItems.length
        : 0;
    this.emptyRowArray = new Array(this.noOfEmptyRow);

    this.counter =
      this.quoteItems.lenght > this.$settings.noOfRows
        ? this.quoteItems.lenght + 1
        : this.$settings.noOfRows + 1;

    this.http.get('/api/company/selectAll').subscribe(data => {
      this.$companies = data;
    });

    this.http.get('/api/customer/selectAll').subscribe(data => {
      this.$customers = data;
    });

    

    let thisObject = this;
    $(document).ready(function() {
      $(document).on(
        'change',
        '#shipping, #order_discount, #order_tax, .quantity, .price, .discount, .tax, .suggestions, .tax_method',
        function() {
          calculateTotal(thisObject);
        }
      );

      calculateTotal(thisObject);

      $('#addButton').click(function() {
        var newTr = $('<tr></tr>').attr('id', thisObject.counter);
        var row_hrml = '';

        row_hrml +=
          '<td style="width: 20px; text-align: center; padding-right: 10px;">' +
          thisObject.counter +
          '</td>';
        row_hrml +=
          '<td><input type="text" class="quantity form-control input-sm" name="quantity[]" id="quantity-' +
          thisObject.counter +
          '" value="" style="min-width: 70px; text-align: center;" /></td>';
        row_hrml +=
          '<td><div class="input-group"><input type="text" name="product[]" id="product-' +
          thisObject.counter +
          '" value="" class="form-control input-sm suggestions" maxlength="80"><span class="input-group-addon"><i class="fa fa-file-text-o pointer detailsIcon"></i></span></div><div class="details-con details-con-' +
          thisObject.counter +
          '" style="display:none;"><textarea style="margin-top:5px;padding:5px 10px;height:60px;" class="form-control details" name="details[]" id="details-' +
          thisObject.counter +
          '" maxlength="255"></textarea></div></td>';
        row_hrml +=
          '<td><input type="text" name="price[]" id="price-' +
          thisObject.counter +
          '" value="" class="price form-control input-sm text-right" style="min-width: 100px;"></td>';
        if (thisObject.$settings.productDiscount == 1) {
          row_hrml +=
            '<td><input type="text" name="discount[]" id="discount-' +
            thisObject.counter +
            '" value="" class="discount form-control input-sm"></td>';
        }
        if (thisObject.$settings.defaultTaxRate > 0) {
          row_hrml +=
            '<td><select class="tax form-control input-sm" style="min-width: 100px;" name="tax_rate[]" id="tax_rate-' +
            thisObject.counter +
            '">';
          $.each(thisObject.$tax_rates, function() {
            row_hrml +=
              '<option value="' + this.id + '">' + this.name + '</option>';
          });
          row_hrml += '</select></td>';
          row_hrml +=
            '<td><select class="tax_method form-control input-sm" style="min-width: 100px;" name="tax_method[]" id="tax_method-' +
            thisObject.counter +
            '">' +
            '<option value="exclusive">' +
            thisObject.lang('exclusive') +
            '</option>' +
            '<option value="inclusive">' +
            thisObject.lang('inclusive') +
            '</option>' +
            '</select></td>';
        }

        row_hrml +=
          '<td><input type="text" name="subtotal[]" readonly id="subtotal-' +
          thisObject.counter +
          '" value="" class="subtotal form-control input-sm text-right" tabindex="-1"></td>';

        newTr.html(row_hrml);
        newTr.appendTo('#dyTable');

        thisObject.counter++;
        // $("form select").chosen({no_results_text: "No results matched", disable_search_threshold: 5, allow_single_deselect:true, width: '100%'});

        // suggestions();
      });

      $('#removeButton').click(function() {
        if (thisObject.counter <= thisObject.$settings.noOfRows + 1) {
          alert(thisObject.lang('not_allowed'));
          return false;
        }
        thisObject.counter--;
        $('#' + thisObject.counter).remove();
      });

      $('#customer').change(function() {
        if ($(this).val() == 'new') $('#customerForm').slideDown();
        else $('#customerForm').slideUp();
      });

      $(document).on('blur', '.suggestions', function() {
        var row = $(this).closest('tr');
        var v = $(this).val();
        var q = row.find('.quantity');
        var qv = row.find('.quantity').val();
        if (qv.length == 0 && v.length != 0) {
          $(q)
            .val(1)
            .change();
        }
      });

      $(document).on('click', '.detailsIcon', function() {
        $(this)
          .parents('.input-group')
          .next('.details-con')
          .toggle();
      });

      $('#gen_ref').click(function() {
        let newRef = getRandomRef();
        thisObject.curQuotation.referenceNo = newRef;
        $(this)
          .parent('.input-group')
          .children('input')
          .val(newRef);
      });

      function getRandomRef() {
        var min = 1000000000000000,
          max = 9999999999999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function calculateTotal(thisObject) {
        thisObject.updateItems = [];
        thisObject.noOfValidItems = 0;
        if (typeof thisObject.counter !== 'undefined') {
          let total = 0;
          let row_total = 0,
            productDiscount = 0,
            productTax = 0;
          for (let i = 1; i < thisObject.counter + 1; i++) {
            var shipping = parseFloat(
              $('#shipping').val() ? $('#shipping').val() : 0
            );
            var row = $('#' + i);
            var quantity = row.find('.quantity').val(),
              product = row.find('.suggestions').val(),
              price = row.find('.price').val(),
              discount = row.find('.discount').val(),
              tax = row.find('.tax').val(),
              tax_method = row.find('.tax_method').val(),
              quoteItemId = row.find('.quoteItemId').val(),
              details = row.find('.details').val(),
              subtotal = row.find('.subtotal');

            let item = null;
            if (parseFloat(quantity) > 0 || quoteItemId) {
              item = {
                quantity,
                productName: product,
                details,
                realUnitPrice: price,
                discount,
                taxRateId: tax,
                taxMethod: tax_method,
                quoteId: thisObject.curQuotation.id
              };
              if (quoteItemId) {
                item['id'] = quoteItemId;
              }

              if (parseFloat(quantity) > 0) {
                thisObject.noOfValidItems += 1;
              }
              thisObject.updateItems.push(item);
            }

            if (quantity && product && price) {
              var product_discount = 0,
                taxAmount = 0;

              if (thisObject.$settings.productDiscount > 0) {
                if (discount) {
                  if (discount.indexOf('%') !== -1) {
                    var pds = discount.split('%');
                    if (!isNaN(pds[0])) {
                      product_discount = formatDecimal(
                        (price * parseFloat(pds[0])) / 100,
                        4
                      );
                    }
                  } else {
                    product_discount = formatDecimal(discount, 4);
                  }
                }
              }

              productDiscount += formatDecimal(product_discount * quantity, 4);
              let net_unit_price = price - product_discount;
              let taxVal = '0';
              if (thisObject.$settings.defaultTaxRate > 0) {
                $.each(thisObject.$tax_rates, function() {
                  if (this.id == tax) {
                    if (this.type == 1 && this.rate != 0) {
                      if (tax_method == 'inclusive') {
                        taxAmount = formatDecimal(
                          (net_unit_price * this.rate) / (100 + this.rate),
                          4
                        );
                        taxVal = this.rate + '%';
                        net_unit_price -= taxAmount;
                      } else {
                        taxAmount = formatDecimal(
                          (net_unit_price * this.rate) / 100,
                          4
                        );
                        taxVal = this.rate + '%';
                      }
                    } else {
                      taxAmount = parseFloat(this.rate);
                      taxVal = this.rate;
                    }
                  }
                });
              }

              productTax += formatDecimal(taxAmount * quantity, 4);
              item['unitPrice'] = formatDecimal(net_unit_price + taxAmount, 4)
              item['tax'] = taxVal;
              item['discountAmt'] = product_discount;
              item['taxAmt'] = taxAmount;
              item['netUnitPrice'] = net_unit_price;
              row_total = (net_unit_price + taxAmount) * quantity;
              subtotal.val(formatMoney(row_total, ''));

              item['subtotal'] = subtotal.val();
              total += row_total;
            }
          }
          $('.total_amount').text(formatMoney(total, ''));
          let order_discount,
            order_tax = 0;

          if ($('#order_discount').val()) {
            let order_discount_val = $('#order_discount').val();
            if (order_discount_val.indexOf('%') !== -1) {
              var pds = order_discount_val.split('%');
              if (!isNaN(pds[0])) {
                order_discount = formatDecimal(
                  (total * parseFloat(pds[0])) / 100,
                  4
                );
              }
            } else {
              order_discount = formatDecimal(order_discount_val, 4);
            }
          }

          if ($('#order_tax').val()) {
            let order_tax_val = $('#order_tax').val();
            $.each(thisObject.$tax_rates, function() {
              if (this.id == order_tax_val) {
                if (this.type == 1 && this.rate != 0) {
                  order_tax = formatDecimal(
                    ((total - order_discount) * this.rate) / 100,
                    4
                  );
                } else {
                  order_tax = parseFloat(this.rate);
                }
              }
            });
          }

          let grand_total = total - order_discount + order_tax + shipping;
          $('#order_discount_total').text(formatMoney(order_discount, ''));
          $('#order_tax_total').text(formatMoney(order_tax, ''));
          $('#grand_total').text(formatMoney(grand_total, ''));

          thisObject.curQuotation.productDiscount = productDiscount;
          thisObject.curQuotation.orderDiscount = order_discount;
          thisObject.curQuotation.totalDiscount = formatDecimal(
            order_discount + productDiscount,
            4
          );
          thisObject.curQuotation.productTax = productTax;
          thisObject.curQuotation.orderTax = order_tax;
          thisObject.curQuotation.totalTax = formatDecimal(
            productTax + order_tax,
            4
          );
          thisObject.curQuotation.total = total;
          thisObject.curQuotation.grandTotal = formatDecimal(grand_total, 4);
        }
      }

      function formatDecimal(x, d) {
        if (!d) {
          d = thisObject.$settings.decimals;
        }
        return parseFloat(accounting.formatNumber(x, d, ''));
      }

      function formatNumber(x, d) {
        if (!d) {
          d = thisObject.$settings.decimals;
        }
        return accounting.formatNumber(
          x,
          d,
          thisObject.$settings.thousandsSep == 0
            ? ' '
            : thisObject.$settings.thousandsSep,
          thisObject.$settings.decimalsSep
        );
      }
      function formatMoney(x, symbol) {
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
    });
  }

  lang(word) {
    return this.langService.lang(word);
  }

  async save() {

    if (!(this.updateItems.length > 0 && this.noOfValidItems >= 1)) {
      alert('There is no products which quantity > 0');
      return;
    }

    if(this.curQuotation.customerId == "new"){
      let newCustomerId = await this.http
      .post('/api/customer/insert',this.newCustomer)
      .toPromise();
      this.curQuotation.customerId = newCustomerId;
      this.curQuotation.customerName = this.newCustomer.company;
    }else {
      let filterCustomer = this.$customers.filter(item=> item.id == this.curQuotation.customerId);
      this.curQuotation["customerName"] = filterCustomer[0].company; 
    }

    if(this.curQuotation.companyId){
      let filterCompany = this.$companies.filter(item=> item.id == this.curQuotation.companyId);
      this.curQuotation["companyName"] = filterCompany[0].company; 
    }
    
    this.curQuotation["userId"] = 1;
    this.curQuotation["user"] = 1;
    if (this.isNew) {
      this.http
        .post('/api/quotation/insert', this.curQuotation)
        .subscribe(data => {
          //get new id
          this.curQuotation.id = data;
          this.updateItems.forEach(e => {
            e.quoteId = data;
          });
          this.http
              .post('/api/quotationItem/bulkUpdate', this.updateItems)
              .subscribe(data => {
                this.router.navigateByUrl('home/sales/quotations');
              });
          this.router.navigateByUrl('home/sales/quotations');
        },
        error => alert(error.error.message)
        );
        
    } else {
      this.http
        .post('/api/quotation/update', this.curQuotation)
        .subscribe(data => {
          // let { updateItems, noOfValidItems } = this.getQuotaItems(
          //   this.curQuotation.id
          // );
          this.http
              .post('/api/quotationItem/bulkUpdate', this.updateItems)
              .subscribe(data => {
                this.router.navigateByUrl('home/sales/quotations');
              });
        });
    }
  }

  getQuotaItems(quoteId) {
    let updateItems = [];
    let noOfValidItems = 0;
    for (let i = 1; i < this.counter + 1; i++) {
      var shipping = parseFloat(
        $('#shipping').val() ? $('#shipping').val() : 0
      );
      var row = $('#' + i);
      var quantity = row.find('.quantity').val(),
        productName = row.find('.suggestions').val(),
        unitPrice = row.find('.price').val(),
        discount = row.find('.discount').val(),
        taxRateId = row.find('.tax').val(),
        taxMethod = row.find('.tax_method').val(),
        details = row.find('.details').val(),
        id = row.find('.quoteItemId').val(),
        subtotal = row.find('.subtotal').val();

      if (parseFloat(quantity) > 0 || id) {
        let item = {
          quantity,
          productName,
          details,
          unitPrice,
          discount,
          taxRateId,
          taxMethod,
          quoteId,
          subtotal
        };
        if (id) {
          item['id'] = id;
        }

        if (parseFloat(quantity) > 0) {
          noOfValidItems += 1;
        }
        updateItems.push(item);
      }
    }

    return { updateItems, noOfValidItems };
  }

  calSubTotal(row) {
    return row.quantity * row.price;
  }

  calColspan() {
    let colspan = 3;
    if (this.$settings && this.$settings.productDiscount) {
      colspan += 1;
    }
    if (this.$settings && this.$settings.defaultTaxRate) {
      colspan += 2;
    }

    return colspan;
  }

  generateNewProduct() {
    return {
      quantity: 0,
      productName: '',
      details: '',
      unitPrice: 0,
      discount: 0,
      taxRate: 0,
      taxMethod: 0
    };
  }
}
