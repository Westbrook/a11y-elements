# a11y-elements

While working to add a11y to some Web Components in a library I develop for work, and constantly reviewing the relationship my work has to https://github.com/webcomponents/gold-standard/wiki, I recently ran into this tweet:

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr">I know I have suggested this before, but we seriously should take the ARIA Best Practices document and implement all widget roles as reusable <a href="https://twitter.com/hashtag/webcomponents?src=hash&amp;ref_src=twsrc%5Etfw">#webcomponents</a>. I suggest dividing up the task between organisations and individuals. One role per dev. <a href="https://twitter.com/hashtag/a11y?src=hash&amp;ref_src=twsrc%5Etfw">#a11y</a><a href="https://t.co/HhJbToPKXF">https://t.co/HhJbToPKXF</a></p>&mdash; Colibrio Publishing Platform (@ColibrioReader) <a href="https://twitter.com/ColibrioReader/status/1197586798899343362?ref_src=twsrc%5Etfw">November 21, 2019</a></blockquote>


"Why aren't we doing this?", I thought. "Why aren't I doing this!"

After spending some time with that question, I began to realize that this is likely because while some teams' product in the "design system", there are very few teams whose product is "the ability to make a design system". No, not in the Storybook way where you're able to easily document a system, but in a "this is the future of HTML" (we've all dreamed it, don't lie) sort of way. A set of elements that actually met the gold standard outlined above and that can actually sit below any design system rather than being the design system on which any application could sit on top.

The next question is, "why aren't we doing this?" So, I decided to create this project to see if I could find out why, or to accidentally do it for real in the process.

My approach is going to look like this:
1. Take examples from https://www.w3.org/TR/wai-aria-practices and implement them directly (with little or no customization or alteration) as web components (I tend to work with `LitElement`, but the beauty of working with web components is that we can make different choices along the line as they best support what we're building) and then submit the converted code to this repo.
2. Submit architecture options for moving from a static element to a customizable element. Generally, this might take a couple of forms:
   - Data dynamism, how will the element receive and manage data? I've had really great coverasations around this recently, and anywhere we can have elements manage their own data from DOM, which makes them server side renderable by default, I'd like to lean in that direction.
   - Style customization, how can we set a reason able and hopefully completely nuetral baseline while being able to build up from there in many directions? The `::part()` spec is coming, but `::theme()` is a little bit lagging, can CSS Custom Properties get us all the way there, or do we need to discuss a more complex style management process.
   - Composability, how does this element work with other elements, or extensions of itself? Can it be a mixin? Should it?
   - And much, much more!
3. Implement this smarter, more flexible version.
4. Ship it to NPM with all the best suggestions for doing so, a la: https://justinfagnani.com/2019/11/01/how-to-publish-web-components-to-npm

Along the way, I might look into moving this repo towards Lerna and implementing some of the reccomendations from open-wc.org, but for now, I'm just getting started. If you come along for the ride, please feel free to submit issues or PRs to get in on that action. For now, the things I'm looking are listed below.

## Status

| a11y-element  | w3c spec | Initial port | Technical proposal | Final implementation |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| a11y-accordion | [spec](https://www.w3.org/TR/wai-aria-practices/#accordion) [example](https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html) | [In progress](https://github.com/Westbrook/a11y-elements/pull/1) | TK | TK |
| a11y-alert | [spec](https://www.w3.org/TR/wai-aria-practices/#alert) [example](https://www.w3.org/TR/wai-aria-practices/examples/alert/alert.html) | [In progress](https://github.com/Westbrook/a11y-elements/pull/3) | TK | TK |
| a11y-menubar | [spec](https://www.w3.org/TR/wai-aria-practices/#menu) [example](https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html) | [In progress](https://stackblitz.com/edit/a11y-menubar-1) | TK | TK |
| what's next? |  |  |  |  |