// import { Injectable } from "@angular/core";
// import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { map, Observable } from "rxjs";
// import { User } from "../../ipl/types/User";

// export class AuthService {

//   constructor(private http: HttpClient) {}

//   login(user: Partial<User>): Observable<{ [key: string]: string }> {
//     return new Observable();
//   }

//   getToken() : string {
//     return '';
//   }

//   getRole() : string {
//     return '';
//   }

//   getUsers(): Observable<User[]> {
//     return new Observable();
//   }

//   createUser(user: User): Observable<User> {
//     return new Observable();
//   }
// }






// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { Observable, tap } from "rxjs";

// import { User } from "../../ipl/types/User";
// import { environment } from "../../../environments/environment.development";

// @Injectable({
//   providedIn: "root"
// })
// export class AuthService {
//   private baseUrl = `${environment.apiUrl}`;

//   constructor(private http: HttpClient) {}

//   login(user: Partial<User>): Observable<{ [key: string]: string }> {
//     return this.http.post<{ [key: string]: string }>(`${this.baseUrl}/user/login`, user)
//       .pipe(
//         tap((response: any) => {
//           if (response.token) {
//             localStorage.setItem("token", response.token);
//           }

//           if (response.roles) {
//             localStorage.setItem("role", response.roles);
//           }

//           if (response.userId) {
//             localStorage.setItem("userId", response.userId.toString());
//           }
//         })
//       );
//   }

//   getToken(): string {
//     return localStorage.getItem("token") || "";
//   }

//   getRole(): string {
//     return localStorage.getItem("role") || "";
//   }

//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.baseUrl}/users`);
//   }

//   createUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.baseUrl}/user/register`, user);
//   }

//   // logout(): void {
//   //   localStorage.removeItem("token");
//   //   localStorage.removeItem("role");
//   //   localStorage.removeItem("userId");
//   // }

//   isLoggedIn(): boolean {
//     return this.getToken() !== "";
//   }
// }



import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

import { User } from "../../ipl/types/User";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  login(user: Partial<User>): Observable<{ [key: string]: string }> {
    return this.http.post<{ [key: string]: string }>(`${this.baseUrl}/user/login`, user)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem("token", response.token);
          }

          if (response.roles) {
            localStorage.setItem("role", response.roles);
          }

          if (response.userId) {
            localStorage.setItem("userId", response.userId.toString());
          }
        })
      );
  }

  getToken(): string {
    return localStorage.getItem("token") || "";
  }

  getRole(): string {
    return localStorage.getItem("role") || "";
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/register`, user);
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  }
}