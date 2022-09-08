import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {CartServiceService} from '../../service/cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from '../../service/product.service';
import {MatomoTracker} from '@ngx-matomo/tracker';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products!: Observable<Product[]>;
  productsCategory!: Observable<Product[]>;
  productsBrand!: Observable<Product[]>;
  //recommendedProducts: Array<Product> = [];
  filterCategory!: Array<Product>;
  carts: any = [];
  searchKey: string = '';
  data: any = {};
  routeState: any;
  searchCategory: string = '';
  default_bild = 'assets/bilder/default.jpg';
  iphone_bild = 'assets/bilder/IPhone11.jpg';
  macbook_bild = 'assets/bilder/Macbook.jpg';
  lenovo_bild = 'assets/bilder/LenovoLaptop.jpg';
  microsoft_bild = 'assets/bilder/Microsoft.jpg';
  samsung_bild = 'assets/bilder/Samsung.jpg';
  nums: string[] = [
    this.lenovo_bild,
    this.samsung_bild,
    this.microsoft_bild,
    this.macbook_bild,
    this.iphone_bild,
    this.default_bild,
  ];
  math = Math;
  private message: string = '';
  private searchTerm!: string;
  //constructor(private cartService: CartServiceService, private productService: ProductService, private router: Router, private dataService: DataService) {
  //}

  constructor(
    private matomoTracker: MatomoTracker,
    private cartService: CartServiceService,
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  addItemToCart(item: any) {
    this.cartService.addToCart(item);
  }

  addItem(item: any) {
    this.cartService.add(item);
    this.matomoTracker.trackEvent('Add', 'Add Item');
  }

  ngOnInit(): void {
    if (this.products) {
      this.products.forEach((a: any) => {
        Object.assign(a, {quantity: 1, total: a.price});
      });
      console.log(this.products);
    }

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    //this.dataService.currentMessage.subscribe(message => (this.message = message))

    this.activeRoute.params.subscribe((params) => {
      this.searchTerm = params['searchTerm'];
      console.log(this.searchTerm);
      if (this.searchTerm === undefined) {
        this.reloadProductsData();
      } else if (this.searchTerm === 'Laptop') {
        this.getProductsByCategory(this.searchTerm);
      } else if (this.searchTerm === 'TV') {
        this.getProductsByCategory(this.searchTerm);
      } else if (this.searchTerm === 'Haushaltsmittel') {
        this.getProductsByCategory(this.searchTerm);
      } else if (this.searchTerm === 'Bekleidung') {
        this.getProductsByCategory(this.searchTerm);
      } else if (this.searchTerm === 'Mobile') {
        this.getProductsByCategory(this.searchTerm);
      } else {
        this.getProductsByTitle(params['searchTerm']);
      }
      /*if(params['searchTerm']){
        this.getProductsByTitle(params['searchTerm']);
        console.log(params['searchTerm']);
      }else if(params['searchTerm']){
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state as {
          searchName: string
        }
        this.searchCategory = state.searchName;
        console.log(this.searchCategory);
        if(this.searchCategory !== ''){
          this.getProductsByKategory(this.searchCategory);
        }
      }else {
        this.reloadProductsData();
      }*/
    });

    this.reloadProductsData();
  }

  ngAfterViewInit(): void {
    this.getProductsByCategory;
  }

  removeDuplicates(data: any) {
    return data.filter(
      (value: any, index: any) => data.indexOf(value) == index
    );
  }

  reloadProductsData() {
    this.products = this.productService.getAllProducts();
    //console.log(this.message);
  }

  getProductsByTitle(title: string) {
    this.productService.getAllProductsByTitle(title).subscribe(
      (result) => {
        this.products = result;
        console.log('Test');
        console.log(result.length);
        if (result.length == 0) {
          this.router.navigate(['**'], {skipLocationChange: true});
        }
      },
      (error) => {
        this.router.navigate(['**'], {skipLocationChange: true});
      }
    );
    /*  ;
      this.products.subscribe(result => {
        if (result.)
          })*/
  }

  getProductsByCategory(productType: string) {
    console.log(productType);
    this.products = this.productService.getAllProductsByKategory(productType);
    let responseSize = 0;
    this.products.subscribe((result) => {
      responseSize = result.length;
      console.log(responseSize);
    });
    if ((responseSize = 0))
      this.router.navigate(['**'], {skipLocationChange: true});
    console.log(this.products);
  }

  getProductsByBrand(brand: string) {
    this.products = this.productService.getAllProductsByBrand(brand);
    console.log('TETE' + this.products);
  }

  /**filter(category: string){
    if(this.products){
      this.filterCategory = this.products
      .filter((a:any)=>{
      if(a.productType == category || category ==''){
        return a;
      }
    })
    }
  }**/

  filter(category: string) {
    if (this.products) {
      this.products.subscribe(
        (allProduct) => (this.filterCategory = allProduct)
      );
      this.filterCategory.filter((a: any) => {
        if (a.productType == category || category == '') {
          return a;
        }
      });
    }
  }

  clickEventOnProduct(item: Product) {
    this.matomoTracker.trackEvent('Click', 'Product', item.title);
  }

  /** Die folgenden Funktionen werden für die Sidebar benötigt */
  openNav() {
    const openNav = document.getElementById('mySidenav');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('overlay');
    if (openNav && closeBtn && overlay) {
      openNav.style.animation = 'expand 0.3s forwards';
      //close button
      closeBtn.style.display = 'block';
      closeBtn.style.animation = 'show 0.3s';
      //overlay
      overlay.style.display = 'block';
      overlay.style.animation = 'show 0.3s';
    }
  }

  closeNav() {
    const closeNav = document.getElementById('mySidenav');
    const closeBtn = document.getElementById('closeBtn');
    const overlay = document.getElementById('overlay');
    if (closeNav && closeBtn && overlay) {
      closeNav.style.animation = 'collapse 0.3s forwards';
      //close button
      closeBtn.style.animation = 'hide 0.3s';
      //overlay
      overlay.style.animation = 'hide 0.3s';
      setTimeout(() => {
        closeBtn.style.display = 'none';
        overlay.style.display = 'none';
      }, 300);
    }
  }
}
