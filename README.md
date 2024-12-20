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

Most of the style used by the library is taken from Bootstrap. Other variables are described in this section with their default values. You can change them in your application if needed.

# Fonts 
  --georama-semi: "Georama SemiCondensed";
  --font-lato: Lato;

# Font-size
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
