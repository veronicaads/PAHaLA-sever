# strip-tags
removes markup from html string and returns plain text

# installation
```javascript
npm install strip_tags
```

# usage
```javascript
var strip_tags = require("strip_tags");

var html = "<div>John doe is a front end developer <span> works in abd company</span></div>";
html = strip_tags(html);
// output 'John doe is a front end developer works in abd company'
```

