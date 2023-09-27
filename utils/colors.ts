export const amberColors: string[] = ["#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"];
export const blueColors: string[] = ["#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"];
export const cyanColors: string[] = ["#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"];
export const greenColors: string[] = ["#86efac", "#4ade80", "#22c55e", "#16a34a", "#15803d", "#166534", "#14532d", "#052e16"];
export const limeColors: string[] = ["#bef264", "#a3e635", "#84cc16", "#65a30d", "#4d7c0f", "#3f6212", "#365314", "#1a2e05"];
export const orangeColors: string[] = ["#fdba74", "#fb923c", "#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12", "#431407"];
export const redColors: string[] = ["#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"];
export const skyColors: string[] = ["#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49"];
export const tealColors: string[] = ["#5eead4", "#2dd4bf", "#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e"];
export const yellowColors: string[] = ["#fde047", "#facc15", "#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12", "#422006"];

export function colorGenerator(values: string[]) {
  const colorArray: string[] = [];

  // Função para gerar uma cor aleatória em formato hexadecimal
  function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  for (let i = 0; i < values.length; i++) {
    colorArray[i] = randomColor();
  }

  return colorArray;
}

export function colorGeneratorV2(values: string[], baseColor: string): string[] {
  const generatedColors: string[] = [];

  // Obtenha os componentes RGB da cor base
  const baseRed = parseInt(baseColor.slice(1, 3), 16);
  const baseGreen = parseInt(baseColor.slice(3, 5), 16);
  const baseBlue = parseInt(baseColor.slice(5, 7), 16);

  values.forEach((value) => {
    // Gere variações dos componentes RGB da cor base
    const r = Math.floor(Math.random() * 128) + baseRed;
    const g = Math.floor(Math.random() * 128) + baseGreen;
    const b = Math.floor(Math.random() * 128) + baseBlue;

    // Garanta que os valores RGB não ultrapassem 255
    const randomR = Math.min(255, r);
    const randomG = Math.min(255, g);
    const randomB = Math.min(255, b);

    // Converta os componentes RGB para uma cor hexadecimal
    const randomColor = `#${randomR.toString(16)}${randomG.toString(16)}${randomB.toString(16)}`;

    // Adicione a cor gerada ao vetor
    generatedColors.push(randomColor);
  });

  return generatedColors;
}

export function colorGeneratorV3(values: string[], baseColor: string): string[] {
  const generatedColors: string[] = [];

  // Obtenha os componentes RGB da cor base
  const baseRed = parseInt(baseColor.slice(1, 3), 16);
  const baseGreen = parseInt(baseColor.slice(3, 5), 16);
  const baseBlue = parseInt(baseColor.slice(5, 7), 16);

  values.forEach((value) => {
    // Gere variações dos componentes RGB da cor base
    let r = Math.floor(Math.random() * 128) + baseRed;
    let g = Math.floor(Math.random() * 128) + baseGreen;
    let b = Math.floor(Math.random() * 128) + baseBlue;

    // Garanta que os valores RGB não ultrapassem 255
    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);

    // Verifique se a cor gerada é muito próxima do preto
    const proximityToBlack = r + g + b;
    if (proximityToBlack < 100) {
      // Se for muito próxima, ajuste os componentes para cores mais brilhantes
      r += 100;
      g += 100;
      b += 100;
    }

    // Converta os componentes RGB para uma cor hexadecimal
    const randomColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

    // Adicione a cor gerada ao vetor
    generatedColors.push(randomColor);
  });

  return generatedColors;
}

export function colorGeneratorV4(values: string[], baseColor: string): string[] {
  const generatedColors: string[] = [];

  // Obtenha os componentes RGB da cor base
  const baseRed = parseInt(baseColor.slice(1, 3), 16);
  const baseGreen = parseInt(baseColor.slice(3, 5), 16);
  const baseBlue = parseInt(baseColor.slice(5, 7), 16);

  const maxColorVariation = 30; // Valor máximo para a variação de cor

  values.forEach((value) => {
    // Gere variações dos componentes RGB da cor base
    const r = Math.min(255, Math.max(0, baseRed + getRandomVariation(maxColorVariation)));
    const g = Math.min(255, Math.max(0, baseGreen + getRandomVariation(maxColorVariation)));
    const b = Math.min(255, Math.max(0, baseBlue + getRandomVariation(maxColorVariation)));

    // Converta os componentes RGB para uma cor hexadecimal
    const randomColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

    // Adicione a cor gerada ao vetor
    generatedColors.push(randomColor);
  });

  return generatedColors;
}

function getRandomVariation(maxVariation: number): number {
  // Gere um valor aleatório entre -maxVariation e maxVariation
  return Math.floor(Math.random() * (maxVariation * 2 + 1)) - maxVariation;
}

export function newColorGenerator(data: string[], colors: string[]): string[] {
  const generatedColors: string[] = [];

  // Loop através dos dados e atribuição de cores
  for (let i = 0; i < data.length; i++) {
    const dataIndex = i % colors.length; // Usamos o operador % para repetir cores, se necessário
    const color = colors[dataIndex];
    generatedColors.push(color);
  }

  return generatedColors;
}

// Função para obter a cor com base no status (apenas um exemplo, você pode personalizar isso)
function getColorBasedOnStatusV2(status: string) {
  switch (status) {
    case 'Recebido':
      return '#3b82f6';
    case 'Em Tratamento':
      return '#0ea5e9';
    case 'Finalizado':
      return '#84cc16';
    case 'Pendente':
      return '#dc2626';
    case 'Improcedente':
      return '#9333ea';
    default:
      return '#6b7280';
  }
}

export function getColorBasedOnStatus(status: string) {
  switch (status) {
    case 'Recebidas':
      return 'bg-blue-500';
    case 'Em Tratamento':
      return 'bg-teal-600';
    case 'Finalizadas':
      return 'bg-lime-600';
    case 'Pendentes':
      return 'bg-red-600';
    case 'Improcedentes':
      return 'bg-purple-600';
    default:
      return 'bg-gray-500';
  }
}