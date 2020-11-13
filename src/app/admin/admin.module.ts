import { NgModule } from "@angular/core";
import { NbMenuModule, NbTooltipModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { MiscellaneousModule } from "../miscellaneous/miscellaneous.module";

@NgModule({
  imports: [
    AdminRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    NbTooltipModule,
  ],
  declarations: [AdminComponent],
})
export class AdminModule { }
