import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

	private ytUrl:string = 'https://www.googleapis.com/youtube/v3';
	private apiKey:string = '...';
	private playList:string = 'UUc7_woMAIVIW2mAr1rPCsFQ';
	private nextToken:any;

  constructor(public http:Http ) { }

  getVideos(){

  	let url = `${this.ytUrl}/videos`;
  	let params = new URLSearchParams();


  	params.set('part', 'snippet,id');
  	params.set('maxResults', '10');
  	params.set('chart', 'mostPopular');
  	// params.set('playlistId', this.playList);
  	params.set('key', this.apiKey);

  	if (this.nextToken) {
  		params.set('pageToken', this.nextToken);
  	}

  	return this.http.get(url, { search: params })
  		.pipe(map( (res:any) => {
  			var data = res.json();
  			this.nextToken = data.nextPageToken;

  			let videos:any[] = [];
  			for (let video of data.items) {
  				let snippet = video.snippet;
  				snippet.id = video.id;
  				videos.push(snippet);
  			}

  			return videos;

  		}))

  }

}
