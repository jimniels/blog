- look for @TODO and solve them
- get syntax highlighting working
- giant find/replace for {{site.imageUrl}} for "/assets/img"
- change that favicon
- remove site.baseurl
- TZ when rendering
- move the splitting of tags from strings to array into metalsmith
- considering renaming <Page /> to <Layout />
- handle redirect_from
- ensure URLs work (this stopped working with markdown-it http://localhost:8080/2019/trigger-build-in-netlify-from-aws-iot-butt/)



markdown: kramdown
highlighter: rouge




<Context
  site={site} // metalsmith
  path="" // file path of file from metalsmith
  page={
    path: "", // file path, render is last
    title: "" // yaml front matter, even in JSX files
  }
>
