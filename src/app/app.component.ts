import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Piano';

  aplicarSonido(numero: number): void {

    const audio = new Audio();
    audio.src = '../assets/Sonidos/note'+ numero+'.wav';
    audio.load();
    audio.play();

  }
}
