const slugify = (str) => {
  let slug = str;
  slug = slug.replace(/^\s+|\s+$/g, '');
  slug.toLowerCase();
  slug = slug.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
  
  return slug
}

module.exports = {
  slugify
}