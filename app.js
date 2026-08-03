const ROOT = document.body.dataset.root || ''

let DATA = null

async function load_data() {
  const res = await fetch(`${ROOT}/pages.json`)
  DATA = await res.json()
}

function current_path() {
  return decodeURIComponent(location.hash.slice(1))
}

function render_page(url_path) {
  const page = DATA.pages[url_path] ?? DATA.pages['']
  document.title = `${page.title} | Course Docs`

  document.querySelector('main').innerHTML = page.content
  document.querySelector('.toc').innerHTML = `${page.toc}`

  document.querySelectorAll('.sidebar a[data-path]').forEach(a => {
    a.toggleAttribute('active', a.dataset.path === url_path)
  })

  window.scrollTo(0, 0)
}

function navigate() {
  render_page(current_path())
}

window.addEventListener('hashchange', navigate)

load_data().then(navigate)
