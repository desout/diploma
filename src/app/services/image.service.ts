import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {pathConfig} from '../configs/urlConfigs';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  public getImage = (id: number): Observable<Blob> =>
    this.http.get(`${pathConfig.baseUrl}${pathConfig.imagesAPI}/${id}`)
      .pipe(tap(res => console.log(res)), switchMap(res => this.createImageFromBlob(res[0].photo)));

  createImageFromBlob(image: { type: string, data: number[] }) {
    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(new Blob([new Uint8Array(image.data)], {type: 'image/png'}));
    }
    return Observable.create(observer => {
      reader.onloadend = () => {
        observer.next(reader.result);
        observer.complete();
      };
    });
  }

  public addImage = (image: File) => this.http.put<{ id: number }>(`${pathConfig.baseUrl}${pathConfig.imagesAPI}/upload`, this.prepareImage(image));

  prepareImage = (image: File) => {
    const formData = new FormData();
    formData.append('photo', image, image.name);
    return formData;
  };
}
