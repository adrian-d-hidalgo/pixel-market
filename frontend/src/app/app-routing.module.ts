import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyLibraryPage } from './pages/my-library/my-library.page';
import { MarketplacePage } from './pages/marketplace/marketplace.page';
import { TradingPage } from './pages/trading/trading.page';

const routes: Routes = [{
  path: '',
  redirectTo: 'my-library',
  pathMatch: 'full'
}, {
  path: 'my-library',
  component: MyLibraryPage
}, {
  path: 'marketplace',
  component: MarketplacePage
}, {
  path: 'trading',
  component: TradingPage
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
