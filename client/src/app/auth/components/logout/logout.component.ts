import { Component, OnInit, Optional } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {
  message: string = "";

  constructor(@Optional() private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService) {
      this.authService.logout();
    }

    this.message = "Logout successful!";
  }
}