export function drawWheel(
  ctx: CanvasRenderingContext2D,
  items: Array<{ name: string; used: boolean }>,
  centerX: number,
  centerY: number,
  radius: number,
  rotation: number
): void {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((rotation * Math.PI) / 180);

  // Draw outer circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw segments
  items.forEach((item, index) => {
    const slice = (2 * Math.PI) / items.length;
    const angle = slice * index;
    
    // Draw slice lines
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(
      radius * Math.cos(angle),
      radius * Math.sin(angle)
    );
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    
    // Draw text
    ctx.save();
    ctx.rotate(angle + slice / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    ctx.font = '14px sans-serif';
    ctx.fillText(item.name, radius - 20, 5);
    ctx.restore();
  });

  ctx.restore();
}

export function drawPointer(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const pointerX = centerX + radius + 20;
  
  // Draw pointer pointing left instead of right
  ctx.beginPath();
  ctx.moveTo(pointerX + 30, centerY - 15);
  ctx.lineTo(pointerX, centerY);
  ctx.lineTo(pointerX + 30, centerY + 15);
  ctx.closePath();
  ctx.fillStyle = '#000000';
  ctx.fill();
}
