import { Component } from "react";
import React from "react";

class Messages extends Component {
  render() {
    const { messages } = this.props;

    return (
      <ul className="Messages-list">
        {messages.map((m) => this.renderMessage(m))}
      </ul>
    );
    // Komponenta prima niz poruka i trenutnog člana kao propse
  }
  renderMessage(message) {
    const { member, text } = message;
    const { currentMember } = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";
    // Metoda renderMessage uzima jedan objekt poruke kao argument i vraća stavku liste koja sadrži sadržaj poruke, korisničko ime i avatar pošiljatelja.

    const randomId = Math.floor(Math.random() * 999999999999);
    /* ružna solucija za rješavanje errora u console. App traži ID te sam mu dodjelio "smeće". Kod se bavi problemom 
    kao što je generiranje slučajnog ID-a za dodjelu svakoj poruci kako bi se izbjegle poruke pogrešaka u konzoli, 
    i postavljanjem imena klase svake poruke da bi se istaknule poruke trenutnog člana
    */

    return (
      <li className={className} key={randomId}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
          //clientData preuzet sa Scaledrone
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
      // u praksi randomID bi pozivao bazu podataka
    );
  }
}

export default Messages;
