import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeatureSubHeaderComponent } from 'src/app/shared/components/feature-sub-header/feature-sub-header.component';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, NavbarComponent, FeatureSubHeaderComponent]
})
export class MainLayoutComponent {

}
