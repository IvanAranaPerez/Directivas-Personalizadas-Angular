import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {


  private usersService = inject(UsersServiceService);
  public userId = signal(1);

  public curretUser = signal<User|undefined>(undefined);

  public userWasFound = signal(true);

  public fullName = computed<string>(()=>{
    if(!this.curretUser()) return 'Not found user';

    return `${this.curretUser()?.first_name} ${this.curretUser()?.last_name}`;
  }); //Propiedad computada

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(id:number) {
    if(id <= 0) return;
    this.userId.set(id);
    this.curretUser.set(undefined);

    this.usersService.getUsrById(id).subscribe({
      next: (user) => {
        this.curretUser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {this.userWasFound.set(false); this.curretUser.set(undefined);}
    });
  }


}
