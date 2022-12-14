import { AccountService } from './../../service/account.service';
import  Swal  from 'sweetalert2';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listProducts: any;
  anh: any;
  listItemSearch:any;
  keyword:string = '';
  totalCart:number=0;
  checkStr:any
  constructor(private categorySer: CategoryService, private productSer: ProductsService, private router: Router, private accService: AccountService) { }

  ngOnInit(): void {
    this.checkStr = localStorage.getItem('accountSignin');
    this.checkStr = JSON.parse(this.checkStr);

    if(this.checkStr){
      this.accService.getItem(this.checkStr).subscribe((data:any)=>{
        this.accService.totalCard.next(data.cart.length);
      })
    }
    this.accService.totalCard.subscribe((data:number)=>{
      this.totalCart = data
    })
    
    this.categorySer.getAll().subscribe((data: any) => {
      this.listProducts = data;
    })
    this.getProduct();
    document.addEventListener('click', function handleClickOutsideBox(event: any) {
      let but = document.getElementById('formSearchHeader1') as HTMLDivElement | null;
      let box1 = document.getElementById('searchItemBox1') as HTMLDivElement | null;
      if (!but?.contains(event.target)) {
        box1?.classList.add('d-none');
      }
    });
    document.addEventListener('click', function handleClickOutsideBox(event: any) {
      let but = document.getElementById('formSearchHeader1') as HTMLDivElement | null;
      let box2 = document.getElementById('searchItemBox2') as HTMLDivElement | null;
      if (!but?.contains(event.target)) {
        box2?.classList.add('d-none');
      }
    });
  }
  getProduct(){
    this.productSer.getAll().subscribe((data:any)=>{
      this.listItemSearch = data;
    })
  }
  showSearchItemBox(id:number){
    let div = document.getElementById(`searchItemBox${id}`) as HTMLDivElement | null;
    div?.classList.remove('d-none');
  }
  navigate(id: number) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`shop/${id}`]);
    });
  }
  goToSearchHeader(){
    let header1 = document.getElementById('trueHeader') as HTMLDivElement | null;
    let header2 = document.getElementById('searchHeader') as HTMLDivElement | null;
    header1?.classList.add('d-none');
    header2?.classList.remove('d-none');
  }
  closeSearchHeader(){
    let header1 = document.getElementById('trueHeader') as HTMLDivElement | null;
    let header2 = document.getElementById('searchHeader') as HTMLDivElement | null;
    header1?.classList.remove('d-none');
    header2?.classList.add('d-none');
  }
  goCart(){
    let id:any = localStorage.getItem('accountSignin');
    id = JSON.parse(id);
    if(id){
      this.router.navigate(['cart']);
    }else{
      Swal.fire({
        title: 'You are not logged in',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login']);
        }
      })
    }
  }
  goUser(){
    let id:any = localStorage.getItem('accountSignin');
    id = JSON.parse(id);
    if(id){
      this.router.navigate(['user']);
    }else{
      Swal.fire({
        title: 'You are not logged in',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login']);
        }
      })
    }
  }
}
