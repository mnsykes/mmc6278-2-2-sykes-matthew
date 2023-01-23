const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program.name("quotes").description("CLI tool for inspiration").version("0.1.0");

program
	.command("getQuote")
	.description("Retrieves a random quote")
	.action(async () => {
		try {
			// TODO: Pull a random quote from the quotes.txt file
			const data = await fs.readFile(QUOTE_FILE, { encoding: "utf8" });

			/*
      #1. This passes the automated tests but doesn't produce the correct result.
			Splitting the array on the pipe takes the author from the previous quote
			ex. Bjarne Stroustrup
				To understand recursion, you must first understand recursion.

				This quote is attributed to anonymous.

			Also curious is that the test only passes if quoteArray and randomQuote
			are logged to the console. If only randomQuote is logged then the test fails.
      
			const quoteArray = data.split("|");
			const randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)];
      
			// console log the quote and author
			console.log(quoteArray);
			console.log(randomQuote);
      */

			/* 
			#2. This selects a random quote and returns the correct
			author and quote. Fails test for retrieving a random 
			quote.
      
			const quoteArray = data.split("\n");
			const randomQuote = quoteArray[Math.floor(Math.random() * quoteArray.length)]
      .split("|")
      .join("\n");
      
			console.log(randomQuote);
			*/
		} catch (err) {
			console.log(err);
		}
		// You may style the text with chalk as you wish
	});

program
	.command("addQuote <quote> [author]")
	.description("adds a quote to the quote file")
	.action(async (quote, author) => {
		// TODO: Add the quote and author to the quotes.txt file
		// If no author is provided,
		// save the author as "Anonymous".
		// After the quote/author is saved,
		// alert the user that the quote was added.
		// You may style the text with chalk as you wish
		// HINT: You can store both author and quote on the same line using
		// a separator like pipe | and then using .split() when retrieving
		try {
			if (typeof author === "undefined") {
				author = "Anonymous";
			}
			const newQuote = `${quote}|${author}`;
			await fs.appendFile(QUOTE_FILE, newQuote);
			console.log(`Successfully written to file`);
		} catch (err) {
			console.log(err);
		}
	});

program.parse();
