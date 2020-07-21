import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-get-code',
  templateUrl: './get-code.component.html',
  styleUrls: ['./get-code.component.scss'],
})
export class GetCodeComponent implements OnInit {
  constructor(private authService: AuthService) {}

  code: string;
  ngOnInit(): void {
    console.log('this is getCode');
    // let x:string = location.search;
    // console.log('x:', x);
    const urlParams = new URLSearchParams(window.location.search);
    // console.log('has code:',urlParams.has('code'));
    // console.log('show code:', urlParams.get('code'));
    if (urlParams.has('code')) {
      this.code = urlParams.get('code');
    }
    console.log('this.code:', this.code);

    this.getToken(this.code);
  }

  getToken(code: string): void {
    if (code !== undefined && code !== '') {
      this.authService.getTokenByCode(code).subscribe((returnData) => {
        console.log('get-code.component getToken returnData:', returnData);
        if (returnData !== undefined) {
          // var json = JSON.parse(returnData);
          this.authService.accessToken = returnData.access_token;
          this.authService.preauthToken = returnData.preauth_token;

          console.log('access_token:', this.authService.accessToken);
          console.log('preauth_token:', this.authService.preauthToken);
        } else {
          alert('取得Token失敗！無回傳值');
        }
      });
    }
  }
}
