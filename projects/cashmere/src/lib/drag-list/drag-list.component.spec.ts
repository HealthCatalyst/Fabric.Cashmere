import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DragDropAssignment, DragListComponent } from './drag-list.component';
import { DragListModule } from './drag-list.module';

describe('DragListTestComponent', () => {
    let component: DragListComponent;
    let fixture: ComponentFixture<DragListComponent>;

    const options: {id: number; name: string; title: string}[] = [
        {id: 1, name: 'option 1', title: 'this is option 1'},
        {id: 2, name: 'option 2', title: 'this is option 2'},
        {id: 3, name: 'option 3', title: 'this is option 3'},
        {id: 4, name: 'option 4', title: 'this is option 4'},
        {id: 5, name: 'option 5', title: 'this is option 5'}
    ];
    const assignments: DragDropAssignment[] = [
        {
            target: {id: 1, name: 'target 1', title: 'this is target 1'},
            assignment: null,
            locked: false
        },
        {
            target: {id: 2, name: 'target 2', title: 'this is target 2'},
            assignment: null,
            locked: false
        },
        {
            target: {id: 3, name: 'target 3', title: 'this is target 3'},
            assignment: options[4],
            locked: true
        }
    ];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports:[DragListModule],
            declarations: [DragListComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(DragListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create the component without error', () => {
        expect(component).toBeTruthy();
    });
    it('submissionAllowed should be invalid if requireAllAssignments is true and there are unassigned targets', () => {
        component.assignments = assignments;
        component.options = options;
        component.requireAllAssignments = true;

        fixture.detectChanges();

        expect(component.submissionAllowed).toBeFalse();
    });
    it('submissionAllowed should be valid if requireAllAssignments is false and there are unassigned targets', () => {
        component.assignments = assignments;
        component.options = options;
        component.requireAllAssignments = false;

        fixture.detectChanges();

        expect(component.submissionAllowed).toBeTrue();
    });
});
