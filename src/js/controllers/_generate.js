/*
* Generate & Render DOM HTML from refined data.
*/
module.exports = (dom, data) => {
  const images = data.images.map(imageUrl => {
    let html = `<li>`
    html += `<img src="${imageUrl}">`
    html += `</li>`
    return html
  }).join('')
  dom.getImages().innerHTML = images
  dom.getQuote().innerHTML = data.quote
  dom.getAuthor().innerHTML = data.author
  dom.getPublication().innerHTML = data.publication
}