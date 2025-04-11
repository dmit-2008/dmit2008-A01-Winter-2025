// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // all of our quotes here.
  const allQuotes = [
    {
      "author": "Irvine",
      "quote": "By contemplating the impermanence of everything in the world, we are forced to recognize that every time we do something could be the last time we do it, and this recognition can invest the things we do with a significance and intensity that would otherwise be absent. William B."
    },
    {
      "author": "Brian Thompson",
      "quote": "Be disentangled from all perceptions. They are not you."
    },
    {
      "author": "Seneca",
      "quote": "Let us not postpone anything, let us engage in combats with life each day."
    },
    {
      "author":"Heraclitus",
      "quote":"To be evenminded is the greatest virtue."
    }
  ]

  // random index
  let randomIndex = Math.floor(Math.random()*allQuotes.length)

  // access a random quote
  let randomQuote = allQuotes[randomIndex]

  // return a status.
  res.status(200).json(randomQuote)
}