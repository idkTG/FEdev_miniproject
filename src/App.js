import Input from "./Input";
import Messages from "./Messages";
import randomName from "./helpers/random-name.js";
import randomColor from "./helpers/random-color";
import "./App.css";

import React, { Component } from "react";

class App extends Component {
  state = {
    messages: [],
    chatmember: {
      username: randomName(),
      color: randomColor(),
    },
  };
  /*
  Komponenta definira početno stanje člana chata s nasumičnim korisničkim imenom i bojom, 
  a koristi biblioteku Scaledrone za stvaranje veze s prostorijom za chat.
  */

  constructor() {
    super();
    /*
    Upotreba super() je važna kada se definira konstruktor za podrazred koji proširuje nadređeni razred (parent, child), 
    jer osigurava da se konstruktor nadređenog razreda pozove prije konstruktora podrazreda 
    te da se obavi svako potrebno podešavanje ili inicijalizacija.
    */

    this.drone = new window.Scaledrone("WxEBl3VtnDcmqr4W", {
      // channelID koji je generirao Scaledrone bi se trebao nalazi unutar .env da se izbjegne hardcodiranje i ostvari privatnost

      data: this.state.chatmember,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      if (this.state) {
        // osiguranje da se prazne vrijednosti ne spremaju u state
        const chatmember = this.state.chatmember;
        chatmember.id = this.drone.clientId;
        this.setState({ chatmember });
      }
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data }); //clientData se nalazi unutar member
      if (messages.length > 0) {
        // osiguranje da se prazne vrijednosti ne spremaju u state
        this.setState({ messages });
      }
    });
  }
  /*
  Konstruktor inicijalizira instancu Scaledrone-a s podacima člana chata i spaja se na kanal "observable-room" 
  kako bi slušao dolazne poruke. Kada stigne nova poruka, dodaje je u niz poruka stanja, 
  što pokreće ponovno iscrtavanje komponente.
  */

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>AlgebraChatApp</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.chatmember}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }
  /*
  Metoda render vraća raspored aplikacije za chat, koji uključuje zaglavlje, 
  komponentu Messages i komponentu Input. 
  Komponenti Messages prosljeđuje se trenutno stanje poruka i člana chata, 
  dok se komponenti Input prosljeđuje povratni pozivna funkcija za slanje poruke.
  */

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
