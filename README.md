# HealthChain

Mining for your health.

## Inspiration

Bitcoin mining uses more electricity than the country of Ireland! That's insane, especially since all that mining work is "useless" computation.  Our inspiration was to come up with a a more useful computation in the realm of human health (in our case, genome sequencing for potential cancer detection).

## What it does

It is a cryptocurrency alternative that does all the standard features of a currency (give/take) while tackling the problems of wasted energy and transaction fees.  We allow users to upload their genomic sequence and we let miners solve this non-trivial problem of finding k (a constant) mismatches with a normal human genome.  The problem is non-trivial in that miners must find the "ideal" starting position, while scanning 30 billion+ base pairs.  However, the problem is easily verifiable by simply checking the k indices for mismatches.

Furthermore, users are allowed to post their own genomic sequences for a price, which in turns goes to cover the transaction costs for mining.  This means that there is absolutely no transaction fees for HealthCoin, making it extremely attractive for everyday, non-speculative use (which Bitcoin fails to do).

## How I built it

Build our own cryptocurrency based off a skeleton framework (https://github.com/vedmant/my-little-bitcoin) under the MIT license.  Then we developed a front end to enable users to post their genomic sequences, visualize the growing blockchain, as well as send HealthCoins to other users.  To do this we used NodeJS and web sockets to do P2P communication.  The hardest part was interfacing between the server and miners -- we wrote algorithms to quickly check solutions and verify "proof-of-work".

## Challenges I ran into

* Merge-conflicts are always hard...
* Coming up with the idea and figuring out how to tackle adversarial behavior took a long time.

## Accomplishments that I'm proud of

* Working with blockchain technology successfully.
* Coming up with a trendy, practical, yet humanity-enriching hack.

## What I learned

* Blockchain technology can be used for good.
* Bitcoin uses a ton of electricity.

## What's next for HealthCoin

* Better way to keep health information more secure and private (although genomic sequences don't review much).
