# Adding your own images & logo

This site is wired up to read images straight from the `public/images` folder
(and a PDF from `public/files`). Nothing in the code needs to change — just
drop files in with these exact names and they'll show up automatically. Until
a file exists, the page falls back to a neutral placeholder so nothing looks
broken.

## Logos & navbar (shown on every page)
| File | Used for |
|---|---|
| `public/images/logo1.jpeg` | Main logo (navbar left, footer) |
| `public/images/logo2.jpeg` | Second logo (navbar, next to the divider) |

## Home page
| File | Used for |
|---|---|
| `public/images/ali-image.jpeg` | Student avatar in hero "social proof" |
| `public/images/arsal-image.jpeg` | Student avatar in hero "social proof" |
| `public/images/laraib.jpeg` | Student avatar in hero "social proof" |
| `public/images/campus-building.jpg` | Big hero photo of the campus building |
| `public/images/campus-wide.jpg` | "About UCP" preview photo |

## About page
| File | Used for |
|---|---|
| `public/images/about-campus.png` | Main campus photo in the intro section |
| `public/images/leaders/director.jpg` | Punjab College Director photo |
| `public/images/leaders/principal.jpeg` | UCP Rawalpindi Principal photo |

## Societies page
Team member photos are read from:

```
public/images/team/<society-id>/<member-number>.jpg
```

for example `public/images/team/devforge/1.jpg` is the first team member of
the Devforge Digital Club. The society IDs are: `devforge`, `alumni`,
`dramatic`, `blood-donors`, `sports-hiking`, `gaming`, `csr`, `robotics`,
`literary`, `scientific`, `research-world`, `academic`. If a photo is missing,
the member's initials are shown in a colored circle instead — so it's fine to
add these gradually. Edit `src/data/societiesData.js` if you want to add,
remove or rename societies or team members.

## E-Magazine page
| File | Used for |
|---|---|
| `public/images/magazine-cover.jpg` | The magazine cover shown on the E-Magazine page |
| `public/files/magazine.pdf` | The actual PDF opened by "Read Online" / "Download PDF" |

## Projects page
The three project photos are currently pulled from Unsplash placeholder URLs
(as in the original site). To use your own photos instead, open
`src/pages/Projects/Projects.jsx` and replace the `image:` URL for each
project with a local path such as `/images/projects/drone-swarm.jpg` (and add
the matching file under `public/images/projects/`).

---

**Note:** file names are case-sensitive on most hosting platforms — keep the
casing exactly as shown above.
