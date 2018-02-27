import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item, HumbleBundleData, IgdbData, SteamData } from '../models/item';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) {}

  public getItems(): Promise<any> {
    return this.http.get<Item[]>('https://mattpua.github.io/discover-humble/assets/data/games.json')
    .toPromise()
    .then((r: Item[]) => {
      return r.map((item) => {
        const newObj = new Item();
        newObj.humbleBundle = Object.assign(new HumbleBundleData(), item.humbleBundle);
        newObj.igdb = Object.assign(new IgdbData(), item.igdb);
        newObj.steam = Object.assign(new SteamData(), item.steam);
        return newObj;
      });
    });
  }
}
