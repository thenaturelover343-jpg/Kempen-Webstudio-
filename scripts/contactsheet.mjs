import sharp from 'sharp'; import fs from 'fs'; import path from 'path';
const [out, ...files] = process.argv.slice(2);
const W=240,H=170,cols=6; const rows=Math.ceil(files.length/cols);
const tiles = await Promise.all(files.map(async (f,i)=>{
  const img = await sharp(f).resize(W,H-20,{fit:process.env.FIT||'cover',background:'#888'}).toBuffer();
  const label = Buffer.from(`<svg width="${W}" height="20"><rect width="100%" height="100%" fill="#fff"/><text x="3" y="14" font-size="11" font-family="Arial">${i}: ${path.basename(path.dirname(f))}/${path.basename(f)}</text></svg>`);
  return [{input:img,left:(i%cols)*W,top:Math.floor(i/cols)*H},{input:label,left:(i%cols)*W,top:Math.floor(i/cols)*H+H-20}];
}));
await sharp({create:{width:W*cols,height:H*rows,channels:3,background:'#888'}}).composite(tiles.flat()).jpeg({quality:80}).toFile(out);
