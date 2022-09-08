import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime} from 'rxjs';
import {CartServiceService} from '../../service/cart.service';
import {UserService} from '../../service/user.service';
import {Product} from "../../models/product";
import {ProductsComponent} from "../products/products.component";
import {ProductService} from "../../service/product.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild(ProductsComponent) productsComponent: ProductsComponent | undefined;

  message: String = "";
  isLoggedIn: boolean = false;

  myControl = new UntypedFormControl();
  //options: string[] = ["Apple iPhone 13 Pro (Graphit, 128 GB)","Microsoft Surface Pro 8"];
  filteredOptions: any;
  options: any;
  formGroup!: UntypedFormGroup;
  products: Array<Product> = [];
  filterCategory: Array<Product> = [];
  carts: any = [];
  searchKey: string = "";
  public totalItem: number = 0;
  searchTerm: string = '';
  searchName: string = '';
  //constructor(private cartService: CartServiceService, private productService: ProductService, private fb: FormBuilder, private router: Router, private dataService: DataService) {
  //}

  constructor(private cartService: CartServiceService, private productService: ProductService, private fb: UntypedFormBuilder,
              private router: Router, private activeRoute: ActivatedRoute, private _userService: UserService) {
  }


  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      });

    this.activeRoute.params.subscribe(params => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    })
    /**this.activeRoute.params.subscribe(params =>{
      if(params['searchName']){
      this.searchName = params['searchName'];
      }
    })**/
    this.initForm();
    this.getTitles();
    //this.dataService.currentMessage.subscribe(message => this.message = message);
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("user")) {
      this.isLoggedIn = true
    } else if (!localStorage.getItem("user")) {
      this.isLoggedIn = false;
    }
  }

  /**search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
    this.cartService.search.subscribe((val:any) =>{
      this.searchKey = val;
    })
  }**/

  loggedIn() {
    return localStorage.getItem("user");
  }

  search(): void {
    if (this.searchTerm) {
      this.router.navigateByUrl('products/' + this.searchTerm)
    }
  }


  searchForCategory(category: string) {
    this.searchTerm = category;
    if (this.searchTerm) {
      this.router.navigateByUrl('products/' + this.searchTerm);
    }
  }

  initForm() {
    this.formGroup = this.fb.group({
      'title': ['']
    })
    this.formGroup.get('title')?.valueChanges
      .pipe(debounceTime(100))
      .subscribe(response => {
        console.log('entered data is ', response);
        if (response && response.length) {
          this.filteredData(response);
        } else {
          this.filteredOptions = [];
        }

      })
  }

  filteredData(enteredData: string) {
    this.filteredOptions = this.options.filter((item: string) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })

  }

  getTitles() {
    this.productService.getAllProductTitles().subscribe((response: any) => {
      this.options = response;
    })
  }

  filter(category: string) {
    this.filterCategory = this.products
      .filter((a: any) => {
        if (a.modelName == category || category == '') {
          return a;
        }
      })
  }

  /** Die folgenden Funktionen werden für die Sidebar benötigt */
  openNav() {
    const openNav = document.getElementById("mySidenav");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");
    if (openNav && closeBtn && overlay) {
      openNav.style.animation = "expand 0.3s forwards";
      //close button
      closeBtn.style.display = "block";
      closeBtn.style.animation = "show 0.3s"
      //overlay
      overlay.style.display = "block";
      overlay.style.animation = "show 0.3s";
    }
  }

  closeNav() {
    const closeNav = document.getElementById("mySidenav");
    const closeBtn = document.getElementById("closeBtn");
    const overlay = document.getElementById("overlay");
    if (closeNav && closeBtn && overlay) {
      closeNav.style.animation = "collapse 0.3s forwards";
      //close button
      closeBtn.style.animation = "hide 0.3s";
      //overlay
      overlay.style.animation = "hide 0.3s";
      setTimeout(() => {
        closeBtn.style.display = "none";
        overlay.style.display = "none";
      }, 300)
    }
  }


  showAllProductsOfACategory(category: string) {
    this.productService.getAllProductsByKategory(category);
    this.router.navigate(["/products"]);
  }

}
