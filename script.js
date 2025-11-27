// Simple portfolio generator logic
const nameEl = document.getElementById('name');
const titleEl = document.getElementById('title');
const bioEl = document.getElementById('bio');
const pdfFileEl = document.getElementById('pdfFile');
const pdfUrlEl = document.getElementById('pdfUrl');
const previewBtn = document.getElementById('previewBtn');
const exportBtn = document.getElementById('exportBtn');

const p_name = document.getElementById('p_name');
const p_title = document.getElementById('p_title');
const p_bio = document.getElementById('p_bio');
const pdfFrame = document.getElementById('pdfFrame');
const pdfWrapper = document.getElementById('pdfWrapper');
const resumeLink = document.getElementById('resumeLink');
const downloadPdf = document.getElementById('downloadPdf');

let currentPdfUrl = null;
let objectUrl = null;

function updatePreview(){
  p_name.textContent = nameEl.value || 'Your Name';
  p_title.textContent = titleEl.value || 'Your Title';
  p_bio.textContent = bioEl.value || 'Short bio will appear here.';

  // PDF priority: uploaded file -> URL field
  if (pdfFileEl.files && pdfFileEl.files[0]){
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(pdfFileEl.files[0]);
    currentPdfUrl = objectUrl;
  } else if (pdfUrlEl.value){
    currentPdfUrl = pdfUrlEl.value;
  } else {
    currentPdfUrl = null;
  }

  if (currentPdfUrl){
    pdfFrame.src = currentPdfUrl;
    pdfFrame.hidden = false;
    resumeLink.href = currentPdfUrl;
    resumeLink.hidden = false;
    // set download link if it's an object URL or same-origin
    downloadPdf.href = currentPdfUrl;
    downloadPdf.hidden = false;
    const empty = pdfWrapper.querySelector('.pdf-empty');
    if (empty) empty.style.display = 'none';
  } else {
    pdfFrame.src = '';
    pdfFrame.hidden = true;
    resumeLink.hidden = true;
    downloadPdf.hidden = true;
    const empty = pdfWrapper.querySelector('.pdf-empty');
    if (empty) empty.style.display = 'block';
  }
}

previewBtn.addEventListener('click', updatePreview);

// Allow live updates as user types
[nameEl,titleEl,bioEl,pdfUrlEl].forEach(el=>el.addEventListener('input', updatePreview));
pdfFileEl.addEventListener('change', updatePreview);

// Export a minimal HTML file that contains the profile and embeds the chosen PDF link
exportBtn.addEventListener('click', ()=>{
  updatePreview();
  const exportHtml = buildExportHtml({
    name: nameEl.value || 'Your Name',
    title: titleEl.value || 'Your Title',
    bio: bioEl.value || 'Short bio will appear here.',
    pdf: currentPdfUrl || ''
  });

  const blob = new Blob([exportHtml], {type: 'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (nameEl.value?nameEl.value.replace(/\s+/g,'_'):'profile') + '.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
});

function buildExportHtml({name,title,bio,pdf}){
  const safe = s => s.replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${safe(name)} — ${safe(title)}</title>
<style>
body{font-family:Inter,system-ui,Segoe UI,Roboto,Arial;background:#f7f8fb;margin:0;padding:24px}
.card{max-width:900px;margin:0 auto;background:#fff;border-radius:12px;padding:20px}
header h1{margin:0;font-size:28px}
header p{color:#6b7280;margin:6px 0 16px}
.pdf-wrapper{border:1px dashed #e6e9ef;padding:8px;border-radius:8px;min-height:360px}
.pdf-wrapper iframe{width:100%;height:640px;border:0}
</style>
</head>
<body>
<div class="card">
  <header>
    <h1>${safe(name)}</h1>
    <p>${safe(title)}</p>
  </header>
  <section>
    <p>${safe(bio)}</p>
  </section>
  <section class="pdf-wrapper">
    ${pdf?`<iframe src="${pdf}"></iframe>`:'<p>No resume provided.</p>'}
  </section>
</div>
</body>
</html>`;
}

// Clean up object URL when page unloads
window.addEventListener('beforeunload', ()=>{ if (objectUrl) URL.revokeObjectURL(objectUrl); });

// Initialize
updatePreview();
