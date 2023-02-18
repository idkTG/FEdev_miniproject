import { Component } from "react";
import React from "react";

class Input extends Component {
  state = {
    text: "",
  };
  render() {
    return (
      <div className="Input">
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Enter your message and press ENTER"
            autoFocus={true}
          />
          <button>Send</button>
        </form>
      </div>
    );
    /*
    Render metoda vraća obrazac s poljem za unos, gumbom i tekstom za prikaz u praznom polju. 
    Kad se obrazac pošalje, poziva se metoda onSubmit, 
    */
  }

  onChange(e) {
    this.setState({ text: e.target.value }); //Metoda onChange ažurira stanje komponente s trenutnom vrijednosti polja za unos kad se promijeni.
  }
  onSubmit(e) {
    //sprječava zadano ponašanje slanja obrasca i poziva callback funkciju onSendMessage koja je predana kao prop s trenutnim tekstom iz stanja komponente.

    e.preventDefault();
    this.setState({ text: "" });
    this.props.onSendMessage(this.state.text);
  }
}

export default Input;
