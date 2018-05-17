/*
* Generate & Render DOM HTML from refined data.
*/
module.exports = (main, data, lang = 'en') => {

  /* 
  * Function: Check if the letter is uppercase.
  */
  const isUpperCase = char => (char >= 'A') && (char <= 'Z')

  // main.innerHTML = ``
  // let html = `test`
  // data.forEach((data, idx) => {
  //   if(idx === 0 || (idx-3)%4 === 0) {
  //     html += `<div class="nyt-row">` // create another row every 3 + 4n columns
  //   }
  //   html += `<div class="${idx === 0 ? 'nyt-col-2': 'nyt-col-1'}">` // only the first element should be 2 column-width
  //   html += `<a href="${data.link}"><div class="nyt-image"><img src="${data.imageUrl}" tabindex="0"></div></a>`
  //   html += `<figcaption>${translate(data.figcaption, lang)}</figcaption>`
  //   html += `<a href="${data.link}"><h3>${translate(data.headline, lang)}</h3></a>`
  //   html += `<p>${translate(data.summary, lang)}</p>`
  //   if(data.publisher !== undefined) {
  //     html += `<span>${translate(data.publisher, lang)}</span>`
  //   }
  //   html += `</div>`
  //   if(idx === 2 || (idx-2)%4 === 0) {
  //     html += `</div>`
  //   }
  // })
  // html += `</section>`

  // main.innerHTML = html
}