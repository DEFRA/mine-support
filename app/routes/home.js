module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      return h.view('home', { fontColor: process.env.FONT_COLOR })
    }
  }
}
