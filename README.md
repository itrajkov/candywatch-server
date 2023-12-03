# Candywatch (Server source code)

This is the back-end code for [candywatch](https://candywatch.net "candywatch")

## What is candywatch?
Candywatch is a project I started out of frustration built up while using [watch2gether](https://w2g.tv/ "candywatch").
I used to watch tons of youtube with my friends/girlfriend there, and the experience was, to say the least, unpleasant.

The UI was laggy, unresponsive, the design was kinda bad, and I was looking for a hobby project.

So I decided to write this in my spare time.
It's a clean, database-less, fast, minimalistic website, where you can watch youtube with other people.


### Note
Yeah, the "backend" is in a single file.

As I stated, this was hacked together very quickly, and is very rough around the edges.
This will be refactored according to the scale of the project.

# Setting up the development environment
**Node version:** v16.20.2
```bash
$ git clone https://github.com/itrajkov/candywatch-server.git
$ cd candywatch-server
$ npm install
```

To run the server run this command
```bash
$ node index.js
```
