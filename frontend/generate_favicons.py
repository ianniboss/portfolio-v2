from PIL import Image, ImageDraw, ImageFont
import os

sizes = [16, 32, 48, 180]
bg_color = "#0d0d0d"
amber = "#c8903a"

out_dir = r"c:\Users\ianha\githubrepo\portfolio-v2\frontend\public"

def draw_icon(size):
    outline_width = max(1, size // 24)
    img = Image.new("RGBA", (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw circular outline
    margin = size // 10
    if size <= 16:
        margin = 1
        
    draw.ellipse([margin, margin, size - margin - 1, size - margin - 1], outline=amber, width=outline_width)
    
    if size <= 16:
        # Draw a small amber dot in the center for illegible small sizes
        dot_r = 2
        cx, cy = size // 2, size // 2
        draw.ellipse([cx - dot_r, cy - dot_r, cx + dot_r, cy + dot_r], fill=amber)
    else:
        # Draw text "ISA"
        # Try some bold sans-serif or monospace fonts available on Windows
        font = None
        for font_name in ["consola.ttf", "arialbd.ttf", "segoeuib.ttf", "calibrib.ttf"]:
            try:
                # size * 0.30 to leave plenty of breathing room around the text
                font_size = int(size * 0.30)
                font = ImageFont.truetype(font_name, size=font_size)
                break
            except IOError:
                continue
                
        if not font:
            font = ImageFont.load_default()
            
        text = "ISA"
        
        # Center using text anchor
        draw.text((size / 2, size / 2), text, font=font, fill=amber, anchor="mm")
        
    return img

imgs = {s: draw_icon(s) for s in sizes}

# apple-touch-icon.png (180x180, no transparency)
imgs[180].convert("RGB").save(os.path.join(out_dir, "apple-touch-icon.png"))

# favicon-32x32.png
imgs[32].save(os.path.join(out_dir, "favicon-32x32.png"))

# favicon-16x16.png
imgs[16].save(os.path.join(out_dir, "favicon-16x16.png"))

# favicon.ico (multiple sizes: 16, 32, 48)
icon_img = imgs[48]
icon_img.save(
    os.path.join(out_dir, "favicon.ico"),
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48)],
    append_images=[imgs[32], imgs[16]]
)
print("Favicons generated successfully!")
