The progress bar component has a mobile-friendly solution built into it. This is only visible when the screen size is under a certain breakpoint (in pixels) as defined by the user. At that screen size the mobile version becomes visible and the desktop version disappears. The breakPoint variable should be declared in the component.ts file where you're using the hc-progress-bar element.

`breakPoint: string = '1024';`

 And then the attribute should be defined on the hc-progress-bar element itself.
 
 `[breakPoint]="breakPoint"`