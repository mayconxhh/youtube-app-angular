import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../providers/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
	videos:any[] = [];
	videoSelected:any;

  constructor( public _yts:YoutubeService ) {

  	this._yts.getVideos()
  		.subscribe(videos=> this.videos = videos );

  }

  ngOnInit() {
  }

  viewVideo(video:any){
  	this.videoSelected = video;
  	$('#modalVideo').modal();
  }

  closeModal(){
  	this.videoSelected = null;
  	$('#modalVideo').modal('hide');
  }

  loadMore(){
  	this._yts.getVideos()
  		.subscribe(videos=> this.videos.push.apply(this.videos, videos));
  }

}
