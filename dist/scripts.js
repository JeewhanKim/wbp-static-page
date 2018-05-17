"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  }, { "./controllers": 6 }], 2: [function (require, module, exports) {
    module.exports = function (json) {
      var contents = json.page.content.filter(function (content) {
        return content.name.indexOf('Column') !== -1;
      });
      var refinedContents = [];
      var refinedData = [];

      contents.forEach(function (content) {
        content = content['collections'].filter(function (collection) {
          var assets = collection.assets;
          if (assets === undefined || !assets.length) return;
          return assets[0].summary && assets[0].url && assets[0].images && assets[0].images[0] !== undefined;
        });
        refinedContents = [].concat(_toConsumableArray(refinedContents), _toConsumableArray(content));
      });

      return refinedContents;
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

      /*
      * Function: Translate Maritian
      */
      var translate = function translate(sentence, lang) {
        if (lang === 'en') return sentence;
        if (lang === 'ma') {
          return sentence.split(' ').reduce(function (sentence, word) {
            if (word.length > 3) {
              // a. every word three characters or less is left alone
              var returnWord = 'boinga'; // b. every word more than three characters is replaced with boinga.
              word.split('').forEach(function (letter, idx) {
                if (idx > returnWord.length) return;
                if (isUpperCase(letter)) {
                  // c. maintain the same capitalization and punctuation in the English and Martian Versions.
                  returnWord = returnWord.split('').map(function (letter, i) {
                    return idx === i ? letter.toUpperCase() : letter;
                  }).join('');
                }
              });
              word = returnWord;
            }
            return sentence + ' ' + word;
          }, '');
        }
      };

      main.html('');
      var html = "";
      html += "<section>";
      data.forEach(function (data, idx) {
        if (idx === 0 || (idx - 3) % 4 === 0) {
          html += "<div class=\"nyt-row\">"; // create another row every 3 + 4n columns
        }
        html += "<div class=\"" + (idx === 0 ? 'nyt-col-2' : 'nyt-col-1') + "\">"; // only the first element should be 2 column-width
        html += "<a href=\"" + data.link + "\"><div class=\"nyt-image\"><img src=\"" + data.imageUrl + "\" tabindex=\"0\"></div></a>";
        html += "<figcaption>" + translate(data.figcaption, lang) + "</figcaption>";
        html += "<a href=\"" + data.link + "\"><h3>" + translate(data.headline, lang) + "</h3></a>";
        html += "<p>" + translate(data.summary, lang) + "</p>";
        if (data.publisher !== undefined) {
          html += "<span>" + translate(data.publisher, lang) + "</span>";
        }
        html += "</div>";
        if (idx === 2 || (idx - 2) % 4 === 0) {
          html += "</div>";
        }
      });
      html += "</section>";
      main.append(html);
    };
  }, {}], 5: [function (require, module, exports) {
    /*
    * Parse valid JSON data and stroe into the "refined" object.
    */
    module.exports = function (content, data) {
      /* 
      * Function: getImageUrl
      * get thumbnail image URL from the images.types object.
      */
      var getImageUrl = function getImageUrl(images) {
        var types = images[0].types.filter(function (t) {
          return t.type === "square320" || t.type === "thumb";
        });
        return types.length ? "http://www.nytimes.com/" + types[0].content : null;
      };

      content.forEach(function (content, idx) {
        data.push({
          imageUrl: getImageUrl(content.assets[0].images),
          figcaption: content.assets[0].typeOfMaterial,
          link: content.assets[0].url,
          headline: content.assets[0].headline,
          summary: content.assets[0].summary,
          publisher: content.assets[0].byline
        });
      });
    };
  }, {}], 6: [function (require, module, exports) {
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
        return;

        /*
        * Step 1. Refine JSON file to get only A~C Column named contents
        */
        var refinedContents = require('./_data')(json);

        /*
        * Step 2. Parse valid JSON data and store into the "refined" data object array.
        */
        require('./_parser.js')(refinedContents, data);

        /*
        * Step 3. Generate & Render DOM HTML from refined data.
        */
        var viewController = require('./_generate.js');
        viewController(domElements.getMain(), data);

        /*
        * Lanauge Option Click Events
        */
        domElements.getLanguageSelector().find('li').click(function (e) {
          var option = $(e.currentTarget).attr('data-lang');
          $(e.currentTarget).addClass('selected').siblings().removeClass('selected');
          viewController(domElements.getMain(), data, option);
        });
      };

      getJSON("http://homework.warbyparker.com/", renderFrontPage);
    };
  }, { "./_data": 2, "./_dom.js": 3, "./_generate.js": 4, "./_parser.js": 5 }] }, {}, [1]);