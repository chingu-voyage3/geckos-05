function fetchRepo(repoURL, id, fn) {
  const req = { url: repoURL, headers };
  request.get(req, (err, res, body) => {
    if (err) {
      console.error(err);
    }
    else {
    // pass whole repo response to callback
    // should I check that it's valid JSON first?
      fn(JSON.parse(body).contributors_url);
    }
  });
}
