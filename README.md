# Keerthivasan M - Defensive Cyber Security Portfolio

A high-performance, dark-themed defensive cybersecurity operator portfolio built using **Astro**, **React**, **Tailwind CSS v4**, **Framer Motion**, and **GSAP**.

## 🚀 Technologies Used
- **Framework**: Astro (Static Site Generation)
- **UI Components**: React & Vanilla CSS / Tailwind CSS v4
- **Animations**: GSAP (ScrollTrigger) & Framer Motion
- **Interactions**: Matter.js (interactive physics systems) & Lenis (smooth scrolling)

---

## 💻 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
This starts the local development server at `http://localhost:4321`.

### 3. Build for Production
```bash
npm run build
```
This compiles your static site into the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## ☁️ How to Host on Vercel

Since this project is configured for **Static Site Generation (SSG)**, it can be hosted on Vercel out of the box with zero configuration files or code changes needed!

### Step 1: Push Your Code to GitHub
1. Create a new repository on your GitHub account (e.g., `portfolio`).
2. Run the following commands in your terminal to initialize git (if not done already) and push the code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Import Project to Vercel
1. Go to the [Vercel Dashboard](https://vercel.com) and log in.
2. Click the **Add New...** button and select **Project**.
3. Under **Import Git Repository**, find your portfolio repository and click **Import**.

### Step 3: Configure Project Settings on Vercel
Vercel will automatically detect that this is an **Astro** project. The default settings are already perfect:
- **Framework Preset**: `Astro`
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` or `astro build` (default)
- **Output Directory**: `dist` (default)
- **Install Command**: `npm install` (default)

> [!IMPORTANT]
> **Node.js Version Requirement:**
> The `package.json` specifies `"node": ">=22.12.0"`.
> 1. In Vercel, go to your **Project Settings** (once created or during setup).
> 2. Look for **Node.js Version** under the **General** tab.
> 3. Select **22.x** from the dropdown menu to ensure compatibility with Node 22.

### Step 4: Deploy
1. Click **Deploy**.
2. Vercel will build your website and generate a live URL for your portfolio.

---

## 🛠️ Future: Enabling SSR (Server-Side Rendering)
If you decide in the future to add server-side features (like dynamic API routes or database calls), you can easily convert this project to an SSR site on Vercel:

1. Add the Vercel Astro adapter:
   ```bash
   npx astro add vercel
   ```
2. This will automatically update `astro.config.mjs` to include the Vercel adapter:
   ```javascript
   import vercel from '@astrojs/vercel/serverless';

   export default defineConfig({
     output: 'server',
     adapter: vercel(),
     // ...other config
   });
   ```
3. Commit and push the changes. Vercel will automatically redeploy it as a serverless application.
