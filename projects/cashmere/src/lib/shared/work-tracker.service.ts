import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subscription} from 'rxjs';

@Injectable()
export class WorkTrackerService {
    public start(task: () => Promise<any>): Observable<boolean> {
        let working = new ReplaySubject<boolean>();
        working.next(true);
        task()
            .then(() => {
                working.next(false);
            })
            .catch(() => {
                working.next(false);
            });

        return working.asObservable();
    }

    public startObservable(task: () => Subscription): Observable<boolean> {
        let working = new ReplaySubject<boolean>();
        let taskSubscription = task();
        working.next(true);

        taskSubscription.add(() => {
            working.next(false);
            taskSubscription.unsubscribe();
        });

        return working.asObservable();
    }
}
