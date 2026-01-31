import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { SubHeaderTab } from 'src/app/core/models/feature-config';
import { FEATURES } from 'src/app/core/config/features.config';

@Component({
  selector: 'app-feature-sub-header',
  templateUrl: './feature-sub-header.component.html',
  styleUrls: ['./feature-sub-header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class FeatureSubHeaderComponent implements OnInit,OnDestroy {
  currentFeature: string = '';
  currentTabs: SubHeaderTab[] = [];
  private destroy$ = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateCurrentFeature(this.router.url);


    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(event => {
        this.updateCurrentFeature(event.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateCurrentFeature(url: string): void {
    const segments = url.split('/').filter(s => s);
    const featureName = segments[0];

    this.currentFeature = featureName;
    this.currentTabs = FEATURES[featureName] || [];
  }
}
