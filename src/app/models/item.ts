
export class Item {
  humbleBundle: HumbleBundleData;
  steam?: SteamData;
  igdb?: IgdbData;

  private _platform: string;
  get platform(): string {
    if (!this._platform) {
      if (!this.humbleBundle) return null;
      let valToReturn = null;
      if (this.humbleBundle.downloads) {
        this.humbleBundle.downloads.forEach((d) => {
          if (valToReturn) return;
          if (d.platform === 'windows' || d.platform === 'linux' || d.platform === 'mac') valToReturn = 'game';
          else if (d.platform === 'ebook') valToReturn = 'ebook';
          else if (d.platform === 'audio') valToReturn = 'audio';
          else if (d.platform === 'android') valToReturn = 'android';
          else console.error('what is this platform: ' + d.platform);
        });
      }
      this._platform = valToReturn;
    }
    return this._platform;
  }

  get hasReviews(): boolean {
    if (!this.steam || !this.steam.reviews) return false;
    if (this.steam.reviews.reviews.length) return true;
    else return false;
  }

  private _media: Media[];
  get media(): Media[] {
    if (!this._media) {
      const mediaList: Media[] = [];
      if (this.steam && this.steam.appDetails) {
        if (this.steam.appDetails.movies) this.steam.appDetails.movies.forEach((m) => mediaList.push({type: 'video', url: m.webm.max, posterUrl: m.thumbnail}));
        if (this.steam.appDetails.screenshots) this.steam.appDetails.screenshots.forEach((s) => mediaList.push({type: 'image', url: s.path_full}));
      }
      if (this.igdb) {
        // if (this.igdb.cover) mediaList.push({type: 'image', url: this.igdb.cover.url});
        // Only add igdb photos if no steam photos
        if (mediaList.length === 0 && this.igdb.screenshots) this.igdb.screenshots.forEach((s) => mediaList.push({type: 'image', url: s.url}));
        if (this.igdb.video) this.igdb.screenshots.forEach((s) => mediaList.push({type: 'video', url: s.url}));
      }
      // Only add the humble bundle icon if no media from steam
      if (mediaList.length === 0 && this.humbleBundle.icon) mediaList.push({type: 'image', url: this.humbleBundle.icon} as Media);
      this._media = mediaList;
    }
    return this._media;
  }

  private _criticReviews: string;
  get criticReviews(): string {
    if (!this._criticReviews) {
      if (this.steam && this.steam.appDetails) {
        this._criticReviews = this.steam.appDetails.reviews;
      }
    }
    return this._criticReviews;
  }

  private _developer: string;
  get developer(): string {
    if (!this._developer) {
      if (this.steam && this.steam.appDetails && this.steam.appDetails.developers) {
        this._developer  = this.steam.appDetails.developers.join(', ');
      }
      else {
        this._developer = this.humbleBundle.payee.human_name;
      }
    }
    return this._developer;
  }

  private _description: string;
  get description(): string {
    if (!this._description) {
      if (this.steam && this.steam.appDetails) {
        const appDetails = this.steam.appDetails;
        if (appDetails.detailed_description) this._description = appDetails.detailed_description;
        else if (appDetails.short_description) this._description = appDetails.short_description;
      }
      else if (this.igdb && this.igdb.summary) this._description = this.igdb.summary;
      else this._description = '';
    }
    return this._description;
  }
}

export class HumbleBundleData {
  human_name: string;
  icon: string;
  payee: {
    human_name: string
  };
  url: string;
  downloads?: [
    {
      platform: string
    }
  ];
}

export class SteamData {
  appDetails?: {
    type: string,
    name: string,
    steam_appid: number,
    required_age: number,
    detailed_description: string,
    about_the_game: string,
    short_description: string,
    supported_languages: string,
    header_image: string;
    website: string;
    reviews?: string;
    pc_requirements: {
      minimum: string
    };
    mac_requirements?;
    linux_requirements?;
    developers: string[];
    platforms: {
      windows: boolean,
      mac: boolean,
      linux: boolean
    };
    categories: [
      {
        description: string
      }
    ];
    genres: [
      {
        description: string
      }
    ];
    screenshots: [
      {
        path_thumbnail: string,
        path_full: string
      }
    ];
    movies: [
      {
        name: string,
        thumbnail: string,
        webm: {
          480: string,
          max: string
        }
      }
    ];
    metacritic: {
      score: number
      url: string
    },
    achievements: {
      total: number,
      highlighted: [{
        name: string,
        path: string
      }];
    };
    release_date: {
      date: string
    },
    support_info: {
      url: string,
      email: string
    };
    background: string;
  };
  reviews?: SteamReviewData;

  getRandomReview(): SteamReview {
    if (!this.reviews || this.reviews.reviews.length === 0) return null;
    else {
      const randomNum = Math.floor(Math.random() * Math.floor(this.reviews.reviews.length));
      return this.reviews.reviews[randomNum];
    }
  }
}

export class SteamReviewData {
  query_summary: {
    num_reviews: number,
    review_score: number,
    review_score_desc: string,
    total_positive: number,
    total_negative: number,
    total_reviews: number
  };
  reviews: SteamReview[];
}

export class SteamReview {
  author: {
    playtime_forever: number,
    playtime_last_two_weeks: number,
    last_played: number
  };
  language: string;
  review: string;
  timestamp_created: number;
  voted_up: boolean;
}

export class IgdbData {
  id: number;
  name: string;
  url: string;
  summary: string;
  total_rating: number;
  total_rating_count: number;
  first_release_date: number;
  screenshots?: IgdbMediaData[];
  cover: IgdbMediaData;
  video?: IgdbMediaData[];
}

export class IgdbMediaData {
  url: string;
  cloudinary_id: string;
  width: number;
  height: number;
}

export class Media {
  url: string;
  type: string; // video, img
  posterUrl?: string; // Video cover image
}
