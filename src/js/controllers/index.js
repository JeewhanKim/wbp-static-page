module.exports = _ => {
  const getJSON = (url, callback) => {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'json'
    xhr.onload = function() {
      var status = xhr.status
      if (status === 200) {
        callback(null, xhr.response)
      } else {
        callback(status, xhr.response)
      }
    }
    xhr.send()
  }

  const renderFrontPage = (status, json) => {
    // Initial Validation
   if(status !== null) return // json request has been failed
   
   // JSON format validation
   if(json.images === undefined 
    || json.author === undefined
    || json.publication === undefined
    || json.quote === undefined) {
      console.log('invalid JSON format')
      return
    }

    const domElements = require('./_dom.js') // static page dom elements
    let data = [] // data [objects] to store refined json contents

    if(domElements.getMain().length < 1) {
      console.log('invalid DOM Elements')
      return
    }
    return
  
    /*
    * Step 1. Refine JSON file to get only A~C Column named contents
    */
    const refinedContents = require('./_data')(json)
  
    /*
    * Step 2. Parse valid JSON data and store into the "refined" data object array.
    */
    require('./_parser.js')(refinedContents, data)
  
    /*
    * Step 3. Generate & Render DOM HTML from refined data.
    */
    const viewController = require('./_generate.js')
    viewController(domElements.getMain(), data)
  
    /*
    * Lanauge Option Click Events
    */
    domElements.getLanguageSelector().find('li').click(e => {
      const option = $(e.currentTarget).attr('data-lang')
      $(e.currentTarget).addClass('selected').siblings().removeClass('selected')
      viewController(domElements.getMain(), data, option)
    })
  }

  getJSON(`http://homework.warbyparker.com/`, renderFrontPage)
}

