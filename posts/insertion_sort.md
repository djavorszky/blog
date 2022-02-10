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

{% alert "warning", "🎆 Year of foundations! In which I want to dive deep into the building blocks of what I work with." %}

Working as a senior software developer, one could say _it's about damn time_.

So why `Insertion Sort`? Earlier this year I bought a couple of books - one among them was [The Algorithm Design Manual](https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1849967202). In it, on page 4, [the author](https://twitter.com/stevenskiena) gently places the algorithm for insertion sort, as an example of an algorithm solving a general problem: _sorting_. I didn't want to simply gloss over it, I wanted to understand what was happening.

Another book that I ordered was [The Pragmatic Programmer, 20th Edition](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/).


TODO: um, check the image plugin.
![The two books in question]({{"/img/insertion_sort_books.jpeg" | url}} "uhhh")

I've written the super complicated{%cit%} algorithm in [Rust](https://rust-lang.org):

```rust
  fn sort(items: &mut [T]) {
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

## Birds eye view
  
A brief explanation of the sort:  
  
The algorithm divides the slice into two parts: an already sorted section, at the beginning, and a potentially unsorted section at the end.  
  
```rust
// v already sorted array, containing only the number 5  
[  5, 1, 3, 2, 7];  
//    ^ Start of unsorted array, containing numbers 1, 3, 2, and 7. 
//      Also the next item that will be considered for adding to the
//      sorted section, read on below  
```  
  
Assuming our goal is an ascending sort (lowest item at the start of the array, highest item at the end of the array), each step of the algorithm does the following:  
  
The first item of the unsorted section is considered for the sorted section. It is then compared with the last item of the sorted section.  
  
If the new item is higher than the previous last in the sorted section, we're done; as the sorted section is already, well, sorted, we can be sure that adding the new item keeps the ordering of the already sorted section.  
  
If the new item is lower than the previous last in the sorted section, they are swapped. The algorithm then continues and compares the item with the next one in the unsorted section. This is repeated until an item is encountered that is smaller than the one we're trying to place.  
  
To visualize, continuing on with the previous example:

```json
// v already sorted  
[  5, 1, 3, 2, 7];  
//    ^ next item  
//      will be swapped with 5  
  
// v--v already sorted.  
[  1, 5, 3, 2, 7];  
//       ^ next item  
//         will be swapped with 5  
  
// v-----v already sorted  
[  1, 3, 5, 2, 7];  
//          ^ next item.  
//            will be swapped with 5, then with 3  
  
// v--------v already sorted  
[  1, 2, 3, 5, 7];  
//             ^ next item  
//               no swap will take place.  
  
// v-----------v already sorted  
[  1, 2, 3, 5, 7];  
// no next item.  
  
```  
  
## Performance considerations  
  
Insertion sort is _slow_. It is slow mostly because it takes O(n2) in the worst case, and O(n) in the best case:  
- Worst case is a reverse-sorted list, which means all items need to be compared and swapped  
- Best case is a sorted list, which means items need to be compared, but never swapped.