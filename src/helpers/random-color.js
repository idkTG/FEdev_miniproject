function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
//helper funkcija koja generira nasumičnu boju korisnika. 16 označava da će taj string biti heksidecimalni broj te doda # da se dobije boja

export default randomColor;
