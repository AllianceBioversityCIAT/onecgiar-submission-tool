import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../../../../../../shared/services/utils.service';

@Component({
  selector: 'app-pob-resports',
  templateUrl: './pob-resports.component.html',
  styleUrls: ['./pob-resports.component.scss']
})
export class PobResportsComponent implements OnInit {
  tesdds = 
  `<table>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>`
  constructor(
    public _utilsService:UtilsService
  ) { }

  ngOnInit(): void {
    
  }

}
