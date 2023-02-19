# Seminarski rad

Zadatak je napisati web chat aplikaciju.
ReactJS je korišten za izradu projekta.
Seminarski rad je dostupan i na [GitHub](https://github.com/idkTG/algebra_fedev_tonigorian).

#### Funkcionalna specifikacija

Kreirano je funkcionalno korisničko sučelje za sudionike u chatu i kreirani kod postaviti na GitHub.
Navedena chat aplikacija izvršava:

- kreira nove tekstualne poruke
- na enter ili klik na button "send" šalje poruku (prikazana na ekranu uz ime autora, dodjeljenu boju i avatar u boji)
- za svakog sudionika u chatu odabrana je slučajna boja i ime kojih ih identificiraju
- povezana je sa Scaledrone servisom te uspješno simulirati razgovor svih aktivnih korisnika
- kod web aplikacije je dostupan preko javnog GitHub računa (minus _node_module_)

#### Potrebni alati

- Visual Studio Code
- Node.js
- Scaledrone
- Internet pretraživač (Google Chrome se preferira radi debug mogućnosti ali nije obavezan)

#### Analiza projekta

Projekt sadrži tri komponente: App.js, Messages.js i Input.js

> **App.js**

`App.js` je glavna React komponenta chat aplikacije.

Kratki pregled koda i njenih funkcionalnosti:

**Izjava uvoza**: Kod uvozi nekoliko modula i datoteka koje su potrebne za rad aplikacije, uključujući `Input`, `Messages` i nekoliko pomoćnih funkcija.

**Definicija klase**: Klasa `"App"` definira se kao React komponenta koja proširuje klasu "Component".

**Konstruktor**: Funkcija konstruktora poziva se kada se komponenta prvi put postavi i inicijalizira `"drone"` objekt pomoću Scaledrone biblioteke. Također postavlja početno stanje komponente s praznim nizom poruka i objektom člana razgovora koji uključuje slučajno korisničko ime i boju.

**Renderiranje komponente**: Metoda `"render"` definira strukturu i raspored chat aplikacije koristeći uvezene komponente `"Input"` i `"Messages"`. Prebacuje stanje varijabli `messages"` i `"chatmember"` kao propse komponenti `"Messages"`.

**Obrada događaja**: Funkcija `"onSendMessage"` poziva se kada korisnik šalje poruku u chat aplikaciji. Ona objavljuje poruku na Scaledrone "observable-room" kanalu koristeći funkciju `"publish"`.

Općenito, ovaj kod definira glavnu funkcionalnost chat aplikacije i strukturiran je na način koji slijedi najbolje prakse za razvoj React-a. Uključuje dobro definirane stanje varijable, rukovatelje događajima i logiku renderiranja komponenti.

> **Messages.js**

`Messages.js` je kod napisan u JavaScriptu koristeći React knjižnicu. Definira React komponentu nazvanu `"Messages"` koja prikazuje listu poruka. Komponenta prima dvije vrijednosti, `"messages"` i `"currentMember"`.

Render metoda komponente mapira `"messages"` polje pomoću map metode za prikazivanje svake poruke koristeći `"renderMessage"` metodu definiranu ispod nje. `"renderMessage"` metoda prima jednu poruku kao argument i prikazuje je kao HTML stavku liste.

U `"renderMessage"` metodi, `"member"` i `"text"` svojstva poruke su destrukturirana, a također je destrukturiran i `"currentMember"` svojstvo propse komponente. Varijabla `"messageFromMe"` postavljena je na true ako `"id"` svojstvo `"member"` objekta odgovara `"id"` svojstvu `"currentMember"` objekta.

Varijabla `"className"` postavljena je na `"Messages-message currentMember"` ako je `"messageFromMe"` true, što dodaje klasu `"currentMember"` na stavku liste poruka kako bi se razlikovala od drugih poruka.

Kako bi se izbjegla pogreška konzole koja zahtijeva da svaki element u listi ima jedinstveni `"key"` prop, generira se nasumični ID za svaku poruku i koristi se kao ključ. Varijabla `"randomId"` generira se pomoću `Math.random()` metode i dodaje se na ključni prop stavke liste.

Komponenta izvozi `"Messages"` klasu kao svoj izvoz prema zadanim postavkama, što omogućuje da se uvozi i koristi u drugim dijelovima koda.

> **Input.js**

`Input.js` je kod napisan u JavaScriptu koristeći React knjižnicu. Definira React komponentu nazvanu `"Input"` koja pruža polje za unos teksta i gumb za slanje poruka. Komponenta ima lokalno stanje koje pohranjuje tekst unesen u polje za unos.

U render metodi komponente, definira se obrazac s poljem za unos teksta i gumbom. Vrijednost polja za unos teksta postavljena je na `"text"` svojstvo stanja komponente, a na polje za unos teksta dodan je `"onChange"` događaj koji ažurira stanje `"text"` svaki put kad korisnik upiše nešto u polju.

Metoda `"onSubmit"` poziva se kad se obrazac pošalje. Događaj se sprječava u svojoj uobičajenoj radnji, a to je ponovno učitavanje stranice. Stanje `"text"` se resetira na prazan string, a metoda `"onSendMessage"`, koja je predana kao svojstvo komponente, poziva se s trenutnom vrijednosti stanja `"text"` kao njezinim argumentom.

Komponenta izvozi klasu `"Input"` kao svoj izvoz po zadanom, što joj omogućava da se uvozi i koristi u drugim dijelovima koda.

> **helpers**

`helpers` datoteka je stvorena iz razloga da se kod cjelokupnog projekta uredi i da bude čitljiviji.

> > **random-color.js**

`random-color.js` je kod napisan u JavaScriptu koji izvozi jednu funkciju nazvanu `"randomColor"`. Funkcija generira nasumični heksadecimalni kod boje u obliku `"#RRGGBB"`.

Funkcija to postiže generiranjem slučajnog broja između 0 i 16.777.215 (0xffffff u heksadecimalnom obliku). Zatim konvertira broj u njegovu heksadecimalnu reprezentaciju koristeći metodu `"toString"` s bazom 16. Konačno, funkcija spaja dobivenu nisku s oznakom `"#"` kako bi se stvorio valjani kod boje.

Izvezena funkcija `"randomColor"` može se uvesti i koristiti u drugim dijelovima koda za generiranje nasumičnih boja.

> > **random-name.js**

`random-name.js` je JavaScript funkcija koja izvozi jednu funkciju nazvanu `"randomName"`. Ova funkcija generira slučajna imena odabirom jedne stavke iz dvije liste, jedne koja sadrži pridjeve, a druge koja sadrži imenice.

Funkcija započinje definiranjem niza pridjeva i niza imenica. Zatim bira nasumični pridjev i nasumičnu imenicu generirajući nasumični indeks za svaki niz pomoću metode `"Math.random"`, a zatim koristi metodu `"Math.floor"` za zaokruživanje rezultata na najbliži cijeli broj.

Konačno, funkcija vraća spojeni `string` odabranog pridjeva i imenice.

Ova funkcija se može uvesti i koristiti u drugim dijelovima koda za generiranje slučajnih imena.
