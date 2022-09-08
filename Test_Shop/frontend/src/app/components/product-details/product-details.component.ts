import {Component, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {MatomoTracker} from '@ngx-matomo/tracker';
import {CartServiceService} from '../../service/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  default_bild = 'assets/bilder/default.jpg';
  iphone_bild = 'assets/bilder/IPhone11.jpg';
  macbook_bild = 'assets/bilder/Macbook.jpg';
  fernseher_bild = 'assets/bilder/fernseher.jpg';
  wasserkocher_bild = 'assets/bilder/wasserkocher.jpg';
  lenovo_bild = 'assets/bilder/LenovoLaptop.jpg';
  map = new Map<string, string>();

  constructor(
    private cartService: CartServiceService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private matomoTracker: MatomoTracker
  ) {
    this.map.set('default', this.default_bild);
    this.map.set('iphone', this.iphone_bild);
    this.map.set('lenovo', this.lenovo_bild);
    this.map.set('macbook', this.macbook_bild);
    this.map.set('fernseher', this.fernseher_bild);
    this.map.set('wasserkocher', this.wasserkocher_bild);
  }

  ngOnInit(): void {
    console.log(123);
    console.log('Referrer ' + document.referrer.toString());
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.productService
        .getSingleProduct(this.route.snapshot.paramMap.get('id'))
        .subscribe(
          async (result) => {
            this.product = result;
            console.log(this.product);
            // for the benchmark
            if (
              result['title'] === 'Apple iPhone 12 (Schwarz, 128 GB)' ||
              result['title'] === 'PUMA Herren Pullover'
            ) {
              this.router.navigate(['error'], {skipLocationChange: true});
            } else {
              await new Promise((r) => setTimeout(r, 2000));
              console.log('Extracting Image...');
              let location: string = document.location.toString();
              let image_src: string = document
                .getElementById('single-product-info')!
                .getElementsByTagName('img')[0].currentSrc;
              let pageAndImageLinks: string = location + '->' + image_src;
              this.matomoTracker.trackLink(pageAndImageLinks, 'link');
              console.log(image_src);
            }
          }
          /*     (error) => {
                 this.router.navigate(['**'], { skipLocationChange: true });
               }
     */
        );
    }
  }

  addItem(item: any) {
    this.cartService.add(item);
    this.matomoTracker.trackEvent('Add', 'Add Item');
  }
}
