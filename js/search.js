// add search action to search form
id('search').setAttribute('action', 'javascript:search(id(\'query\').value);');

// helper function to quickly grab an element by id
function id(name) {
  return document.getElementById(name);
}

// fuse search
function search(query) {
  fetch('/index.json').then(response => response.json()).then(function(index) {
    var options = {
      threshold: 0.0,
      ignoreLocation: true,
      keys: ['title', 'description', 'tags', 'contents']
    }
    var fuse = new Fuse(index, options);
    var results = fuse.search(query);

    // clear search results; set headers
    id('searchResultsHeader').innerHTML = `Search: ${query}`
    id('searchResults').innerHTML = (genResultHeaderHTML(results));

    // render results
    results.forEach(function(result) {
      id('searchResults').innerHTML += (genResultHTML(result.item));
    });

    // show the offcanvas
    var searchOffcanvas = new bootstrap.Offcanvas(id('searchOffcanvas'));
    searchOffcanvas.toggle();
  });
}

// generate search result header
function genResultHeaderHTML(results) {
  var plural = 's';
  if (results.length == 1) {
    plural = '';
  }

  return `<div class="list-group-item text-center">
  <h5 class="mb1">Found ${results.length} Recipe${plural}</h5>
</div>`;
}

// generate search result entry
function genResultHTML(recipe) {
  return `<a href="${recipe.permalink}" class="list-group-item list-group-item-action">
  <h5 class="mb-1">${recipe.title}</h5>
  <small>${recipe.description}</small>
</a>`;
}
