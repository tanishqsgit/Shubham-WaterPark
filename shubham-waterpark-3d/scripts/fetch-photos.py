import re,urllib.request,concurrent.futures,json
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw
root=Path('.')
html=urllib.request.urlopen(urllib.request.Request('https://shubhamwaterworld.com/',headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read().decode('utf-8')
tags=re.findall(r'<img\b[^>]+>',html)
names=['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png','12.png','13.png','14.png','Untitled-design-8.png','Untitled-design-10.png','Untitled-design-11.png','Untitled-design-12.png','Untitled-design-5-1.png','g1-big.png','g12-big-2048x1360-1.jpg','DSC_0653-scaled.jpg','Untitled-design4.png','Shubham-Water-World-Logo-Master-FinalQ-300x300-1.png']
out=root/'public'/'images';out.mkdir(exist_ok=True)
def get(name):
 tag=next(t for t in tags if re.search(r'src="[^"]*/'+re.escape(name)+'"',t))
 url=re.search(r'\bsrc="([^"]+)"',tag).group(1)
 srcset=re.search(r'srcset="([^"]+)"',tag)
 if srcset:
  choices=re.findall(r'(https?://\S+) (\d+)w',srcset.group(1))
  candidates=[(u,int(w)) for u,w in choices if 1000<=int(w)<=1600]
  if candidates:url=max(candidates,key=lambda x:x[1])[0]
 request=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
 data=urllib.request.urlopen(request,timeout=30).read()
 raw=out/name;raw.write_bytes(data)
 img=Image.open(raw).convert('RGB');img.thumbnail((1800,1400))
 stem=Path(name).stem
 if 'Logo' in name:
  Image.open(raw).save(out/'logo.png'); saved='logo.png'
 else:
  saved=stem+'.webp';img.save(out/saved,'WEBP',quality=86)
 if raw.name!=saved:raw.unlink()
 return {'file':saved,'source':url,'size':img.size}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:results=list(pool.map(get,names))
Path('public/images/sources.json').write_text(json.dumps(results,indent=2))
canvas=Image.new('RGB',(1000,((len(results)+3)//4)*190),'#eee')
draw=ImageDraw.Draw(canvas)
for i,r in enumerate(results):
 im=Image.open(out/r['file']).convert('RGB');im=ImageOps.fit(im,(240,155));x=(i%4)*250;y=(i//4)*190;canvas.paste(im,(x,y));draw.text((x+3,y+160),r['file'][:32],fill='#111')
canvas.save('photo-contact-sheet.jpg')
print(json.dumps(results,indent=2))

