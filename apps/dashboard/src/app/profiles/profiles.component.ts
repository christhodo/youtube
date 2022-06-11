import { Component } from '@angular/core';
import { ProjectsService } from '@project-angular/core-data';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'project-angular-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent {
  videos: any[];
  private unsubscribe$: Subject<any> = new Subject();

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.videos = [];
    this.projectsService
      .getVideosForChanel('UC3L9XPe0_FGfRG-CMGtBvFg', 1)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lista) => {
        for (let element of lista['items']) {
          this.videos.push(element);
        }
      });
  }
}
