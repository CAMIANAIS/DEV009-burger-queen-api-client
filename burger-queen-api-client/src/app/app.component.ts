import { Component,HostListener} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'burger-queen-api-client';
  
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onScroll() {
    // Lógica para determinar cuándo mostrar el botón
    const aboutMeSection = document.getElementById('about');
    if (aboutMeSection) {
      this.showScrollButton = window.scrollY > aboutMeSection.offsetTop;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
