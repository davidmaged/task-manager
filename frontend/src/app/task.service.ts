import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createList(title: string){
    return this.webRequestService.post('lists',{title});
  }

  getLists(){
    return this.webRequestService.get('lists');
  }

  getTasks(listId: string){
    return this.webRequestService.get('lists/'+ listId +'/tasks')
  }

  createTask(title: string, listId: string){
    return this.webRequestService.post(`lists/${listId}/tasks`,{title})
  }

  complete(task: Task){
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`,{completed : !task.completed});
  }
}
