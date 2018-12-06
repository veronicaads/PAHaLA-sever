/***
 * strips tags from html string
 * @param {HTMLstring} HtmlString
 */
var stripTags = (HtmlString) => {
    var _div = document.createElement("div"),
        _text = "";
    _div.innerHTML = HtmlString;
    _text = _div.textContent.trim();
    _text = _text.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");
    return _text;
}

module.exports = stripTags;