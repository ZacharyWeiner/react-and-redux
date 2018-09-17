import React, {Component} from 'react';
import './app.css';

class Gallery extends Component{

  constructor(props){
    super(props);
    this.state = {
      playingURL: '',
      audio: null,
      playing: false
    }
  }

  playAudio(preview){
    console.log('previewURL', preview);
    //console.log('preview matches playing', preview === this.state.playingURL);
    if(!this.state.playing){
      let audio = new Audio(preview);
      audio.play();
      this.setState({
        playing: true,
        playingURL: preview,
        audio})
    }else{
      console.log('already playing....');
      this.state.audio.pause();
      if(preview === this.state.playingURL){
        console.log('stay paused and update state');
        this.setState({
          playing: false,
          playingURL: ''
        });
        console.log(this.state);
      }else{
        console.log('create a new audio object and play');
        let audio = new Audio(preview);
        audio.play();
        this.setState({
          playing: true,
          playingURL: preview,
          audio: audio
        });
      }
    }
  }

  render(){
    const {tracks} = this.props;
    return (
      <div>
        {tracks.map((track, k) => {
          //console.log('track', tracks);
          const trackImg = track.album.images[0].url;
          return(
            <div
              key={k}
              className='track'
              onClick={()=>{
                if(track.preview_url === null){
                  alert('This Track Doesn\'t Have A Preview');
                }else{
                this.playAudio(track.preview_url)
                }}
              } >
              <img src={trackImg} className='track-img' alt='track' />
              <div className='track-play'>
                <div className='track-play-inner'>
                  {
                    this.state.playingURL === track.preview_url
                      ? <span>| |</span>
                      : <span>&#9654;</span>
                  }
                </div>
              </div>
              <p className='track-text'>
                {track.name}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Gallery;
