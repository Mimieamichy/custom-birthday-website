# Happy Birthday Surprise Website 🎂✨

A cinematic, interactive birthday celebration experience built for **Ajebo**. This web application features an immersive journey through animated scenes, music, and memories.

## 🌟 Features

- **Cinematic Storytelling**: A sequence of four unique scenes:
  - **Countdown**: Building the excitement for the big reveal.
  - **Singing Teddy**: An interactive teddy bear that "sings" a birthday song.
  - **Memory Photobook**: A beautiful gallery of shared moments and photos.
  - **The Finale**: A grand celebratory ending with a heart-shaped collage.
- **Interactive Elements**:
  - Blue emoji rainfall and particle effects.
  - Floating photos and dynamic animations.
  - Matrix-style rain effects.
- **Immersive Audio**: Integrated background music and birthday songs with user-controlled playback.
- **Responsive Design**: Optimized for both mobile and desktop experiences.
- **Modern Tech Stack**: Built with high-performance tools for smooth animations.

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React + Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://greensock.com/gsap/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Deployment

### Vercel (Recommended)
This project is now configured as a standard Single Page Application (SPA), which works perfectly with Vercel.
1. Connect your GitHub repo to **Vercel**.
2. Vercel will automatically detect the **Vite** preset.
3. Settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Cloudflare Pages
You can also deploy to Cloudflare Pages:
1. Connect your repo.
2. Settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Compatibility flag: `nodejs_compat` (if needed).

## 📂 Project Structure

- `src/components/scenes`: Individual scene components (Countdown, Teddy, etc.).
- `src/components/ui`: Reusable Shadcn UI components.
- `src/assets`: Image assets used in the photobook.
- `src/lib`: Utility functions for music, audio handling, and general helpers.
- `public`: Static assets like audio files.

## 🎨 Customization

To customize this for someone else:
- Replace images in `src/assets/`.
- Update the name and messages in `src/routes/index.tsx`.
- Change the background music in `public/` and update `src/lib/bgMusic.ts`.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
Made with ❤️ for a special birthday.
