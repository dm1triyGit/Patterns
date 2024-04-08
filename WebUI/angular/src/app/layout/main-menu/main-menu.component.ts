import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainMenuService } from './services';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMenuComponent {
  public readonly menuItems$ = this.mainMenuService.getMeniItems();

  constructor(private readonly mainMenuService: MainMenuService) {}
}
