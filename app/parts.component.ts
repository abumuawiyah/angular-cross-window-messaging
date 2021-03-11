import { Component, OnInit } from '@angular/core';

let nameParts: string[];
@Component({
  selector: 'table-component',
  template: `<header>
    Here's them rows of the table, <a (click)="openMap()">click here</a> for map window.
    <br>
    <button (click)="sendMessage()" [disabled]="!map">Send message</button> to the other window.
    Messages:
    <ul>
      <li *ngFor="let m of messages">{{ m }}</li>
    </ul>
  </header>
  <main>
    <table class="table">
      <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of rows">
          <td><input type="checkbox"></td>
          <td>{{ row.name }}</td>
          <td>{{ row.value }}</td>
        </tr>
    </table>
  </main>`,
  styles: [`
    main {
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
    }
    .table {
          border: 1px solid #cbcbcb;
          width: 100%;
    }
    thead {
      background-color: #d0d0d0;
    }
    td,
    th {
      border-bottom: 1px solid #cbcbcb;
      border-collapse: collapse;
      padding: 0
    }
    tr:nth-child(even) {
      background-color: #e0e0e0;
    }
    a {
      text-decoration: underline;
    }
  `],
})
export class TableComponent implements OnInit {
  rows = [];
  mapLink = '';
  messages = [];
  map;
  ngOnInit() {
    this.mapLink = window.location.href.replace(/table$/, 'map')
    this.generateRows();
  }

  openMap() {
    console.log(this.mapLink);
    this.map = window.open(this.mapLink, 'Map', 'width=1300,height=700'); 
    
    window.addEventListener('message', this.receiveMessage.bind(this));
    return false;
  }

  sendMessage() {
    console.log("To send message");
    this.map && this.map.postMessage('HI THERE', '*');
  }

  private receiveMessage(event) {
    console.log('Got message', event);
    this.messages.push(event.data);
  }

  private generateRows(num = 1000) {
    this.rows = new Array(num)
      .fill(1)
      .map(() => this.getRandomRow())
  }

  private getRandomRow() {
    const name = this.getValue();
    const value = `${this.getValue()}: ${this.getValue()} - ${this.getValue()}`;
    return {
      name,
      value,
    }
  }

  private getValue() {
      const idx = Math.floor(Math.random() * nameParts.length);
      return nameParts[idx]
  }
}

@Component({
  selector: 'map-component',
  template: `
  <div class="map">Big ass map</div>
  <div class="messages">
    <button (click)="sendMessage()">Send message to main window</button>
    <ul>
      <li *ngFor="let m of messages">{{ m }}</li>
    </ul>
  </div>
  `,
  styles: [`
  div {
    display: inline-block;
  }
  .messages {
    margin: 30px 10px;
    float: left;
    width: 150px;
  }
  .map {
    height: 600px;
    width: 600px;
    margin: 30px auto;
    border: 1px solid #cecece;
    font-size: 40px;
    text-align: center;
    vertical-align: middle;
    line-height: 800px;
  }
  `]
})
export class MapComponent implements OnInit {
  messages = [];
  ngOnInit() {
    window.addEventListener('message', this.handleMessage.bind(this));
  }

  handleMessage(event) {
    console.log('Got msg', event);
    this.messages.push(event.data);
  }
  sendMessage() {
    window.opener.postMessage(new Date().toISOString(), '*');
  }
}

nameParts = `Hi Zlatko,
I did not understand why you said it is not Angular specific. I wrote an Angular app witch contains several Angular (View) components and this Views I need to show on several monitors. So everything is inside Angular, shure I could open another window but that is not I want, I want to open the Angular (View) component (.css, .html) in an other (new) window.

 @Sander I will search your answer and check if it fit my needs.

I try again :) describing my problem with multi monitor in a single app, using another example.

I developed an Angular application which contains >3 Angular components, every component uses Angular material, the main.css for styling and a data service which holds the data.

    First => Order component (table grid) contains a lot of data > 1000 rows (example) and the user always need to see this table
    Second => Order detail component, shown after a click. As the name said this are the details of the order and the user could show or modify details of the order.
    Third => a component which shows trips (table)
    Forth => a map component (shows orders, trips, or whatever was selected)

In the application everything works but the user always need to switch back to the First component if he wants to see the OrderGrid again. I do not like this behaviour, so I changed the application and show 2 components side by side. Shure this works too, but if the the user shows all possible columns of the OrderGrid there isn´t enough space and it looks terrible. My next thought was, ok, I show the OrderDetails in a separate window on the second monitor and this is my problem I could not figure out how to use my application WITHOUT starting the application twice. (Perhaps this is not possible??)
The next step, the user use the orders and plan a trip. Trip is the third component and should be displayed on the third monitor, this view should always be visible too, because sometimes events occour and they should displayed immediatley.

At the moment I use a data service to share the data between the components, this is perhaps a part which I need to change too (as you mentioned).


Best wishes`
.split(/\s+/)