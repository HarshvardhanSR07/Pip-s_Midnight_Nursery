import os
import numpy as np
from PIL import Image
from scipy.ndimage import label, binary_dilation

def process_sheet(src_path, out_webp, out_png):
    img = Image.open(src_path).convert('RGB')
    arr = np.array(img, dtype=np.float32)
    h, w, _ = arr.shape
    
    tile_h = h // 3
    tile_w = w // 3
    
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[..., :3] = np.array(img)
    rgba[..., 3] = 255
    
    # Grid lines to remove
    grid_ys = [0, tile_h - 1, tile_h, tile_h + 1, 2 * tile_h - 1, 2 * tile_h, 2 * tile_h + 1, h - 1]
    grid_xs = [0, tile_w - 1, tile_w, tile_w + 1, 2 * tile_w - 1, 2 * tile_w, 2 * tile_w + 1, w - 1]
    
    for r in range(3):
        for c in range(3):
            y0, y1 = r * tile_h, (r + 1) * tile_h
            x0, x1 = c * tile_w, (c + 1) * tile_w
            tile_rgb = arr[y0:y1, x0:x1].copy()
            th, tw, _ = tile_rgb.shape
            
            # Replace 2-pixel outer borders of this tile with white
            tile_rgb[:3, :] = 255
            tile_rgb[-3:, :] = 255
            tile_rgb[:, :3] = 255
            tile_rgb[:, -3:] = 255
            
            # White background mask: high brightness, low saturation
            max_c = np.max(tile_rgb, axis=2)
            min_c = np.min(tile_rgb, axis=2)
            sat = max_c - min_c
            is_white = (min_c > 230) & (sat < 25)
            
            labeled, num_features = label(is_white)
            
            # Find labels touching tile edges
            edge_labels = set(np.unique(np.concatenate([
                labeled[0, :], labeled[-1, :],
                labeled[:, 0], labeled[:, -1]
            ]))) - {0}
            
            bg_mask = np.isin(labeled, list(edge_labels))
            
            # Soft feathering
            dilated = binary_dilation(bg_mask, iterations=2)
            edge_zone = dilated & (~bg_mask)
            
            tile_alpha = np.ones((th, tw), dtype=np.float32)
            tile_alpha[bg_mask] = 0.0
            
            for ey, ex in zip(*np.where(edge_zone)):
                val = np.mean(tile_rgb[ey, ex])
                if val > 210:
                    tile_alpha[ey, ex] = max(0.0, min(1.0, (255 - val) / 45.0))
            
            rgba[y0:y1, x0:x1, 3] = (tile_alpha * 255).astype(np.uint8)
            
    out_img = Image.fromarray(rgba, 'RGBA')
    os.makedirs(os.path.dirname(out_webp), exist_ok=True)
    out_img.save(out_webp, 'WEBP', quality=95)
    out_img.save(out_png, 'PNG')
    print(f"Saved {out_webp} and {out_png}")

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dir_jpg = os.path.join(base_dir, 'public', 'mascots', 'pip-directions.jpg')
    dir_webp = os.path.join(base_dir, 'public', 'mascots', 'pip-directions.webp')
    dir_png = os.path.join(base_dir, 'public', 'mascots', 'pip-directions.png')
    
    react_jpg = os.path.join(base_dir, 'public', 'mascots', 'pip-reactions.jpg')
    react_webp = os.path.join(base_dir, 'public', 'mascots', 'pip-reactions.webp')
    react_png = os.path.join(base_dir, 'public', 'mascots', 'pip-reactions.png')
    
    process_sheet(dir_jpg, dir_webp, dir_png)
    process_sheet(react_jpg, react_webp, react_png)
    print("Done processing sheets with transparent borders!")
