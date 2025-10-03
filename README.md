# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/619f4d78-5b05-49d0-93e0-4c12d1d22535

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/619f4d78-5b05-49d0-93e0-4c12d1d22535) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/619f4d78-5b05-49d0-93e0-4c12d1d22535) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## FLAC Streaming Architecture

This project streams FLAC audio on-demand from Jamendo and Internet Archive without hosting files locally. Only metadata (track IDs, identifiers) is stored.

### How it works

1. **Store only metadata**: Jamendo track IDs or Internet Archive identifiers in your database
2. **Resolve at play time**: Call resolver edge functions to get FLAC origin URLs
3. **Stream through proxy**: All audio streams through `/functions/v1/stream` which:
   - Forwards HTTP Range requests (enables seeking/scrubbing)
   - Adds strong cache headers for CDN byte-range caching
   - Enforces whitelist (only archive.org and jamendo.com)
   - Sets CORS headers for browser playback

### Edge Functions

#### `/functions/v1/stream`
Whitelist-proxy that forwards Range requests and adds cache headers.

**Parameters:**
- `src` (required): URL-encoded FLAC origin URL

**Example:**
```
/functions/v1/stream?src=https%3A%2F%2Farchive.org%2Fdownload%2Fitem%2Ffile.flac
```

#### `/functions/v1/jamendo-resolve`
Resolves a Jamendo track ID to a proxied FLAC stream URL + metadata.

**Parameters:**
- `id` (required): Jamendo track ID

**Returns:**
```json
{
  "url": "/functions/v1/stream?src=...",
  "title": "Track Name",
  "artist": "Artist Name",
  "cover": "https://...",
  "license": "cc-by-sa",
  "origin": "https://audio.jamendo.com/..."
}
```

#### `/functions/v1/ia-resolve`
Resolves an Internet Archive identifier to a proxied FLAC stream URL + metadata.

**Parameters:**
- `id` (required): Internet Archive identifier

**Returns:**
```json
{
  "url": "/functions/v1/stream?src=...",
  "title": "Album Title",
  "artist": "Creator Name",
  "date": "2020",
  "origin": "https://archive.org/download/..."
}
```

### Frontend Usage

```typescript
import { resolveJamendoFLAC, resolveIAFLAC } from "@/lib/streaming";

// Play a Jamendo track
const jamendoTrack = await resolveJamendoFLAC("1234567");
audioElement.src = jamendoTrack.url;

// Play an Internet Archive item
const iaTrack = await resolveIAFLAC("some-ia-identifier");
audioElement.src = iaTrack.url;
```

### Security

- **Whitelist enforcement**: Only archive.org and jamendo.com origins are allowed
- **Input validation**: All URLs are validated before proxying
- **No open proxy**: The whitelist prevents abuse
- **License compliance**: Jamendo metadata includes license info

### Manual Testing

Test the resolvers locally:

```bash
# Internet Archive
curl "http://localhost:54321/functions/v1/ia-resolve?id=your-ia-identifier"

# Jamendo (requires valid track ID and JAMENDO_ID secret)
curl "http://localhost:54321/functions/v1/jamendo-resolve?id=your-track-id"
```

Open the returned `url` in your browser - audio should play and be seekable.

### TODOs

- [ ] Add HMAC signing/expiry for `/stream` to prevent open-proxy abuse
- [ ] Persist resolver responses (metadata) in database for faster UI
- [ ] Add "Source & License" display in player UI
- [ ] Retry with alternate .flac files if first fails (IA items with multiple files)
