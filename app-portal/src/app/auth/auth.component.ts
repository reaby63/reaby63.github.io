import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}

  // access_token: e806ff0a53d6e3df1b2fed78273d6108
  // preauth_token: oKTNDjuNXv04A1Zq7Xr6LHSpXpk=
  ngOnInit(): void {
    // check login status by get access_token and get ca by calling api
    this.checkAccessToken();
  }

  checkAccessToken(): void {
    console.log('check access_token:', this.authService.accessToken);
    if (!this.authService.accessToken || this.authService.accessToken === '') {
      console.log('no access_token.');
      this.getAccessToken();
    } else {
      console.log('has access_token. stop.');
    }
  }

  getAccessToken(): void {
    console.log('getAccessToken');
    if (!this.authService.preauthToken || this.authService.preauthToken === '') {
      this.goLogin();
    } else {
      this.generateByPreauthToken();
    }
  }

  generateByPreauthToken(): void {
    console.log('generateByPreauthToken');
    // 透過preauth_token換得access_token
    this.authService
      .getTokenByRefreshToken(this.authService.preauthToken)
      .subscribe((returnData) => {
        console.log(
          'auth.component generateByPreauthToken returnData:',
          returnData
        );
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
  goLogin(): void {
    console.log('goLogin');
    // 跳轉登入畫面，取得auth_code，再換成access_token與preauth_token
    window.location.href =
      'http://localhost:4200/web-auth/tpLogin.jsp?type=websso&app_login=true&returnUrl=http://localhost:4200/auth/getCode';
  }
}
