module.exports = (json) => {
  return {
    'images': json.images.filter(image => /^((http|https|ftp):\/\/)/.test(image)),
    'quote': json.quote,
    'author': json.author,
    'publication': json.publication
  }
}