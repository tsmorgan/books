

# steps

## step one

Use this regex to search for lines where text should run on

`([^>])\n([^<\s])`

and replace with 

`$1 $2`

## step two

Add the `<style>` and `<script>` tags from the other indexes.

## step three

Edit the `addIds.js` file and run it to add id attributes to all the `<p>` tags so the cookie stuff will work.

## step four

Remove anything else that isn't wanted.