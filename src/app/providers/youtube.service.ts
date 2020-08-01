import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

	private ytUrl:string = 'https://www.googleapis.com/youtube/v3';
	private apiKey:string = environment.YOUTUBE_KEY;
	// private playList:string = 'UUc7_woMAIVIW2mAr1rPCsFQ';
	private nextToken:any;

  constructor(public http:HttpClient ) { }

  getVideos(){

  	let url = `${this.ytUrl}/videos`;
		let params:any = {};
		
  	params.part = 'snippet,id';
  	params.maxResults = '10';
  	params.chart = 'mostPopular';
  	// params.playlistId = this.playList;
  	params.key = this.apiKey;

  	if (this.nextToken) {
  		params.pageToken = this.nextToken;
		}

  	return this.http.get(url, { params: params } )
  		.pipe(map( (res:any) => {
  			var data = res;
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
