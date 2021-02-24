import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { AllInitiatives } from '../models/initiative.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InitiativesService {

  public initvStgId: string;

  constructor(private http: HttpClient) { }

  getQuery(query: string) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.apiUrl + `${query}`;
    return this.http.get<any>(URL, { headers });
  }

  postQuery(query: string, body: any) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.apiUrl + `${query}`;
    return this.http.post<any>(URL, body, { headers });
  }

  updateQuery(query: string, body: any) {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const headers = new HttpHeaders({
      'auth': token
    });
    const URL = environment.apiUrl + `${query}`;
    return this.http.patch<any>(URL, body, { headers });
  }

  // Query to get an initiative by ID
  getInitiativeById(id: number): Observable<any> {
    console.log('numero de la funcion')
    return this.getQuery('/initiatives/own')
      .pipe(map((data: any) => {
        console.log('getInitiativeById', data);
        return data.data.find(resp => resp.initvStgId == id);
      }));
  }

  // Query to get all the initiatives
  getAllInitiatives(): Observable<any> {
    return this.getQuery('/initiatives');
  }

  // Query to get all the initiatives by user
  getInitiativesByUser(): Observable<any> {
    return this.getQuery('/initiatives/own');
  }

  // Query to get the concept information (general information and narratives section)
  getConcept(id): Observable<any> {
    return this.getQuery(`/stages-control/concept/${id}`);
  }

  // Query to get the action areas
  getActionAreas(): Observable<any> {
    return this.getQuery(`/initiatives/areas`);
  }

  // Query to get action areas by ID
  getActionAreaById(id: number): Observable<any> {
    return this.getQuery('/initiatives/areas').pipe(map((data: any) => {
      let result;
      data.data.forEach(element => {
        if (element.id == id) {
          result = element;
        }
      });
      console.log('action area encontrado', result);
      return result.description;
    }));
  }

  // Query to get theory of change information by ID
  getTheoryOfChange(id: number): Observable<any> {
    return this.getQuery(`/stages-control/concept/tocs/${id}/files`);
  }

  // Query to geta work package by ID
  getWorkPackageById(id: number): Observable<any> {
    console.log('numero de la funcion')
    return this.getQuery(`/stages-control/concept/packages/${id}`)
      .pipe(map((data: any) => {
        console.log('getWorkPackageById', data);
        return data.data.find(resp => resp.initvStgId == id);
      }));
  }

  // Query to create an initiative (Only users with admin role can do this)
  createInitiative(body: any): Observable<any> {
    console.log('initiative', body);
    return this.postQuery('/initiatives', body);
  }

  // Query to create concept information (general information and narratives section)
  createConcept(body: any, description: string): Observable<any> {
    body.action_area_description = description;
    console.log('description', description);
    console.log('createConcept', body);
    return this.postQuery('/stages-control/concept', body);
  }

  // Query to create theory of change (narrative and files)
  createTheoryOfChange(fileToUpload: File[], body: any): Observable<any> {
    const endpoint = `${environment.apiUrl}/stages-control/concept/tocs`;
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const formData: FormData = new FormData();
    formData.append('initvStgId', body.initvStgId);
    formData.append('narrative', body.narrative);
    console.log('fileToUpload[0]', fileToUpload);
    fileToUpload.forEach((file) => {
      formData.append('files', file, file.name);
    })
    // formData.append('files', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, { headers: new HttpHeaders({ 'auth': token }) });
  }

  // Query to create the files of the theory of change (Only files)
  createTOCFiles(fileToUpload: File[], body: any): Observable<any> {
    const endpoint = `${environment.apiUrl}/stages-control/concept/tocs/files`;
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = user.token;
    const formData: FormData = new FormData();
    formData.append('tocId', body.tocId);
    console.log('fileToUpload[0]', fileToUpload);
    fileToUpload.forEach((file) => {
      formData.append('files', file, file.name);
    })
    return this.http.post(endpoint, formData, { headers: new HttpHeaders({ 'auth': token }) });
  }

  // Query to create a work package
  createWorkPackages(body: any): Observable<any> {
    return this.postQuery(`stages-control/concept/packages`, body);
  }

  // Query to update concept information (general information and narratives section)
  updateConcept(body: any, description: string, id: any): Observable<any> {
    body.action_area_description = description;
    body.id = id;
    console.log('body', body);
    console.log('description', description);
    return this.updateQuery('/stages-control/concept', body);
  }

  // Query to update the narrative of a theory of change (Only narrative)
  updateTheoryOfChange(body: any, id: number): Observable<any> {
    let sample = {
      id: id,
      narrative: body
    }
    return this.updateQuery('/stages-control/concept/tocs', sample);
  }

  // Query to delete the files
  deleteTOCFiles(body: any): Observable<any> {
    return this.updateQuery(`/stages-control/concept/tocs/files`, body);
  }

}
