# steps

## step one

Use this regex to search for lines where text should run on

`([^>])\n([^<\s])`

and replace with

`$1 $2`

## step two

Add the `<style>` and `<script>` tags from the other indexes.

In the head

```
<link rel="stylesheet" type="text/css" href="../style.css">
```

At the end of the body

```
<script>var book = "<book_name>";</script>
<script src="../script.js"></script>
```

Add `id="Contents"` to an elments near the contents.

## step three

Edit the `addIds.js` file and run it to add id attributes to all the `<p>` tags so the cookie stuff will work.

## step four

Remove anything else that isn't wanted.
