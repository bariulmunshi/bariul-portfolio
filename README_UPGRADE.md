# Bariul Munshi Portfolio — v3 (Full Audit + Blog System)

এই zip এ তোমার পুরো updated portfolio আছে (client + server), node_modules ছাড়া।

## এই round এ যা যা হয়েছে

### 🔒 1. Security Fix (গুরুত্বপূর্ণ!)
আগে `project` ও `research` এর POST/PUT/DELETE routes, এবং image upload route — এগুলোতে
**কোনো login check ছিল না**। মানে backend URL জানলেই (Postman দিয়ে) যে কেউ login ছাড়াই
তোমার data change/delete করতে পারতো, frontend এর "Protected Route" UI বাইপাস করে।

**ঠিক করা হয়েছে:**
- নতুন `server/middleware/authMiddleware.js` — JWT verify করে
- Project, Research, Upload, Blog — সব write operation (create/update/delete) এখন এই
  middleware দিয়ে protected, শুধু valid login token থাকলেই কাজ করবে
- Client side এ একটা shared `apiClient.js` বানানো হয়েছে যেটা automatically login token
  attach করে দেয় প্রতিটা admin request এ — তোমাকে কিছু আলাদা করে করতে হবে না

### ✍️ 2. Blog System (নতুন বড় ফিচার)
- **Public pages**: `/blog` (সব post listing, tag filter সহ), `/blog/:slug` (একটা post এর
  full page)
- **Admin pages**: `/admin/blog` (manage posts), `/admin/add-blog` (নতুন post লেখা),
  `/admin/edit-blog/:id` (edit/delete/publish-unpublish)
- **Rich text editor**: Word-এর মতো formatting — Bold, Italic, Heading, Bullet/Numbered
  list, Quote, Code block, Link, এবং Image insert (Cloudinary তেই upload হয়)
- Draft/Published status — draft থাকলে admin panel এ দেখা যাবে কিন্তু public site এ না
- প্রতিটা post এর জন্য automatic SEO meta tags (title, description, social share image)
- Homepage এ "From the blog" নামে একটা teaser section (সর্বশেষ ৩টা post দেখায়)
- AI Chatbot এখন Blog সম্পর্কেও জানে, ভিজিটর জিজ্ঞেস করলে বলতে পারবে

### ⚡ 3. Performance
- Blog editor (rich text editor) আর সব Admin page এখন **lazy-loaded** — মানে সাধারণ
  visitor রা এগুলো download করবে না, শুধু তুমি Admin panel এ গেলে load হবে। এতে সাধারণ
  visitor দের জন্য সাইট দ্রুত load হবে।

## পুরোনো features (আগের round থেকে, এখনো আছে)
- GSAP animation, neural-network hero background, Lab Notebook design
- Claude API powered AI chatbot (visitor রা তোমার সম্পর্কে প্রশ্ন করতে পারে)

## Setup করতে যা করতে হবে

### কিছু পরিবর্তন লাগবে কি?
**না** — যদি তুমি আগের round এর `.env` ইতিমধ্যে ঠিকমতো বসিয়ে থাকো (MONGO_URI, JWT_SECRET,
CLOUDINARY_*, ANTHROPIC_API_KEY), তাহলে নতুন কোনো env variable লাগবে না। শুধু কোড replace
করে `npm install` চালালেই হবে।

### Server
```
cd server
npm install
npm run dev
```
নতুন dependency: `@anthropic-ai/sdk` (যদি আগে install না থাকে)

### Client
```
cd client
npm install
npm run dev
```
নতুন dependencies: `gsap`, `@tiptap/*` (rich text editor), `react-helmet-async` (SEO)

### Deploy
- আগের মতোই Render (server) আর Vercel (client) এ push করো
- কোনো নতুন env variable লাগবে না (যদি ANTHROPIC_API_KEY আগেই বসানো থাকে)

## ⚠️ গুরুত্বপূর্ণ — প্রথমবার Blog ব্যবহারের আগে
যেহেতু এখন admin routes protected, **তোমাকে অবশ্যই Admin Login দিয়ে login করে তারপর
Blog/Project/Research পেজে যেতে হবে** — login ছাড়া এই pages কাজ করবে না (এটাই ঠিক
জিনিস, এটা security fix এর অংশ)। যদি আগে থেকে login করা থাকে browser এ, তাহলে কিছু করতে
হবে না, automatically কাজ করবে।

## যা change হয়নি
- Database models এর মূল structure (নতুন `Blog` model যোগ হয়েছে, পুরোনোগুলো অপরিবর্তিত)
- Auth/JWT login flow — অপরিবর্তিত (শুধু আরও routes এ enforce করা হয়েছে)
- Cloudinary image upload — অপরিবর্তিত mechanism, এখন blog cover image এও ব্যবহার হয়

কোনো প্রশ্ন থাকলে বা আরও কিছু (Testimonials, Project case-study pages, ইত্যাদি) যোগ
করতে চাইলে জানিও!
