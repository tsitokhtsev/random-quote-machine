import React, { useState, useEffect } from 'react'
import './style.css'

const App = () => {
	const [quote, setQuote] = useState(null)

	async function getRandomQuote() {
		const response = await fetch('https://api.quotable.io/random?maxLength=160')
		const data = await response.json()
		setQuote({
			content: data.content,
			author: data.author
		})
	}

	useEffect(() => {
		getRandomQuote()
	}, [])

	if (!quote) {
		return <div className="spinner-border"></div>
	}

	const twitterUrl = `http://twitter.com/intent/tweet?text=${quote.content} - ${quote.author}`

	return (
		<div id="quote-box" className="hero-body">
			<h1>Random Quote Machine</h1>
			<p id="text">{quote.content}</p>
			<div id="bottom">
				<p id="author">{quote.author}</p>
				<div className="buttons">
					<a
						href={twitterUrl}
						id="tweet-quote"
					>
						<i className="fab fa-twitter"></i>
					</a>
					<button
						id="new-quote"
						onClick={getRandomQuote}
					>New Quote</button>
				</div>
			</div>
		</div>
	)
}

export default App