const slugify = (str) => {

  let slug = str;
  slug = slug.toLowerCase();
  slug = slug.replace(' ', '-');
  
  return slug;

}

module.exports = {
  slugify
}