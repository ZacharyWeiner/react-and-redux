import React, {Component} from 'react';
import './app.css';

class Profile extends Component{
  render(){
    let artist = {name: '', followers: {total: ''}, images:[{url: ''}], genres: []};
    if (this.props.artist != null){
      artist = this.props.artist;
    }
    return (
      <div>
        <div>  </div>
        <div className='profile'>
          <img alt='Profile' className='profile-image' src={artist.images[0].url} />
          <div className='profile-info'>
            <div className='profile-name'>{artist.name} </div>
            <div className='profile-followers'>
              {artist.followers.total} Followers
            </div>
            <div className='profile-genres'>
              {
                artist.genres.map((genre, k) => {
                  genre =  genre !== artist.genres[artist.genres.length -1] ? `${genre},` : `& ${genre}`;
                  return (
                  <span key={k}> {genre} </span>
                )})
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
