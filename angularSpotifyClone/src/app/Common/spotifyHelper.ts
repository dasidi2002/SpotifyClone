import { iUsuario } from './../pages/interfaces/iUsuario';
export function SpotifyCurrentUser ( user: SpotifyApi.CurrentUsersProfileResponse) : iUsuario{
  return {
    id: user.id,
    nome: user.display_name,
    imagemUrl: user.images.pop().url
  }
}
