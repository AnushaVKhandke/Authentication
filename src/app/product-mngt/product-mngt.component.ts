import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { product } from '../model/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-mngt',
  templateUrl: './product-mngt.component.html',
  styleUrl: './product-mngt.component.css'
})
export class ProductMngtComponent {
  isFetching=false;
  allProducts:product[]=[];
  editmode:boolean=false;
  currentID:string;
  errormsg:string=null;

  @ViewChild('productsForm') form :NgForm;

  constructor(private http:HttpClient, private productService:ProductsService){
  }
  ngOnInit(){
    this.fetchProducts()
  }
  
  onFetchProducts(){
    this.fetchProducts()
  }
  onProductCreate(products:{pname:string,desc:string,price:string}){
    if(!this.editmode){
      this.productService.createProduct(products)
    }else{
      this.productService.updateProduct(this.currentID,products)
    }
      
    
  }

  fetchProducts(){
    this.isFetching=true;
    this.productService.FetchProduct()
    .subscribe((products)=>{
      this.allProducts=products;
      this.isFetching=false;
    },(err)=>{
        this.errormsg = err.message;
    })
  }

  onDeleteProduct(id:string){
    this.productService.deleteProduct(id)
  }

  onDeleteAllProduct(){
   this.productService.deleteAllProduct()
  }

  onEditProduct(id:string){
    this.currentID=id;
    let currentProducts = this.allProducts.find((p)=>{return p.id===id})
    

    this.form.setValue({
      pname:currentProducts.pname,
      desc:currentProducts.desc,
      price:currentProducts.price
    })
    this.editmode=true;
    
  }
}

