import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js'
import { iUsuario } from '../pages/interfaces/iUsuario';
import { SpotifyCurrentUser } from '../Common/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null ;
  usuario: iUsuario;

  constructor() {
    this.spotifyApi = new Spotify()
   }

  async initializeUser(){

    const token = localStorage.getItem('token')

    try{
      this.setAccessToken(token)
      await this.getSpotifyUser()
      return !!this.usuario
    }
    catch(ex){
      return false
    }
  }

   async getSpotifyUser(){
    const userInfo =  await this.spotifyApi.getMe()
    this.usuario = SpotifyCurrentUser(userInfo)
    console.log(userInfo)
  }

  getUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`
    const responseType = `response_type=token&show_dialog=true`

    return authEndpoint + clientId + redirectUrl + scopes + responseType
  }

  getTokenCallBack(){
    if(!window.location.hash){
      return ''
    }
    const params = window.location.hash.substring(1).split('&')

    const token = params[0].split('=')[1]

    this.setAccessToken(token)

    return token
  }

  setAccessToken(token:string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token)
  }
}
