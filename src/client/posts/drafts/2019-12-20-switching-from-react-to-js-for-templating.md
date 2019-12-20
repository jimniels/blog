Switching from React to Native JS Templates

Benefits:

**Faster** (especially in non-prod builds)

build: react NODE_ENV=production
1.893s
2.243s
2.050s
1.855s
2.006s

build: react NODE_ENV=development
53.121s
53.764s
54.382s

build: dev
1.7333s
1.609s
1.614s
1.721s
1.567s

build: prod
1.419s
1.560s
1.677s
1.530s
1.548s

**HTML semantics**

No more `className`. No more errors around HTML attributes that weren't changed to camelCase.
> Warning: Invalid DOM property `srcset`. Did you mean `srcSet`?

No more `<>` or `React.Fragment`. Doing adjacent HTML nodes is incredibly easy.

Embeddable script tags. No more `dangerouslySetInnerHTML` (see issue)

**SVGs**

All those weird SVG attributes are no longer a problem. `<use xlink:href="#" />` is exactly that.

**Non-HTML files**

Need an xml file rendered to string? It's really hard now (see issue on GitHub)

