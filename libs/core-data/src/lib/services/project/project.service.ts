import { Injectable } from '@angular/core';
import { Project } from '@project-angular/api-interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'apps/dashboard/src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { apiKey } from 'apps/dashboard/key/apiKey';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  model = 'users';
  private imageUrl = `https://robohash.org/`;

  constructor(private http: HttpClient) {}

  getVideosForChanel(channel, maxResults): Observable<Object> {
    let url =
      'https://www.googleapis.com/youtube/v3/search?key=' +
      apiKey +
      '&channelId=' +
      channel +
      '&order=date&part=snippet &type=video,id&maxResults=' +
      maxResults;
    return this.http.get(url).pipe(
      map((res) => {
        return res;
      })
    );
  }

  all() {
    return this.http.get<Project[]>(this.getUrl()).pipe(
      map((projects) =>
        projects.map((project) => ({
          ...project,
          defaultImageUrl: `${this.imageUrl}${project.name}`,
        }))
      )
    );
  }

  find(id: string) {
    return this.http.get<Project>(this.getUrlWithId(id));
  }

  create(project: Project) {
    return this.http.post(this.getUrl(), project);
  }

  update(project: Project) {
    return this.http.put(this.getUrlWithId(project.id), project);
  }

  delete(project: Project) {
    return this.http.delete(this.getUrlWithId(project.id));
  }

  private getUrl() {
    return `${environment.apiEndpoint}/${this.model}`;
  }

  private getImage() {
    return `${this.imageUrl}${this.model}`;
  }

  private getUrlWithId(id) {
    return `${this.getUrl()}/${id}`;
  }
}
