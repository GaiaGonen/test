"use strict";

// Resources

let videos = [
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_BEACH_BATCH_2_GIF_22.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_WOOOHOOO_BEACH_01_BOOMERANG.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_BATCH_3_GIF_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_FOREST_GIF_5.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_CITY_CINEMAGRAPH_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_BEACH_CINEMAGRAPH_5.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_GIF_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_WOOOHOOO_BEACH_02_BOOMERANG.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_BATCH_2_GIF_13.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_FOREST_GIF_2.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_BOOMERANG_1.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_MOUNTAIN_GIF_5.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_FOREST_GIF_6.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  },
  {
    "url": "https://d17tmcbwz7rkl7.cloudfront.net/media/HD_BEACH_BATCH_2_GIF_10_trpzVKP.mp4",
    "title": "I'm out and about untill XX/XX/XX"
  }
];


// init the video

let currVid;
let video = document.getElementById("bg-video");

loadVideo();


// a listener to create a video transition effect

video.addEventListener('loadeddata', function() {
  anime({
    targets: video,
    opacity: 1,
    // scale: [5, 1],
    easing: 'easeInOutQuart'
  });
  anime({
    targets: ".transition",
    opacity: 0,
  });
  setTimeout(function() {
    anime({
      targets: '.confirm-button',
      opacity: 1,
      translateX: [500, 0]
    });
    anime({
      targets: '.confirm-button .border path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 800,
      delay: function(el, i) { return i * 250 },
      loop: false
    });
    anime({
      targets: '.heading',
      translateX: [-500, 0],
      opacity: 1,
      elasticity: 400
    })
  }, 2000)
}, false);

// execute every time a video is loaded
function loadVideo() {
  currVid = videos[random(videos.length)];
  $(".heading h1").text(currVid.title);
  anime({
    targets: video,
    opacity: 0,
    delay: 500
  });
  anime({
    targets: ".transition",
    opacity: 1
  });
  $(".confirm-button").css("opacity", 0);
  $(".heading").css("opacity", 0);
  $("#bg-video source").attr("src", currVid.url);
  video.load();
}

// Animations for buttons

$(".expanding-button").mouseenter(function() {
  anime({
    targets: '.expanding-button .border',
    scale: [2, 1]
  });
});

// creating paperjs objects to create bottom buttons border

let canvas = $("#another-border");
paper.setup(canvas);
let roundRectBig = drawRoundRect(0, 0, 250, 50, 30, 30);
let roundRectSmall = drawRoundRect(0, 0, 150, 50, 30, 30);

// Initial button borders

$(".show-button .border path").attr("d", getPath(roundRectBig));
$(".confirm-button .border path").attr("d", getPath(roundRectSmall));


// Listeners for creating hover effects on bottom Buttons
// TODO fix the jumping bug when hovering a button
// TODO fix the bug on the small button when the border separates in some of the merges

$(".show-button").mousemove(function(event) {
  hoverEffect(250, 50, event, $(".show-button .border path"), roundRectBig);
});

$(".confirm-button").mousemove(function(event) {
  hoverEffect(150, 50, event, $(".confirm-button .border path"), roundRectSmall);
});

// listeners for canceling hover effect on bottom buttons

$(".confirm-button").mouseout(function (e) {
  rmHoverEffect($(".confirm-button .border path"), roundRectSmall);
});

$(".show-button").mouseout(function (e) {
  rmHoverEffect($(".show-button .border path"), roundRectBig);
});

// create hover effect based on where the mouse is
function hoverEffect(rectWidth, rectHeight, e, buttonPath, rectObj) {
  let ellipse = drawEllipse(centerBounds(e.offsetX, rectWidth-rectWidth/5, rectWidth/5), centerBounds(e.offsetY, rectHeight/2+1, rectHeight/2), rectWidth/2, rectHeight/2+2);
  let roundRect = rectObj;

  // remove ellipse's segment that is closer to the end of rect where the mouse pointer is
  // to create a cleaner animation
  if (event.offsetX > rectWidth/2) {
    ellipse.removeSegment(2);
  } else {
    ellipse.removeSegment(0);
  };

  let mergedPath = drawMergedPath(ellipse, roundRect);
  $(buttonPath).attr("d", mergedPath);

  anime({
    targets: buttonPath,
    scale: 1.08,
  });
}

function rmHoverEffect(buttonPath, rectObj) {
  buttonPath.attr("d", getPath(rectObj));
  anime({
    targets: buttonPath,
    scale: 1
  });
}

// draw ellipse from a given center point
// returns a Path object of an ellipse
function drawEllipse(cx, cy, xr, yr) {
  let shape = new paper.Shape.Ellipse({
    center: [cx, cy],
    radius: [xr, yr]
  });
  return shape.toPath();
}

// draw a rounded rectangle
// returns a roundRectangle object
function drawRoundRect(cx, cy, width, height, rx, ry) {
  let rect = new paper.Rectangle(cx, cy, width, height);
  let cornerSize = new paper.Size(rx, ry);
  return new paper.Path.RoundRectangle(rect, cornerSize);
}

// create a merged path from two shapes
// params should be Path objects
// Returns a path string of the merged Path object
function drawMergedPath(Path1, Path2) {
  let merged = Path1.unite(Path2);
  return getPath(merged);
}

// return the path in string form from Path items
function getPath(Path) {
  return Path.pathData;
}

// Keeping the bounds on mouse movement inside buttons with hover effect
function centerBounds(num, max, min) {
  return Math.min(Math.max(num, min), max);
}

// returns a random n from 0 to len
function random(len) {
  return Math.floor(Math.random() * len);
}
