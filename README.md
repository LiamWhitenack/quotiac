# TODO:

## Fix the spacing of encoded words

ChatGPT might be able to help. 

There is a sizing class which should contain the width of the screen and also the useable width of the screen, but doesn't seem to be correct every time. It needs debugging. 

One thing to consider is the probable need for a scrollbar in the case that long sentences are used, as well as the on-screen keyboard (which isn't as nice to code with as the built-in os keyboards).

Solution ideas:
- Changing the encoded characters from icons into emojis so that they can be used in a text string. This would, however, ruin the spacing of the letters becuase an emoji becoming the letter i would take less horizontal space
- Reading about it
- Not making the font size as big as possible so the problem isn't quite as bad

## Reduce and Refactor

The code is a giant mess and it would be great to reduce the nesting indentations

## Add hints

Some ideas I have include giving an intoduction sentence. For example, 
```
The Three Main food groups:

*@($*%R
@/*$($)#
!@&#$($
```

This could be in addition to giving the source of the quote, the author of the quote, the date of the quote, a hint regarding the quote and what it's about, or a free letter. 

I'm undecided on if the problem should start with spaces built-in or if that should take a hint.

An auto-check method which highlights a letter as red if it's wrong would be nice, but this shouldn't always be on.

## Add a new method to remove a letter mapping

Some people intuitively click the letter in the wrog spot, there should be some settings which allow this to change but for now it should just be easier to remove a letter mapping.

## Add some quotes and make a sustainable way of pulling up quotes

I doubt that we'll be able to make a new quote for every day, so we will need to reuse old quotes randomly, without using a quote that was just used.  

## Sizing, Sizing, Sizing

How does the game look on other phones? is the keyboard too big or too small? What is the minimum size an encoded letter should be? How big and where should the menu buttons be? How does the website look on a desktop? Does it work well on androids? 

I think it's safe to assume that my phone is the smallest phone that will be used. What if we're accessing the website on Safari? That allows even less usable space. Should we allow the user to switch to horizonal mode on mobile? If so, what happens with the now ridiculously oversized keyboard?
