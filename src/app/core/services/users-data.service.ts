import { User, setUserProfile } from './../../reducers/state';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  store = inject(Store);

  constructor() {}

  private users: User[] = [
    {
      firstName: 'Azat',
      lastName: 'Farmanyan',
      birthDate: '2000-05-09',
      city: 'Akhaltsikhe',
      id: 1,
    },
    {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      city: 'New York',
      id: 2,
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      birthDate: '1985-03-15',
      city: 'Los Angeles',
      id: 3,
    },
    // Add more users as needed
  ];

  private activeUserData = new BehaviorSubject<User>({
    firstName: '',
    lastName: '',
    birthDate: '',
    city: '',
    id: 0,
  });

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getActiveUser() {
    return this.activeUserData;
  }

  setActiveUser(userId: number) {
    const user = this.getUserById(userId);
    if (user) this.activeUserData.next(user);
  }

  updateUserById(id: number, updatedUserData: User) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...updatedUserData,
      };

      // Check if the updated user is the active user
      const activeUser = this.activeUserData.value;
      if (activeUser && activeUser.id === id) {
        const updatedActiveUser = {
          ...activeUser,
          ...updatedUserData,
        };
        this.activeUserData.next(updatedActiveUser);
        if (updatedUserData)
          this.store.dispatch(
            setUserProfile({
              user: updatedUserData,
            })
          );
      }
    }
  }
}
