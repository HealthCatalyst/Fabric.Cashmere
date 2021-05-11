import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MarkdownDirective} from './markdown.directive';

@Component({
    template: `
        <div [hcMarkdown]="markdownInput"></div>
    `
})
class Test1Component {
    markdownInput = `hello world`;
    highlight: boolean;
    lineNumbers: boolean;
}

@Component({
    template: `
        <div [hcMarkdown]="markdownInput" [sanitize]="sanitize" [highlight]="highlight" [lineNumbers]="lineNumbers"></div>
    `
})
class Test2Component {
    markdownInput = `hello world`;
    sanitize: boolean;
    highlight = true;
    lineNumbers = true;
}

describe('MarkdownDirective', () => {
    let fixture: ComponentFixture<Test1Component | Test2Component>;
    let el: HTMLElement;
    let comp: Test1Component | Test2Component;

    function getHtml(selector = 'div'): string | undefined {
        const ret = el && el.querySelector && el.querySelector(selector);
        if (ret) {
            return ret.innerHTML;
        }
        return undefined;
    }

    function getHtmlCount(selector = 'div'): number {
        const ret = el && el.querySelectorAll && el.querySelectorAll(selector);
        if (ret) {
            return ret.length;
        }
        return 0;
    }

    function getText(selector = 'div'): string | undefined {
        const ret = el && el.querySelector && el.querySelector(selector);
        if (ret) {
            return ret.textContent || undefined;
        }
        return undefined;
    }

    describe('only markdown parameter is filled in', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [MarkdownDirective, Test1Component]
            }).compileComponents();

            fixture = TestBed.createComponent(Test1Component);
            el = fixture.nativeElement;
            comp = fixture.componentInstance;
        });

        it('should be defined', () => {
            expect(comp).toBeDefined();
        });

        it('should render markdown to html', () => {
            fixture.detectChanges();
            expect(getText()).toBe('hello world\n');
        });

        it('should render code without highlighting if language is not specified', () => {
            comp.markdownInput = '```export class MyClass {}```';
            fixture.detectChanges();
            expect(getHtml('pre.hljs')).toBeUndefined();
            expect(getText('code')).toBe('export class MyClass {}');
        });

        it('should render code with highlighting if language is specified in first line and show line-numbers', () => {
            comp.markdownInput = '``` typescript\nclass A {\nconst x:number;}\n```\n';
            fixture.detectChanges();
            expect(getHtml('pre.hljs')).toBeDefined();
            expect(getHtmlCount('.line-number span')).toEqual(2);
            expect(getText('code')).toBe('class A {\nconst x:number;}\n');
        });
    });

    describe('all parameters filled in', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [MarkdownDirective, Test2Component]
            }).compileComponents();

            fixture = TestBed.createComponent(Test2Component);
            el = fixture.nativeElement;
            comp = fixture.componentInstance;
        });

        it('should be defined', () => {
            expect(comp).toBeDefined();
        });

        it('should render markdown to html', () => {
            fixture.detectChanges();
            expect(getText()).toBe('hello world\n');
        });

        it('should render code without highlighting if language is not specified', () => {
            comp.markdownInput = '```export class MyClass {}```';
            fixture.detectChanges();
            expect(getHtml('pre.hljs')).toBeUndefined();
            expect(getText('code')).toBe('export class MyClass {}');
        });

        it('should render code with highlighting if language is specified in first line and show line-numbers', () => {
            comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}\n```\n';
            fixture.detectChanges();
            expect(getHtml('pre.hljs')).toBeDefined();
            expect(getHtmlCount('.line-number span')).toEqual(3);
            expect(getText('code')).toBe('class A {\nconst x:number;\n}\n');
        });

        it('should not highlight if highlight Input is set to false', () => {
            comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}\n```';
            comp.highlight = false;
            fixture.detectChanges();
            expect(getHtml('pre.hljs')).toBeUndefined();
            expect(getHtml('code')).toBe('class A {\nconst x:number;\n}\n');
        });

        it('should not add line-numbers if highlight Input is set to false', () => {
            comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}```';
            comp.highlight = false;
            fixture.detectChanges();
            expect(getHtmlCount('.line-number span')).toEqual(0);
        });

        it('should not add line-numbers if showNumbers Input is set to false', () => {
            comp.markdownInput = '```typescript\nclass A {\nconst x:number;\n}```';
            comp.lineNumbers = false;
            fixture.detectChanges();
            expect(getHtmlCount('.line-number span')).toEqual(0);
        });
    });
});
