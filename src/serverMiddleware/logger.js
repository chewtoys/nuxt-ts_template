export default function(req, res, next) {
  console.log(req._parsedUrl.path)
  next()
}
