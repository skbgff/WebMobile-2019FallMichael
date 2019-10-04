import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      /**
       * Write code to get recipe
       */
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=db9927b6'
        + '&app_key=d08fbd177d03c50acff5e26581f28a75').subscribe((response: any) => {
        this.recipeList = Object.keys(response.hits).map(function (R) {
          const recipe = response.hits[R].recipe;
          return {name: recipe.label, icon: recipe.image, url: recipe.url};
        });
        console.log(response.hits);
      });
    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      /**
       * Write code to get place
       */
      // tslint:disable-next-line:max-line-length
      this._http.get('https://api.foursquare.com/v2/venues/search/?' + '&client_id=OO2P1I0OMSUPC1RDII0B35LZ1A0XVKNJUPBEPGKRMW1CC3J2' + '&client_secret=KMBRXGGGSIAL5AL25YZIURABMKFSHU4ZVAULIRXB0QB131CM' +
        '&v=20180928&limit=10&&near=' + this.placeValue + '&query=' + this.recipeValue).subscribe((response: any) => {
        this.venueList = Object.keys(response.response.venues).map(function (P) {
          const place = response.response.venues[P];
          return {name: place.name, formattedAddress: place.location};
        });
        console.log(response.venues);
      });
    }
  }

}
