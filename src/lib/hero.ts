// Responsive hero images: a tall crop for desktop and a wide, smaller crop for phones (about half the pixels to decode).
import { getImage } from 'astro:assets';
import desktop from '../assets/art/hero-fibre.jpg';
import mobile from '../assets/art/hero-fibre-m.jpg';

const WIDTHS = [480, 720];
async function build(src: ImageMetadata, format: 'avif' | 'webp') {
  const imgs = await Promise.all(WIDTHS.map((width) => getImage({ src, format, width, quality: 72 })));
  return { srcset: imgs.map((i, k) => `${i.src} ${WIDTHS[k]}w`).join(', '), fallback: imgs[imgs.length - 1].src };
}
export async function heroImages() {
  return {
    dAvif: await build(desktop, 'avif'), dWebp: await build(desktop, 'webp'),
    mAvif: await build(mobile, 'avif'), mWebp: await build(mobile, 'webp'),
  };
}
