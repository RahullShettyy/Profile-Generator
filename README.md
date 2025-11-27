# Portfolio Generator

A minimal static HTML/CSS/JS tool to create a neat personalized portfolio page and embed a resume PDF.

What it does
- Let a user enter `Name`, `Title`, and `Bio`.
- Upload a local PDF or provide a remote PDF URL.
- Live preview the profile and embedded PDF.
- Export a single standalone HTML file containing the profile and an embedded resume link.

Quick usage
1. Open `index.html` in a modern browser (Chrome, Edge, Firefox).
2. Fill in `Name`, `Title`, and `Bio`.
3. Either upload `e:\Profile.pdf` using the **Upload Resume** control, or put a URL in the **PDF URL** field.
   - Note: Browsers won't allow an absolute local path in the PDF URL field to load due to file:// restrictions. To use `e:\Profile.pdf` you can:
     - Start a simple local server that serves the file, for example using Python from its folder:
       ```powershell
       cd C:\path\to\your\pdf\folder; python -m http.server 8000
       ```
       Then set the PDF URL to `http://localhost:8000/Profile.pdf`.
     - Or use the Upload control and pick the file directly.
4. Click **Live Preview** to update the preview.
5. Click **Export Site (Download HTML)** to download a self-contained HTML file (it references the PDF URL; uploaded local PDF becomes a blob URL and will not persist in the exported HTML—use a hosted URL for long-term sharing).

Notes & limitations
- The exported HTML references the PDF URL you provided. If you used the upload control (a blob URL), the exported file will include the blob URL which is only valid in the current browser session; for a persistent resume link host the PDF somewhere reachable (GitHub Pages, your server, or cloud storage with a public link).
- This is a lightweight static solution; if you want server-side storage or persistent syncing, I can add an upload endpoint or a small Node/Express server to host PDFs.

Want help deploying?
- I can show how to host the exported HTML on GitHub Pages or Netlify and how to host your PDF so the resume link is permanent.
