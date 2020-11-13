import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { NbLoginComponent } from "@nebular/auth";

@Component({
  selector: "ngx-login",
  styleUrls: ["./login.component.scss"],
  templateUrl: "./login.component.html",
})
export class NgxLoginComponent extends NbLoginComponent {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.router.routerState.snapshot.url);
  }



}
