import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {BrailleToEngComponent} from "./components/braille-to-eng/braille-to-eng.component";
import {EngToBrailleComponent} from "./components/eng-to-braille/eng-to-braille.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

export const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "brailletoeng", component: BrailleToEngComponent},
  {path: "engtobraille", component: EngToBrailleComponent, data: {animation: 'isMove'}},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
