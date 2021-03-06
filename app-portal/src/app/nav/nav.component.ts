import { Component, OnInit, Compiler } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  natShowdiv = true;
  showClass=false;
  constructor(private compiler: Compiler, private router: Router) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('nat url', event.url);
        // 取得router路徑，若為後端管理介面，則隱藏廣告圖片的橫符
        if (event.url.startsWith('/modulelist')) {
          this.natShowdiv = false;
        }
      });
  }

  ngOnInit(): void {}

  clickEventHandler() {
    alert('click');
  }

  // load() {
  //   console.log('loading...');
  //   import('app-sample').then((m) =>  this.compiler.compileModuleAsync(m.SampleModule) );
  //   console.log( import('app-sample').then((m) => console.log(m) ) );
  // }
}
