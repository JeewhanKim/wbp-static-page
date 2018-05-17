"use strict";

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    /* Main Controller */
    document.addEventListener("DOMContentLoaded", require('./controllers'));
  }, { "./controllers": 5 }], 2: [function (require, module, exports) {
    module.exports = function (json) {
      return {
        'images': json.images.filter(function (image) {
          return (/^((http|https|ftp):\/\/)/.test(image)
          );
        }),
        'quote': json.quote,
        'author': json.author,
        'publication': json.publication
      };
    };
  }, {}], 3: [function (require, module, exports) {
    module.exports = {
      getMain: function getMain() {
        return document.getElementById('wbp-main');
      }
      // getLanguageSelector() {
      //   return $('#languer-selector')
      // }

    };
  }, {}], 4: [function (require, module, exports) {
    /*
    * Generate & Render DOM HTML from refined data.
    */
    module.exports = function (main, data) {
      var lang = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'en';


      /* 
      * Function: Check if the letter is uppercase.
      */
      var isUpperCase = function isUpperCase(char) {
        return char >= 'A' && char <= 'Z';
      };

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
    };
  }, {}], 5: [function (require, module, exports) {
    module.exports = function (_) {
      var getJSON = function getJSON(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
          var status = xhr.status;
          if (status === 200) {
            callback(null, xhr.response);
          } else {
            callback(status, xhr.response);
          }
        };
        xhr.send();
      };

      var renderFrontPage = function renderFrontPage(status, json) {
        // Initial Validation
        if (status !== null) return; // json request has been failed

        // JSON format validation
        if (json.images === undefined || json.author === undefined || json.publication === undefined || json.quote === undefined) {
          console.log('invalid JSON format');
          return;
        }

        var domElements = require('./_dom.js'); // static page dom elements
        var data = []; // data [objects] to store refined json contents

        if (domElements.getMain().length < 1) {
          console.log('invalid DOM Elements');
          return;
        }

        /*
        * Step 1. Refine JSON file to get only A~C Column named contents
        */
        var refinedContents = require('./_data')(json);

        /*
        * Step 2. Generate & Render DOM HTML from refined data.
        */
        require('./_generate.js')(domElements.getMain(), data);

        return;
      };

      // All copy and image data can be fetched at http://homework.warbyparker.com.
      getJSON("http://homework.warbyparker.com/", renderFrontPage);
    };
  }, { "./_data": 2, "./_dom.js": 3, "./_generate.js": 4 }] }, {}, [1]);