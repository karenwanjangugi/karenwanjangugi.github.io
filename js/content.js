/* Your content: edit text, stack, projects and the How I build steps here. */
/* ================= CONTENT (edit here; every world reads it) ================= */
const STACK=['JavaScript','Python','Kotlin','Java','React','Next.js','Node.js','Django','PostgreSQL','Supabase','ClickHouse','PyTorch','TensorFlow','scikit-learn','Hugging Face','LangChain','FastAPI','ChromaDB','M-Pesa Daraja','Cypress','Playwright','Selenium','Postman','AWS','GCP','GitHub Actions','Docker','Kubernetes','Grafana'];
const CREW=[
  {who:'Crabtree',job:'Backend',say:'',art:'crab',c:0,
   text:'APIs and services that stay reliable under real use.',tags:['Python','Django','Node.js','PostgreSQL']},
  {who:'Octavia',job:'AI and data',say:'',art:'octo',c:4,
   text:'Models, retrieval and pipelines that turn data into something useful.',tags:['PyTorch','Hugging Face','LangChain','FastAPI','ChromaDB']},
  {who:'Finn',job:'Payments',say:'',art:'fish',c:3,
   text:'Checkouts and payment flows that handle the unhappy paths too.',tags:['M-Pesa Daraja','Webhooks']},
  {who:'Jelli',job:'Front end',say:'',art:'jelly',c:1,
   text:'Clean, fast interfaces.',tags:['React','Next.js','JavaScript']},
  {who:'Inspector Starla',job:'Quality',say:'',art:'star',c:2,
   text:"Automated tests and CI checks, so releases don't surprise anyone.",tags:['Cypress','Playwright','Selenium','Postman']},
];
const PROJECTS=[
  {name:'Tesfa',slug:'tesfa',kind:'AI · Health',status:'Live',c:[5,1],text:'AI health-risk prediction, live as a proof of concept for ONA Insights. A team project where I worked across backend and front end.',tags:['AI','RAG','Backend','Front end'],
   links:[['Live site','https://tesfa.onainsights.io/onboarding/welcome'],['GitHub','https://github.com/karenwanjangugi/tesfa-informational-website']]},
  {name:'Tujijenge / Mamamboga',slug:'tujijenge',kind:'Commerce · Community',status:'Built',c:[3,0],text:'A community commerce platform for Kenyan market vendors, with M-Pesa payments. A team project where I worked across backend and front end.',tags:['Django','DRF','M-Pesa Daraja'],
   links:[['GitHub','https://github.com/karenwanjangugi/tujijenge-informational']]},
  {name:'Movie Recommender',slug:'movie-recommender',kind:'AI · NLP',status:'Built',c:[4,5],text:'A witty recommender that suggests movies from a plain-language description of what you feel like watching.',tags:['NLP','ChromaDB','Sentence Transformers'],
   links:[['GitHub','https://github.com/karenwanjangugi/movie-recomender']]},
  {name:'City Soul Experience',slug:'citysoul',kind:'Web',status:'Built',c:[2,1],text:'The website for a Nairobi experiential entertainment agency.',tags:['React','Front end'],
   links:[['GitHub','https://github.com/karenwanjangugi/city-soul']]},
];
const STOPS=[
  ['Step 1','Explore','Every project starts with questions. Who is this for, and what would make their day easier?'],
  ['Step 2','Sketch','Rough ideas on paper, sometimes on canvas, before a single line of code.'],
  ['Step 3','Build','Backend, front end and the data in between, written for the next person to read.'],
  ['Step 4','Break it on purpose','Tests, edge cases and curious clicking until the weak spots show.'],
  ['Step 5','Ship','Automated checks and a clean deploy, with nothing left to surprise anyone.'],
  ['Step 6','Learn','See what the data says, then start the loop again, a little better.'],
];
