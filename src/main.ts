// Lucas Monteiro Miranda
// Pedro Henrique Ianes Rodrigues
import './style.css'
async function makeRequest(nomePersonagem:string|undefined) {
  console.log("Buscando "+nomePersonagem);
  const response = await fetch("https://api.jikan.moe/v4/characters?q=" + nomePersonagem)
  const animeCharacterData = await response.json()
  console.log(animeCharacterData)
  console.log("Encontrado "+ animeCharacterData.data["0"].name);
  return([animeCharacterData["data"]["0"]["images"]["webp"].image_url,animeCharacterData.data["0"]["mal_id"]]);
}

async function getCharacterInfo(id:number) {
  const response = await fetch("https://api.jikan.moe/v4/characters/" + id)
  return await response.json();
}

async function getAnimeInfo(id:number) {
  const response = await fetch("https://api.jikan.moe/v4/characters/"+id+"/anime")
  return await response.json();
}

async function returnCharacterImage(){
  const imgContainer = document.getElementById('imageContainer');
  const animesArray = [];
  let animeList: string;
  let characterName = (<HTMLInputElement>document.getElementById("characterName")).value;
  let img = document.createElement('img');
  let resposta = await makeRequest(characterName);
  let extraInfo = await getCharacterInfo(resposta[1])
  let animeInfo = await getAnimeInfo(resposta[1])

  img.src = resposta[0];
  imgContainer!.innerHTML = "";
  imgContainer!.appendChild(img);
  
  imgContainer!.innerHTML += `<p>Este é ${extraInfo.data.name}. Ele é o favorito de ${extraInfo.data.favorites} pessoas. Seus apelidos são: ${extraInfo.data.nicknames}</p>`;
  
  for (let currentAnime of animeInfo.data){
    animesArray.push(`<br><a href="${currentAnime.anime.url}">${currentAnime.anime.title}</a>`)
  }
  animeList = animesArray.join("")
  imgContainer!.innerHTML += `Ele aparece nos seguintes animes:<br> ${animeList}`
}
const button = document.getElementById("button");
button!.addEventListener('click', returnCharacterImage);