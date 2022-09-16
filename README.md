## WordleDupe


Let me paint you a tale of my love for wordle. It was 2021 and we were a SOLID year and change into the pandemic. Most of us were confined at home to be good people for our friends and family but the boredom was immense. Then like a shining beacon of mental hope, came wordle, the (relatively) simple game of guessing a five letter word and trying to guess the secret word based on the hints given from that first guess. 

The hints being, 
- whether the letter tiles turned black (letter not in the word)
- yellow (letter in the word but wrong place)
- or green (letter in the word AND in the right place) 

What a dream, something for your mind to grab on to while the world continued its insanity. Thus, my love for wordle was born.

## If you'd like to play:
Give my rendition of [Wordle](https://luigis-wordle.netlify.app) a shot!


## Planning Layout:
![Screen Shot 2022-09-09 at 1 15 11 PM](https://user-images.githubusercontent.com/111162028/189414600-c565b2f2-c41e-4844-870b-f53ceaa3bf5b.png)

### Win screen:

![Screen Shot 2022-09-14 at 3 48 39 PM](https://user-images.githubusercontent.com/111162028/190251957-fb281d3c-8b66-4187-a45a-6a941cef37c8.png)


### Lose screen:

![Screen Shot 2022-09-14 at 3 59 16 PM](https://user-images.githubusercontent.com/111162028/190251932-1708e5b6-16e6-4c3a-82c2-93c7efdec102.png)


## Technology Implemented:
1. JavaScript
2. CSS
3. HTML
4. Animate.CSS
5. GetBootStrap.com
6. confetti.js


## Credits:

### word list

https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt

### sounds

https://orangefreesounds.com/womp-womp/

https://orangefreesounds.com/crowd-cheering-and-applauding-sound-effect/


## Pseudocode:
	
	1. Define variables used to track the state of the game and import the words from a JS file
	
	2. Store cached element references
	
	3. Loading the game should automatically select the word for the current game session, render the game, and player should immediately be able to start guessing words.
	
	4. Define required constants, i.g. wordOfDay, attemptCounter, the row we're currently in, as well as the column
	
	5. Handle player clicking letters and/or typing on the keyboard 😳
	
	6. Check if word player submitted is actually a word AND if the player entered actual letters 😳
	
	7. Change the color of the display tiles and keyboard depending on whether the letters are in the word
	
	8. Keep a counter for attempts and state whether the player failed or the attempts it took to get the right answer
		
	9.  ???
	
	10. Profit?

	11. Disable keystrokes and button clicks on win or loss.
   
	12. Render win or loss screen
   
	13. Create Reset functionality!

## Next Steps: 
1. light and dark mode
2. shake when user enters something that is not a word
3. enable a hard mode where letters not in word cannot be clicked or typed again