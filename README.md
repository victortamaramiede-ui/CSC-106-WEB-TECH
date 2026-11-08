# Victor Blaze Portfolio and Academic Management Website

## Project overview
This project is a responsive student portfolio and academic management website for Victor Blaze, a Data Science student at MIVA Open University and photographer with Victor Blaze Media. It demonstrates introductory HTML, CSS, and JavaScript skills while presenting a polished personal brand that blends academic professionalism with creative photography.

## Objectives
- Build a multi-page portfolio website using semantic HTML and accessible design.
- Showcase academic identity, creative practice, and technical interests.
- Provide a working academic planner with localStorage persistence.
- Create a contact form with client-side validation and clear feedback.
- Keep the project simple, static, and suitable for GitHub Pages hosting.

## Technologies used
- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
- GitHub Pages for deployment

## Website features
- Responsive five-page personal portfolio and academic dashboard
- Modern editorial-inspired dark theme using the Victor Blaze Media colours: orange (#cc6600) and near-black (#0a0500)
- Mobile-friendly navigation with JavaScript interaction and ARIA attributes
- About page with Data Science academic profile, career aspirations, skills, interests, and media demonstration
- Project showcase with sample project cards and placeholders
- Academic planner for adding, completing, deleting, filtering, and saving tasks
- Contact form validation for empty inputs, malformed emails, and phone number checks
- Multimedia section using a video element and supportive fallback text

## Project structure
```text
student-portfolio/
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── README.md
├── assets/
│   ├── images/
│   │   ├── profile-placeholder.svg
│   │   ├── project-portfolio.svg
│   │   ├── project-photography.svg
│   │   └── project-planner.svg
│   └── media/
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── planner.js
│   └── contact.js
└── assessment-checklist.md
```

## Running locally
1. Open the project folder in VS Code or any editor.
2. Start a static local server from the project root:

```bash
cd "C:\Users\USER\Documents\COS 106 WEB TECH"
python -m http.server 8000
```

3. Open the site in a browser:

```text
http://localhost:8000/
```

4. Navigate between pages using the menu or direct links.

## Testing the planner
1. Open `planner.html`.
2. Add tasks using the form and ensure required fields are validated.
3. Check that tasks appear dynamically without page reload.
4. Mark tasks as complete and reopen them as needed.
5. Delete a task and confirm the confirmation prompt appears.
6. Change filters to inspect All, Pending, Completed, and Overdue views.
7. Refresh the page and confirm the tasks remain saved in browser localStorage.

## Testing the contact form
1. Open `contact.html`.
2. Submit the form empty to confirm required-field validation.
3. Enter an invalid email format and an invalid phone number to confirm feedback.
4. Submit valid data to confirm success feedback.
5. Note that the form is a front-end demo only and does not send information to a server.

## Uploading to GitHub
1. Create a repository on GitHub.
2. In the project folder, run:

```bash
git init
git add .
git commit -m "Initial portfolio project"
git branch -M main
git remote add origin <your-github-repository-url>
git push -u origin main
```

## Deploying to GitHub Pages
1. Open the GitHub repository.
2. Go to Settings > Pages.
3. Change the source to "Deploy from a branch".
4. Select the `main` branch and the root folder `/ (root)`.
5. Save the settings.
6. Wait for GitHub to publish the site.
7. Use the provided GitHub Pages URL in the deployment section when it becomes available.

## Deployment placeholder
- Deployed website URL: `https://yourusername.github.io/your-repository-name/`
- GitHub repository URL: `https://github.com/yourusername/your-repository-name`

## Known limitations
- The contact form validates on the client side only and does not send emails.
- The project uses placeholder portfolio links and editable academic details that should be replaced with personal information.
- External media and imagery are used as placeholder content when personal assets are unavailable.

## Assessment checklist
See the separate assessment check file or the final section of this README.

## Final assessment checklist
| Requirement | Page or file | Implementation |
| --- | --- | --- |
| Semantic HTML structure | All pages | Header, nav, main, section, article, aside, footer, forms, image, video, lists |
| Multi-page site | index.html, about.html, projects.html, planner.html, contact.html | Five linked pages with consistent navigation |
| Responsive design | css/style.css | Media queries, grid/flex layout, mobile nav |
| CSS variables and design system | css/style.css | Colour variables, reusable components, spacing and radius system |
| JavaScript navigation | js/main.js | Mobile menu toggle and active-page styling |
| Academic planner features | planner.html, js/planner.js | Add, complete, reopen, delete, filter, persist tasks |
| Contact form validation | contact.html, js/contact.js | Required-field checks, email validation, phone validation, success feedback |
| Multimedia requirement | about.html | Video element with valid controls and fallback text |
| Accessibility | All pages | Labels, ARIA, focus styles, semantic elements, valid alt text |
| localStorage support | js/planner.js | Tasks remain available after refresh |

## Test report
The project was reviewed for completeness and functionality:
- All five pages exist and use the same stylesheet.
- Navigation links work across the site.
- The planner allows adding, filtering, toggling completion status, deleting tasks, and persisting data in browser storage.
- The contact form prevents invalid submission and shows clear validation feedback.
- The page layout adapts for mobile and desktop widths.
- The site avoids external backend requirements and remains static-host friendly.

## Academic presentation notes
The implementation is intentionally beginner-friendly and keeps core functionality in plain HTML, CSS, and JavaScript. The styling uses reusable classes and a consistent visual system, while the planner and contact logic are separate files to keep responsibilities clear. This approach makes it easy for a lecturer to inspect the source and explain how each technology contributes to the final website.

## How to publish this project
```bash
cd "C:\Users\USER\Documents\COS 106 WEB TECH"
python -m http.server 8000
```
Then follow the GitHub and GitHub Pages instructions above to publish the project online.

## Important note
This is a static front-end project. It does not send form submissions to a server and does not claim that any GitHub upload or deployment has already occurred.
