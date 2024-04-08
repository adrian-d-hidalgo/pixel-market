import { Component } from '@angular/core';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.page.html',
  styleUrl: './my-library.page.scss'
})
export class MyLibraryPage {
  public games = [{
    title: 'Super Mario Odyssey',
    price: 59.99,
    image: 'https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_SuperMarioOdyssey_image1600w.jpg'
  }, {
    title: 'Mario Kart 8 Deluxe',
    price: 59.99,
    image: 'https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_MarioKart8Deluxe_image1600w.jpg'
  }, {
    title: 'Splatoon 2',
    price: 59.99,
    image: 'https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_Splatoon2_image1600w.jpg'
  }];
}
