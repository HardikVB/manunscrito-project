import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  decodeToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}