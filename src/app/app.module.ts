import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ItemService } from './services/item.service';
import { HttpClientModule } from '@angular/common/http';
import { EscapeHtmlPipe } from './pipes/keep-html.pipe';
import { ExpandedItemComponent } from './components/expanded-item/expanded-item.component';
import { ReviewComponent } from './components/review/review.component';
import { HdSwiperDirective } from './directives/swiper.directive';
import { MediaGalleryComponent } from './components/media-gallery/media-gallery.component';
import { BarGraphComponent } from './components/bar-graph/bar-graph.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    ItemCardComponent,
    EscapeHtmlPipe,
    ExpandedItemComponent,
    ReviewComponent,
    HdSwiperDirective,
    MediaGalleryComponent,
    BarGraphComponent,
    ModalComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [ItemService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
