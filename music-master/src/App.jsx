import React, {Component} from 'react';
import './app.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './profile.jsx';
import Gallery from './gallery.jsx';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search(){
    console.log('state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    let ALBUM_URL = ''
    var accessToken = 'BQAgO1HTSrL9cyh0ds5j5RGWY4SltkvgwK6WuHNzDKiX3yhTth0p86Xe9vIUHafVzDL0_sfJBHlRl9k0ZRp1Sdrj6YI7-3BNChS0jRMSHbOHFhpzwov4BkZwtDNt5xrI46uajYYObiTPHlQyFSTCNKSd6ECv2nsL'
    var oAuthToken = 'BQD5m2Rpr-0ESrNXoe7xZgq7LrgEEjvUxbnN7qP6VxUwxh4OXBD2iXnOelJsikx8KrO73-NJDN7Sz1yuzuklbUCh-kxPB0Bn77jB2kohaLI91yOOkqdkHiReN9FUDtMVK8HnI66faHuMHj3__tPZOcF7P7M'
    var myHeaders = new Headers();

    console.log('FETCH_URL', FETCH_URL);
    var myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + accessToken
     },
      mode: 'cors',
      cache: 'default'
    };

    var optionsWithAuth = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + oAuthToken
     },
      mode: 'cors',
      cache: 'default'
    };
    fetch(FETCH_URL, myOptions )
      .then(response => response.json())
      .then(json =>{
        const artist  = json.artists.items[0];
        this.setState({artist: artist});
        //console.log('artist.id', artist.id);
        ALBUM_URL = `https://api.spotify.com/v1/artists/${this.state.artist.id}/top-tracks?country=US&`
        //console.log('ALBUM_URL', ALBUM_URL)
        return ALBUM_URL
      }).then(album_url=>{
        fetch(album_url, optionsWithAuth)
          .then(response => {
            //console.log('found response to album url fetch');
            let thisJson = response.json();
            //console.log(thisJson);
            return thisJson;
          }).then(json =>{
            const tracks = json.tracks;
            this.setState({tracks});
            //console.log('state.tracks', this.state.tracks);
          });
      })
  }

  render(){
    return(
        <div className='app'>
        <div className='app-title'>
          Music Master
        </div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type='text'
              placeholder='search for an artist'
              query={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                  if(event.key === 'Enter'){
                    this.search();
                  }
                }
              }
              />
              <InputGroup.Addon onClick={()=> this.search()}>
                <Glyphicon glyph='search' />
              </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
          <div>
            <Profile
              artist={this.state.artist}
            />
            <div className='gallery'>
             <Gallery tracks={this.state.tracks} />
            </div>
          </div>
          :
          <div> No Artis Selected yet </div>
        }
      </div>
    )
  }
}

export default App;
