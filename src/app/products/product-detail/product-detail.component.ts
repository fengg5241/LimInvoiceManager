import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LangService } from '../../lang.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  $page_title = 'New Product';
  $tax_rates:any;
  $Settings = {default_tax_rate:true};
  curProduct:any;
  newProduct = {
    name:'',
    price:0,
    details:'',
    taxRate:"",
    taxMethod:""
  };

  isNew = true;

  constructor(private langService:LangService,
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.http.get('/api/taxRate/selectAll').subscribe(data => {
      this.$tax_rates = data;
    });

    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.isNew = false;
      this.$page_title = "Edit Product";
      this.http.get('/api/product/selectById/'+id).subscribe(data => {
        this.curProduct = data;
      });
    }else {
      this.curProduct= Object.assign({}, this.newProduct);
    }
  }

  save(){
    if(this.isNew){
      this.http.post('/api/product/insert',this.curProduct).subscribe(data => {
        this.router.navigateByUrl("products")
      });
    }else{
      this.http.post('/api/product/update',this.curProduct).subscribe(data => {
        this.router.navigateByUrl("products")
      });
    }
  }

  lang(word){
    return this.langService.lang(word);
  }

}
