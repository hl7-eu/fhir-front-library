# fhir-front-library

  Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">node js</a></code>

## Run the project on your device:

  1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
  2) In the terminal, run `npm install` to install dependencies
  3) Run `npm run build` to build the project when you add a component

## Publish when you create or modify a component

  1) In the package.json file, increment the library version
  2) Run `npm run build` to build the project when you add a component
  3) Run `npm publish ??` to publish the library (Scope TBD)

## StoryBook

 1) Run `npm run storybook` to display the StoryBook preview in the localhost

## Version management

TBD

## CSS variable used in components and editable in the application's css style

  --primary-color (default color: #e40032)
  --secondary-color (default color: #333f4c)
  --gray (default color: #D9D9D9)
  --white:(default color: #fff)

  # Font-size
  --navbar1-size: 1rem;
  --title-1-desktop-size: 3rem;
  --title-1-tablet-size: 2.5rem;
  --title-2-desktop-size: 2.2rem;
  --title-2-tablet-size: 1.6rem;
  --title-3-desktop-size: 1.75rem;
  --title-3-tablet-size: 1.375rem;
  --title-4-desktop-size: 1.5rem;
  --title-4-tablet-size: 1.19rem;
  --title-5-desktop-size: 1.25rem;
  --title-5-tablet-size: 1rem;

  ## Paddings
    --padding-sm: 1.38rem;
    --padding-md: 5rem;

  ## Gaps
     --gap-lg: 3.13rem;

   to use it in the application, you can opened the file 'style.css' and added this lines (you can change the value if you want):
    /* Colors */
    --primary-color: #e40032; (change color code)
    --secondary-color: #333f4c; (change color code)
    --gray: #D9D9D9; (change color code)

    /* font sizes */
    --navbar1-size: 1rem; (change value) 
    --title-1-desktop-size: 3rem; (change value) 
    --title-1-tablet-size: 2.5rem; (change value) 
    --title-2-desktop-size: 2.2rem; (change value) 
    --title-2-tablet-size: 1.6rem; (change value) 
    --title-3-desktop-size: 1.75rem; (change value) 
    --title-3-tablet-size: 1.375rem; (change value) 
    --title-4-desktop-size: 1.5rem; (change value) 
    --title-4-tablet-size: 1.19rem; (change value) 
    --title-5-desktop-size: 1.25rem; (change value) 
    --title-5-tablet-size: 1rem; (change value) 

    /* Paddings */
    --padding-sm: 1.38rem; (change size if you want)
    --padding-md: 5rem; (change size if you want)

    /* Gaps */
    --gap-lg: 3.13rem; (change size if you want)

## SCSS variables used to override Bootstrap style

  ## Open the application's Custom.scss file in the application and add its lines :

    $darkGray: #333f4c;
    $red: #e40032;
  
    $theme-colors: (
      "danger": $red,
      "primary": $red,
      "secondary": $darkGray,
  );