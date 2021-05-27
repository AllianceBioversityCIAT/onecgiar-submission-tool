import { Component, Input, OnInit } from '@angular/core';
import { InitiativesService } from '../../../services/initiatives.service';
import { UploadFiles } from '../../../models/forms-options/upload-files-options.interface';

@Component({
  selector: 'custom-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  @Input() options:UploadFiles;
  constructor(
    public _initiativesService:InitiativesService
  ) { }

  ngOnInit(): void {
  }

}
