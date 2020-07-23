import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'alle-authentication';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
})
export class ModuleListComponent implements OnInit {
  modules: any = [];
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.currentMessage.subscribe((accessToken) => {
      console.log(
        'portal-member AppComponent 捕捉到 accessToken 改變:',
        accessToken
      );
      this.authService.getModules().subscribe(
        (modules) => {
          this.modules = modules;
        },
        (err) => {
          console.error(
            'app-portal module-list.component.ts getModules fail:',
            err
          );
          if (this.modules !== undefined) {
            delete this.modules;
          }
        }
      );
    });
  }
}
