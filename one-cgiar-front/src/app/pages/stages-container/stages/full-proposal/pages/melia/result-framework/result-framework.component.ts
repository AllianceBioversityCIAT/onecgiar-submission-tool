import { Component, OnInit } from '@angular/core';
import { InitiativesService } from '../../../../../../../shared/services/initiatives.service';

@Component({
  selector: 'app-result-framework',
  templateUrl: './result-framework.component.html',
  styleUrls: ['./result-framework.component.scss']
})
export class ResultFrameworkComponent implements OnInit {
  files:any;
  constructor(
    public _initiativesService: InitiativesService
  ) { }

  ngOnInit(): void {
  }

  filesChange(event){
    console.log('##### filesChange #####');
    console.log(event.currentFiles);
    this.files = event.currentFiles;
  }

  saveSection(){
  //   let data:any = { "meliaId":null,
  //   "melia_plan": "algo especial",
  //   "active": true,
  //   "result_framework":"result_framework"
  //  }

    const formData = new FormData();
      for  (var i =  0; i <  this.files.length; i++)  {  
        this.files[i].atributo = "si funciona"
    formData.append("file[]",  this.files[i]);
    } 

    console.log(this.files);

    // formData.append('file[]', this.files);
    // formData.append('data', data);
    // formData.append('meliaId', null);
    formData.append('melia_plan', "algo no especial");
    // formData.append('active', 'true');
    // formData.append('result_framework', "result_framework");


    this._initiativesService.saveMelia(formData,this._initiativesService.initiative.id).subscribe(resp=>{
      console.log(resp);
    })
  }

//   for  (var i =  0; i <  this.myFiles.length; i++)  {  
//     formData.append("file[]",  this.myFiles[i]);
// } 

  // submitForm() {
  //   var formData: any = new FormData();
  //   formData.append("name", this.form.get('name').value);
  //   formData.append("avatar", this.form.get('avatar').value);
  
  //   this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
  //     (response) => console.log(response),
  //     (error) => console.log(error)
  //   )
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.uploadForm.get('profile').value);

  //   this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
  //     (res) => console.log(res),
  //     (err) => console.log(err)
  //   );
  // }



}
