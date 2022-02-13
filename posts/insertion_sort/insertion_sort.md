---
title: A bit about insertion sort
description: "It's time I took a deep dive into everybody's favorite slow sort algorithm"
date: 2022-02-10
tags:
  - foundations
  - sort
layout: layouts/post.njk
---

I want to write about Insertion Sort. Why? Well, first, because I can, and second, I have started my journey of understanding the foundations that are underpinning our software developer lives.

{% alert "warning", "🎆 Year of Foundations! In which I want to dive deep into the building blocks of what I work with." %}

Working as a software developer for many years now, one could say _it's about damn time_.

## Why start with Insertion Sort?

I'm not starting with Insertion Sort, per se. I have approximate knowledge of many things{% link "https://i.imgur.com/lA7Wu.png" %}. What I am starting, is writing about them. If I can explain it well enough for others to understand, then my understanding of the topic is sufficient. If I can't, then my inability to reason about parts of it will guide my learning process.

So why start with Insertion Sort? Earlier this year I bought a couple of books - one among them was [The Algorithm Design Manual](https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1849967202). In it, on page 4, [the author](https://twitter.com/stevenskiena) gently placed the C implementation of the insertion sort, as an example of an algorithm solving a general problem: _sorting_. While it was only there as an example, I wanted to understand it. To internalise it.

It's not like I needed to [grok](https://en.wikipedia.org/wiki/Grok) it to continue with the book. Not yet, anyway. It goes on to talk about some other stuff - what exactly, I'm not sure, I'm still on page 4.

{% image_caption "posts/insertion_sort/IMG_5941.jpeg", "The Algorithm Design Manual book on a white background" %}
If I were to guess, I'd say this book is about algorithms. <i>Maybe</i> data structures, but that's a stretch.
{% endimage_caption %}

## The algorithm

The Insertion Sort is a fairly simple one. Although it's possible to do it with in-place sorting, where changing the elements of the array happens within the array itself (by swapping elements, for example), and not in some other data structure.

To better understand what's happening though, let's throw that out of the window, and imagine that there are two arrays: the input one, and the result (this time, in [Python](https://www.python.org/)).

```python
  input = [5, 1, 3, 2, 7]
  result = []
```

There are two things we can say about them: `input` is potentially unsorted, while `result` is sorted (Yes, an empty array is, technically, sorted). We will keep this property as an _invariant_.

{% alert "info", "Invariant (/ɪnˈvɛːrɪənt/), <i>noun</i>: <br>&nbsp;&nbsp;&nbsp;&nbsp;a function, quantity, or property which remains unchanged when a specified transformation is applied." %}

...meaning:

1. `input` will always be potentially unsorted. Potentially, because we can try to sort an already sorted array.
2. `result` will always be sorted. Sort-of. The array will experience states of un-sortedness, but that's because we're actively looking for a spot for a new element. But the end of the day (or rather: iteration), once we found the spot, the array will be in a sorted state.

So what's the algorithm?

In human words:

1. Take the first element of the `input` array, and place it at the end of the result
2. Compare this element with the element right before it in the array
    1. If the new element is smaller than** the one before it, swap them
    2. If the new element is larger than, or equal to** the one before it, we're done
3. If the element was swapped, compare it in the new position with the element right before it
    1. Continue this process until the element does not need to be swapped, or it reached the start of the array.

_** This is for sorting in ascending order. For descening, we need to compare the other way_

### Visualization time

Let's go step-by-step through the above instructions:

As a reminder, we have this as our starting condition:

```text
  result             input
  vv            v-------------v
  []            [5, 1, 3, 2, 7]
```

If we apply step 1, we move over the first number from the input array (`5`), and we're done; A single element array is a sorted array.

```text
  result           input
  v-v           v----------v
  [5]           [1, 3, 2, 7]
```

Next, we move over `1`, and check if we need to swap it with the previous last place in the array (`5`). Since one is less than five{%cit%}, we do, at which point it becomes the first element, completing the iteration.

```text
  result          input
  v----v        v-------v
  [5, 1]        [3, 2, 7]
   ^--^ 1  is smaller than 5, so need to swap

  [1, 5]        [3, 2, 7]
   ^ 1 is the first in the array, we're done.
```

Notice that the `result` was in an unordered state when `1` was moved in, but at the end of the iteration, it became ordered again. The invariant (that the `result` array is always in a sorted state) stayed true (at the end of the iteration).

Next step: move `3` into the `result` array, as that's the first element in the `input` array:

```text
   result       input
  v-------v     v----v
  [1, 5, 3]     [2, 7]
      ^--^ 3 is smaller than 5, so need to swap
  
  [1, 3, 5]     [2, 7]
   ^--^ 3 is larger than 1, so we don't need to continue swapping, we're done.
```

..moving on:

```text
     result     input
  v----------v  v-v
  [1, 3, 5, 2]  [7]
         ^--^ 2 is smaller than 5, so need to swap
  
  [1, 3, 2, 5]  [7]
      ^--^ 2 is smaller than 3, so need to swap
      
  [1, 2, 3, 5]  [7]
   ^--^ 2 is larger than 1, we're done.
```

...and finally:

```text
      result      input
  v------------v  vv
  [1, 2, 3, 5, 7] []
            ^--^ 7 is larger than 5, we're done.
```

As there are no more items in the `input` array, our job is done. The `result` array is the sorted equivalent of the `input` array we started with.

### The real world

This isn't how it's _actually_ implemented, though. At the beginning I mentioned that it's possible to do an in-place sorting, which means that we don't actually need a `result` array (except if we want to avoid modifying the `input` array).

How would that look? Well, let's have the input array over both the input and result arrays, with some white space for alignment

```text
0: initial state
  [    5, 1, 3, 2, 7]
  [], [5, 1, 3, 2, 7]

1: v moved 5 over, no swap happened
  [5,   1, 3, 2, 7]
  [5], [1, 3, 2, 7]

2: v moved 1 over, then swapped with 5
  [1, 5,   3, 2, 7]
  [1, 5], [3, 2, 7]

3:    v moved 3 over, then swapped with 5
  [1, 3, 5,   2, 7]
  [1, 3, 5], [2, 7]

4:    v moved 2 over, then swapped with 5 and 3
  [1, 2, 3, 5,   7]
  [1, 2, 3, 5], [7]
  
5:             v moved 7 over, no swap this time
  [1, 2, 3, 5, 7    ]
  [1, 2, 3, 5, 7], []
```

Notice, that the `input` and `result` arrays are completely self contained, and can be represented in the same array.

When sorting the array, we can think of it as such: There's a point within the array:

1. before which the elements are in sorted order
2. after which the elements are in potentially unsorted order

Taking `step 3` from the above example:

```text
          👇 pointer location; 
  [1, 3, 5, 2, 7]
   ^-----^  ^--^
             👆 yet unsorted part of the array
     👆 already sorted part of the array
```

And that's pretty much the algorithm:

1. Go through the indexes of the array, starting with 1.
2. Take that number, and compare it with the element at index - 1
3. If that element is larger, swap the two
4. Continue until:
    1. Start of the array is reached, or
    2. The element at (current) index - 1 is smaller than the element we're trying to place.
6. If no more elements: we're done.
5. If more element, check the next element, `goto 2`

Two examples of the sort, first in Rust, then in JavaScript:

```rust
  // Rust
  fn sort(items: &mut [i32]) {
      for i in 1..items.len() {
          for j in (1..=i).rev() {
              if items[j] > &items[j - 1] {
                  break;
              }

              items.swap(j, j - 1);
          }
      }
  }
```

```js
  // JavaScript
  function sort(items) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i; j > 0; j--) {
        if (items[j] > items[j - 1]) {
            break;
        }

        const tmpJ = items[j];
        items[j] = items[j - 1];
        items[j - 1] = tmpJ;
      }
    }
  }
```

## Performance considerations  

Would you want to use Insertion Sort? In itself, probably not.

Insertion sort is _slow_. It is slow mostly because it takes O(n2) in the worst case, and O(n) in the best case:  

- Worst case is a reverse-sorted list, which means all items need to be compared and swapped
- Best case is a sorted list, which means items need to be compared, but never swapped.
