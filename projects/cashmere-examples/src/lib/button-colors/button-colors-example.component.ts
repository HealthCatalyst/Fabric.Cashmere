import {Component} from '@angular/core';

/**
 * @title Colored Buttons
 */
@Component({
    selector: 'hc-button-colors-example',
    templateUrl: 'button-colors-example.component.html',
    styleUrls: ['button-colors-example.component.scss']
})
export class ButtonColorsExampleComponent {
    color = "ruby-red"
    colorOptions = [
        'blue',
        'green',
        'purple',
        'red',
        'orange',
        'ruby-red',
        'deep-red',
        'red-orange',
        'magenta',
        'pink',
        'light-pink',
        'azure',
        'teal',
        'ai-green',
        'dark-green',
        'light-green',
        'brown',
        'purple-gray',
        'yellow',
        'yellow-orange',
        'tan',
        'white',
        'black',
        'offblack',
        'shadow',
        'dark-blue',
        'charcoal-blue',
        'slate-gray-100',
        'slate-gray-200',
        'slate-gray-300',
        'slate-gray-400',
        'slate-gray-500',
        'slate-gray-600',
        'gray-100',
        'gray-200',
        'gray-300',
        'gray-400',
        'gray-500',
        'gray-600'
    ];
}
