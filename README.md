# pure-javascript-carousel
A simple pure javascript library to add carousel in your website.

## Quick start

Put the required stylesheet at the top of your markup:

```html
<link rel="stylesheet" href="css/mk-slideshow.css">
```

Put the required javascript file at the bottom of your markup:

```html
<script src="js/mk-slideshow.js"></script>
```

Put the required markup:

```html
<div class="slide-show">
  <div class="slides">
    <div class="slide">
      <img src="image/image-1.jpg">
      <div class="caption">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic officiis illum corrupti inventore? Cumque vero inventore earum deserunt ipsum, quam id obcaecati nostrum accusantium dignissimos consequatur aliquam unde voluptatum quidem.</p>
      </div>
    </div>
    
    <div class="slide">
      <img src="image/image-2.jpg">
      <div class="caption">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic officiis illum corrupti inventore? Cumque vero inventore earum deserunt ipsum, quam id obcaecati nostrum accusantium dignissimos consequatur aliquam unde voluptatum quidem.</p>
      </div>
    </div>
    <div class="slide">
      <img src="image/image-3.jpg">
      <div class="caption">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic officiis illum corrupti inventore? Cumque vero inventore earum deserunt ipsum, quam id obcaecati nostrum accusantium dignissimos consequatur aliquam unde voluptatum quidem.</p>
      </div>
    </div>
  </div>
</div>
```


initialize your carousel is ready.

```javascript
let option = {
  autoPlay: true,
  speed: 3000
};

let sShow = new slideshow('.slide-show', option);
sShow.init()
```


## License
The code and the documentation are released under the [MIT License](LICENSE).
