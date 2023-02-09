# TenPinBowling
This is the assesment submission project for Ten Pin Bowling Score Calculator.   
## Business Rules

* A game consists of ten frames. Frame 1-9 are composed of two rolls. Frame 10 can be composed of up to three rolls 
depending on if the first rolls in the frame is a strike or a spare. 
* Each frame can have one of three marks: 
  * Strike: all 10 pins where knocked down with the first roll.
  * Spare: all 10 pins where knocked down using two rolls.
  * Open: some pins where left standing after the frame was completed.
* When calculating the total score, the sum of the score for each frame is used.
  * For an open frame the score is the total number of pins knocked down.
  * For a strike, the score is 10 + the sum of the two rolls in the following frame.
  * For a spare, the score is 10 + the number of pins knocked down in the first roll of the following frame. 
  
The tenth frame may be composed of up to three rolls: the bonus roll(s) following a strike or spare in the tenth (sometimes referred to as the eleventh and twelfth frames) are fill ball(s) used only to calculate the score of the mark rolled in the tenth. 

## Technical Description

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test --coverage-code=true` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Browser Support

The application supports newest version of Chrome, FF, Safari

## Contact

For additional information reach out to [Chaitrika Chowdhury](mailto://chowdhurychaitrika@gmail.com)
